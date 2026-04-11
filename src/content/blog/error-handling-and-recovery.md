---
title: "Error Handling and Recovery in Distributed Workflows"
description: "Build fault-tolerant workflows with comprehensive error handling, retries, and recovery strategies in PyWorkflow."
author: "PyWorkflow Team"
date: "2024-04-18"
category: "Best Practices"
tags: ["error-handling", "resilience", "recovery", "fault-tolerance"]
readingTime: 10
featured: true
---

## Introduction

Building reliable distributed systems requires more than just writing code—it requires anticipating failures and designing for recovery. In this guide, we'll explore comprehensive error handling strategies in PyWorkflow that ensure your workflows are resilient and can recover gracefully from failures.

## Understanding Failure Modes

Before implementing error handling, it's important to understand the types of failures that can occur:

1. **Transient Failures**: Temporary issues that resolve on their own (network timeouts, temporary service unavailability)
2. **Permanent Failures**: Issues that won't resolve without intervention (invalid data, missing configuration)
3. **Cascade Failures**: One failure triggering a chain of other failures
4. **Timeout Failures**: Operations exceeding their time limits

## Retry Strategies

### Basic Retries

The simplest error handling mechanism is automatic retries:

```python
from pyworkflow import Workflow, Task

workflow = Workflow(name="retry_example")

@workflow.task(max_retries=3, retry_delay=5)
def fetch_external_data(url: str):
    """Fetch data with automatic retries"""
    import requests
    response = requests.get(url, timeout=10)
    return response.json()

@workflow.flow()
def fetch_workflow(url: str):
    return fetch_external_data(url)
```

### Exponential Backoff

For more sophisticated retry strategies, use exponential backoff:

```python
@workflow.task(
    max_retries=5,
    retry_delay=1,
    retry_backoff=2,  # Double the delay each time
    max_retry_delay=60  # Cap at 60 seconds
)
def api_call_with_backoff(endpoint: str):
    """API call with exponential backoff"""
    import requests
    response = requests.get(endpoint, timeout=10)
    return response.json()
```

### Conditional Retries

Retry only for specific error types:

```python
@workflow.task()
def selective_retry_task(data: dict):
    """Retry only on specific errors"""
    try:
        # Perform operation
        return process_data(data)
    except ConnectionError:
        # Retry on connection errors
        raise
    except ValueError:
        # Don't retry on invalid data
        raise
    except Exception as e:
        # Log and fail for unexpected errors
        logger.error(f"Unexpected error: {e}")
        raise

@workflow.flow()
def retry_workflow(data: dict):
    return selective_retry_task(data)
```

## Error Handling Patterns

### Try-Catch Pattern

Handle errors within your workflow:

```python
@workflow.flow()
def safe_workflow(data: dict):
    try:
        result = risky_operation(data)
        return {"success": True, "result": result}
    except ValueError as e:
        logger.error(f"Invalid data: {e}")
        return {"success": False, "error": "Invalid input"}
    except TimeoutError as e:
        logger.error(f"Operation timed out: {e}")
        return {"success": False, "error": "Timeout"}
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return {"success": False, "error": "Internal error"}
```

### Fallback Pattern

Provide alternative paths when operations fail:

```python
@workflow.task()
def primary_data_source(key: str):
    """Primary way to fetch data"""
    return fetch_from_api(key)

@workflow.task()
def fallback_data_source(key: str):
    """Fallback when primary fails"""
    return fetch_from_cache(key)

@workflow.flow()
def resilient_data_fetch(key: str):
    try:
        return primary_data_source(key)
    except Exception:
        logger.warning(f"Primary source failed, using fallback for {key}")
        return fallback_data_source(key)
```

### Circuit Breaker Pattern

Prevent cascading failures by stopping requests when a service is failing:

```python
from pyworkflow import CircuitBreaker

circuit_breaker = CircuitBreaker(
    failure_threshold=5,
    recovery_timeout=60,
    expected_exception=Exception
)

@workflow.task()
def protected_api_call(endpoint: str):
    """API call protected by circuit breaker"""
    @circuit_breaker.call
    def make_request():
        return requests.get(endpoint).json()
    
    return make_request()

@workflow.flow()
def circuit_breaker_workflow(endpoint: str):
    try:
        return protected_api_call(endpoint)
    except CircuitBreakerOpen:
        logger.error("Circuit breaker open, service unavailable")
        return {"status": "unavailable"}
```

## Durability and Recovery

PyWorkflow uses event sourcing to ensure workflows can recover from failures:

```python
@workflow.task()
def long_running_operation(data: dict):
    """Long operation that might fail mid-way"""
    # Checkpoint 1
    intermediate_result = expensive_computation_1(data)
    
    # Checkpoint 2
    final_result = expensive_computation_2(intermediate_result)
    
    return final_result

@workflow.flow()
def durable_workflow(data: dict):
    # If this fails, PyWorkflow remembers the checkpoints
    # and can resume from the last successful step
    return long_running_operation(data)
```

## Monitoring and Alerting

### Health Checks

Implement health checks to detect failures early:

```python
@workflow.task()
def health_check():
    """Verify system health"""
    checks = {
        "database": check_database(),
        "cache": check_cache(),
        "external_api": check_external_api()
    }
    
    all_healthy = all(checks.values())
    return {"healthy": all_healthy, "checks": checks}

@workflow.flow()
def monitored_workflow(data: dict):
    health = health_check()
    
    if not health["healthy"]:
        logger.error(f"Health check failed: {health['checks']}")
        raise Exception("System unhealthy")
    
    return process_data(data)
```

### Logging and Tracing

Comprehensive logging helps with debugging:

```python
import logging
from contextvars import ContextVar

logger = logging.getLogger(__name__)
trace_id = ContextVar('trace_id')

@workflow.task()
def logged_operation(data: dict):
    """Operation with detailed logging"""
    tid = trace_id.get()
    
    logger.info(f"[{tid}] Starting operation", extra={"data": data})
    
    try:
        result = perform_operation(data)
        logger.info(f"[{tid}] Operation succeeded", extra={"result": result})
        return result
    except Exception as e:
        logger.error(f"[{tid}] Operation failed: {e}", exc_info=True)
        raise
```

## Handling Partial Failures

In distributed workflows, partial failures are common:

```python
@workflow.task()
def process_batch_item(item: dict):
    """Process a single item"""
    return transform_item(item)

@workflow.task()
def process_batch_results(results: list):
    """Handle mixed success/failure results"""
    successful = [r for r in results if r.get("success")]
    failed = [r for r in results if not r.get("success")]
    
    logger.info(f"Processed {len(successful)} items, {len(failed)} failed")
    
    if failed:
        logger.warning(f"Failed items: {failed}")
    
    return {
        "total": len(results),
        "successful": len(successful),
        "failed": len(failed),
        "failures": failed
    }

@workflow.flow()
def batch_processing_workflow(items: list):
    results = []
    for item in items:
        try:
            result = process_batch_item(item)
            results.append({"success": True, "data": result})
        except Exception as e:
            results.append({"success": False, "error": str(e)})
    
    return process_batch_results(results)
```

## Best Practices

1. **Fail Fast**: Detect errors early rather than propagating invalid state
2. **Be Idempotent**: Design tasks so they're safe to retry
3. **Log Strategically**: Log errors with context but avoid log spam
4. **Monitor Metrics**: Track failure rates and recovery times
5. **Test Failure Paths**: Explicitly test error handling code
6. **Set Appropriate Timeouts**: Prevent tasks from hanging indefinitely
7. **Use Circuit Breakers**: Prevent cascade failures
8. **Document Failure Modes**: Help your team understand failure scenarios

## Testing Error Scenarios

```python
import pytest
from unittest.mock import patch

def test_retry_on_failure():
    """Test that tasks retry on failure"""
    with patch('requests.get') as mock_get:
        mock_get.side_effect = [
            ConnectionError(),
            ConnectionError(),
            {"data": "success"}
        ]
        
        result = fetch_external_data("http://api.example.com")
        assert result["data"] == "success"
        assert mock_get.call_count == 3

def test_fallback_on_primary_failure():
    """Test fallback mechanism"""
    with patch('fetch_from_api') as mock_primary:
        with patch('fetch_from_cache') as mock_fallback:
            mock_primary.side_effect = Exception("API down")
            mock_fallback.return_value = {"data": "cached"}
            
            result = resilient_data_fetch("key")
            assert result["data"] == "cached"
```

## Conclusion

Building fault-tolerant workflows requires thoughtful design and comprehensive error handling. By implementing retries, fallbacks, circuit breakers, and monitoring, you can create workflows that gracefully handle failures and recover automatically.

Remember: **In distributed systems, failures aren't a question of if, but when. Design accordingly.**

Learn more in the [PyWorkflow documentation](https://docs.pyworkflow.dev/error-handling).