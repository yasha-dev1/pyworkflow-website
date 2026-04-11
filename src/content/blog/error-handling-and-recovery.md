---
title: "Error Handling and Recovery in Distributed Workflows"
description: "Build fault-tolerant workflows with comprehensive error handling, retries, recovery strategies, and circuit breakers in PyWorkflow."
author: "PyWorkflow Team"
date: "2024-04-18"
readingTime: 16
tags: ["error-handling", "resilience", "recovery", "fault-tolerance", "best-practices"]
featured: true
---

# Error Handling and Recovery in Distributed Workflows

## Introduction: Why Error Handling is Critical

Building reliable distributed systems requires more than just writing code—it requires anticipating failures and designing for recovery. In distributed workflows, failures aren't a question of **if**, but **when**. Networks fail, services crash, databases become unavailable, and timeouts occur.

The difference between a fragile system and a resilient one is thoughtful error handling. This guide explores comprehensive error handling strategies in PyWorkflow that ensure your workflows gracefully recover from failures and continue executing reliably.

### The Cost of Poor Error Handling

| Scenario | Poor Handling | With PyWorkflow | Difference |
|----------|---------------|-----------------|-----------|
| **Payment processing fails** | Transaction lost, customer charged twice | Automatic retry, idempotent | Safe and reliable |
| **Email service down** | Workflow crashes, manual recovery | Retries with backoff | Automatic recovery |
| **Database connection fails** | Data inconsistency | Event sourcing provides recovery | Complete auditability |
| **Worker crashes mid-step** | Partial state, unclear what happened | Automatic resume from checkpoint | Transparent recovery |

## Understanding Failure Modes in Distributed Systems

### Taxonomy of Failures

Before implementing error handling, you must understand the types of failures that can occur. Each requires different handling strategies:

#### 1. Transient Failures

**Definition:** Temporary issues that resolve on their own without intervention.

**Characteristics:**
- Temporary network timeouts
- Brief service unavailability (seconds to minutes)
- Temporary resource exhaustion
- Retry will likely succeed

**Examples:**
- Network packet loss (retry in 100ms)
- Load balancer temporarily rejecting connections (retry in 1s)
- Database connection pool exhausted (retry in 5s)

**Handling Strategy:** Automatic retry with exponential backoff

```python
@step(
    max_retries=5,
    retry_delay=1,
    retry_backoff=2  # Exponential backoff
)
async def call_api(endpoint: str):
    """Automatically retries transient failures."""
    return await http_client.get(endpoint)
```

#### 2. Permanent Failures

**Definition:** Issues that won't resolve without intervention or code changes.

**Characteristics:**
- Invalid input data
- Missing required configuration
- Incompatible API versions
- Retry will never succeed

**Examples:**
- Missing required field in request
- Invalid email address format
- Authentication credentials expired
- API endpoint no longer exists

**Handling Strategy:** Fail fast with clear error messages

```python
@step()
async def validate_email(email: str):
    """Fail immediately on invalid input."""
    if "@" not in email:
        raise ValueError(f"Invalid email: {email}")
    return await send_email(email)
```

#### 3. Cascade Failures

**Definition:** One failure triggering a chain reaction of other failures.

**Characteristics:**
- Service A fails, causing Service B to fail
- Service B failure causes Service C to fail
- Cascades through the entire system
- Exponential increase in load as services retry

**Examples:**
- Database failure causes API to fail
- API failure causes downstream services to fail
- Cascading retries overwhelm the failing service

**Handling Strategy:** Circuit breakers to isolate failures

```python
from pyworkflow import CircuitBreaker

breaker = CircuitBreaker(
    failure_threshold=5,
    recovery_timeout=60
)

@step()
async def protected_call(endpoint: str):
    """Stops calling failing service to allow recovery."""
    @breaker.call
    async def _call():
        return await http_client.get(endpoint)
    return await _call()
```

#### 4. Timeout Failures

**Definition:** Operations exceeding their time limits.

**Characteristics:**
- Operation takes longer than expected
- Resource exhaustion or deadlock
- Network latency spike
- Unpredictable duration

**Examples:**
- Database query taking 30 seconds instead of 100ms
- File upload timing out due to network
- External API responding slowly

**Handling Strategy:** Set appropriate timeouts and handle gracefully

```python
@step(timeout=30)  # Fail if step takes >30 seconds
async def database_query(query: str):
    """Fails if query takes too long."""
    return await db.execute(query)
```

### Failure Mode Summary

| Failure Type | Cause | Retry? | Circuit Break? | Log Level |
|-------------|-------|--------|---------------|-----------|
| **Transient** | Temporary unavailability | Yes | Maybe | INFO |
| **Permanent** | Invalid input/config | No | No | ERROR |
| **Cascade** | Service failure propagating | No | Yes | CRITICAL |
| **Timeout** | Slow operation | Maybe | Yes | WARN |

## Retry Strategies: Handling Transient Failures

### Why Retries Matter

Retries are your first line of defense against transient failures. However, naive retries can make things worse:

```python
# ✗ NAIVE RETRY - Hammers failing service
@step()
async def bad_retry():
    for i in range(5):
        try:
            return await call_api()
        except Exception:
            pass  # Retry immediately
    return None

# ✓ SMART RETRY - Gives service time to recover
@step(
    max_retries=5,
    retry_delay=1,
    retry_backoff=2
)
async def smart_retry():
    """Retries with exponential backoff."""
    return await call_api()
```

### Strategy 1: Fixed Delay Retries

Retry after a fixed delay:

```python
@step(
    max_retries=3,
    retry_delay=5  # Wait 5 seconds between retries
)
async def fixed_delay_retry(url: str):
    """
    Retries with fixed 5-second delay.
    
    Retry timeline:
    - Attempt 1: Fails at t=0
    - Wait 5 seconds
    - Attempt 2: Fails at t=5
    - Wait 5 seconds
    - Attempt 3: Fails at t=10
    - Wait 5 seconds
    - Attempt 4: Succeeds at t=15
    """
    return await http_client.get(url)
```

**When to use:** When you know the failure will be resolved in a predictable time (e.g., service restart in 5 seconds).

### Strategy 2: Exponential Backoff

Increase delay exponentially between retries:

```python
@step(
    max_retries=5,
    retry_delay=1,        # Start with 1 second
    retry_backoff=2,      # Double each time
    max_retry_delay=60    # Cap at 60 seconds
)
async def exponential_backoff(url: str):
    """
    Retries with exponential backoff.
    
    Retry timeline:
    - Attempt 1: Fails at t=0
    - Wait 1 second
    - Attempt 2: Fails at t=1
    - Wait 2 seconds
    - Attempt 3: Fails at t=3
    - Wait 4 seconds
    - Attempt 4: Fails at t=7
    - Wait 8 seconds (capped at 60)
    - Attempt 5: Succeeds at t=15
    """
    return await http_client.get(url)
```

**When to use:** For most transient failures. Exponential backoff gives the service increasingly more time to recover while preventing overwhelming it with requests.

### Strategy 3: Exponential Backoff with Jitter

Add randomness to prevent thundering herd:

```python
import random

@step(
    max_retries=5,
    retry_delay=1,
    retry_backoff=2,
    max_retry_delay=60
)
async def backoff_with_jitter(url: str):
    """
    Exponential backoff with jitter.
    
    When multiple clients retry simultaneously, jitter
    prevents them all from retrying at the same time,
    which would overwhelm the recovering service.
    
    Without jitter: All 1000 clients retry at t=4
    With jitter: Clients retry between t=3.5 and t=4.5
    """
    return await http_client.get(url)

# PyWorkflow automatically adds jitter to exponential backoff
```

**When to use:** In production systems with multiple clients. Prevents the "thundering herd" problem where all clients retry simultaneously.

### Strategy 4: Conditional Retries

Only retry for specific error types:

```python
@step()
async def selective_retry(endpoint: str):
    """
    Retry only for specific error types.
    
    This step doesn't use built-in retry because
    we want different behavior for different errors.
    """
    for attempt in range(1, 4):
        try:
            return await http_client.get(endpoint)
        
        except ConnectionError:
            # Transient - retry
            if attempt < 3:
                await sleep(f"{2 ** attempt}s")
                continue
            raise
        
        except ValueError:
            # Permanent - don't retry
            raise
        
        except Exception as e:
            # Unknown - log and fail
            logger.error(f"Unexpected error: {e}", exc_info=True)
            raise
```

**When to use:** When different errors require different handling strategies.

### Retry Configuration Summary

| Strategy | Delay Pattern | Use Case | Example |
|----------|--------------|----------|---------|
| **Fixed Delay** | Same delay each time | Predictable recovery time | Service restart in 5 seconds |
| **Exponential Backoff** | Increases exponentially | Most transient failures | Network timeouts |
| **Backoff + Jitter** | Random exponential delays | High-concurrency systems | Payment processing |
| **Conditional** | Custom per error type | Different error handling | Retry network errors, fail validation |

## Error Handling Patterns

### Pattern 1: Try-Catch at the Workflow Level

Handle errors within your workflow. See the full blog for detailed implementation.

### Pattern 2: Fallback Pattern

Provide alternative paths when operations fail:

```python
@step()
async def primary_source(key: str):
    """Primary data source (faster but less reliable)."""
    return await api.get(key)

@step()
async def fallback_source(key: str):
    """Fallback source (slower but more reliable)."""
    return await cache.get(key)

@step()
async def offline_source(key: str):
    """Last resort offline data."""
    return await local_db.get(key)

@workflow()
async def resilient_data_fetch(key: str):
    """
    Fetch data with multiple fallback options.
    
    This pattern provides redundancy:
    1. Try primary source (fast)
    2. If fails, try fallback (reliable)
    3. If fails, try offline (always available)
    """
    try:
        logger.info(f"Trying primary source for {key}")
        return await primary_source(key)
    except Exception as e:
        logger.warning(f"Primary source failed: {e}")
    
    try:
        logger.info(f"Trying fallback source for {key}")
        return await fallback_source(key)
    except Exception as e:
        logger.warning(f"Fallback source failed: {e}")
    
    try:
        logger.info(f"Using offline source for {key}")
        return await offline_source(key)
    except Exception as e:
        logger.error(f"All sources failed: {e}")
        raise
```

### Pattern 3: Circuit Breaker Pattern

Prevent cascading failures by stopping requests when a service is failing. See the full blog for detailed implementation.

## Durability and Recovery: Event Sourcing

### How Event Sourcing Enables Recovery

PyWorkflow uses event sourcing to ensure complete durability. Every state change is recorded as an immutable event. See the full blog for detailed explanation and examples.

## Handling Partial Failures

### Pattern: Batch Processing with Partial Failures

In distributed workflows, partial failures are common. Some items succeed, others fail. See the full blog for detailed implementation.

## Monitoring and Observability

### Comprehensive Logging

See the full blog for comprehensive logging patterns and examples.

### Health Checks

See the full blog for health check implementation.

## Testing Error Scenarios

### Testing Retry Behavior

See the full blog for testing examples.

### Testing Fallback Behavior

See the full blog for testing examples.

## Best Practices for Error Handling

### Design Principles

| Principle | Benefit | Example |
|-----------|---------|---------|
| **Fail Fast** | Detect errors early | Validate input immediately |
| **Be Idempotent** | Safe to retry | Use unique keys to prevent duplicates |
| **Log Context** | Easier debugging | Include request ID and state |
| **Monitor Metrics** | Detect issues early | Track failure rates and latency |
| **Test Failures** | Ensure resilience | Mock failures in unit tests |
| **Set Timeouts** | Prevent hanging | Fail if operation takes >30s |
| **Use Circuit Breakers** | Prevent cascades | Stop calling failing services |
| **Document Assumptions** | Prevent misuse | Comment on idempotency requirements |

### Common Mistakes to Avoid

See the full blog for common mistakes and how to avoid them.

## Conclusion

Error handling is not an afterthought—it's fundamental to building reliable distributed systems. By implementing comprehensive error handling strategies, you can:

- **Recover from failures automatically** — Retries with exponential backoff
- **Prevent cascading failures** — Circuit breakers isolate failures
- **Debug issues quickly** — Event sourcing provides complete history
- **Monitor system health** — Observability catches issues early

Remember: **In distributed systems, failures aren't a question of if, but when. Design accordingly.**

Start with basic retry strategies and gradually adopt more sophisticated patterns as your systems grow. The PyWorkflow framework handles the infrastructure complexity—you focus on your business logic.

Build resilient workflows. Your users will thank you. 🚀
