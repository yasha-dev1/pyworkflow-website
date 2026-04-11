import { BlogPost, BlogPostMetadata } from "./types";

// Calculate reading time (average 200 words per minute)
export function calculateReadingTime(content: string): number {
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / 200);
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Get all blog posts (simulated - in real app would read from filesystem)
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // This will be populated by the blog posts in the content/blog directory
  // For now, return empty array - the actual posts are defined as constants below
  return BLOG_POSTS;
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}

// Get related posts (same tags, excluding current post)
export function getRelatedPosts(
  currentSlug: string,
  allPosts: BlogPost[],
  limit: number = 3
): BlogPost[] {
  const currentPost = allPosts.find((post) => post.slug === currentSlug);
  if (!currentPost) return [];

  return allPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) =>
      post.tags.some((tag) => currentPost.tags.includes(tag))
    )
    .slice(0, limit);
}

// Get posts by tag
export function getPostsByTag(tag: string, allPosts: BlogPost[]): BlogPost[] {
  return allPosts.filter((post) => post.tags.includes(tag));
}

// Get all unique tags from all posts
export function getAllTags(allPosts: BlogPost[]): string[] {
  const tags = new Set<string>();
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

// Sample blog posts data
const BLOG_POSTS: BlogPost[] = [
  {
    slug: "getting-started-with-pyworkflow",
    title: "Getting Started with PyWorkflow",
    excerpt:
      "Learn how to build your first distributed workflow with PyWorkflow. We'll walk through installation, basic concepts, and a practical example.",
    content: `# Getting Started with PyWorkflow

PyWorkflow makes it easy to build sophisticated, long-running business processes with simple Python code. In this guide, we'll walk you through the basics and get you up and running in minutes.

## Installation

Getting started is simple. Install PyWorkflow using pip:

\`\`\`bash
pip install pyworkflow
\`\`\`

## Your First Workflow

Let's create a simple workflow that processes orders:

\`\`\`python
from pyworkflow import Workflow, task

class OrderWorkflow(Workflow):
    @task
    async def validate_order(self, order_id: str):
        # Validate the order
        return await self.call_external_service("validate", order_id)
    
    @task
    async def process_payment(self, order_id: str):
        # Process payment
        return await self.call_external_service("payment", order_id)
    
    @task
    async def send_confirmation(self, order_id: str):
        # Send confirmation email
        return await self.call_external_service("email", order_id)
    
    async def run(self, order_id: str):
        await self.validate_order(order_id)
        await self.process_payment(order_id)
        await self.send_confirmation(order_id)
\`\`\`

## Key Concepts

### Durability
PyWorkflow uses event sourcing to ensure your workflows are durable. If a step fails, it can be retried automatically without losing state.

### Distributed Execution
Run your workflows across multiple machines using Celery. PyWorkflow handles the coordination and state management.

### Automatic Retries
Configure retry policies for each task. PyWorkflow will automatically retry failed steps with exponential backoff.

## Next Steps

- Read the [documentation](/docs)
- Check out [examples](https://github.com/QualityUnit/pyworkflow/tree/main/examples)
- Join our [community](/community)

Happy workflow building!`,
    date: "2024-04-10",
    author: "Alex Chen",
    authorRole: "PyWorkflow Creator",
    tags: ["getting-started", "tutorial", "basics"],
    readingTime: 5,
    image: "/blog/getting-started.jpg",
    imageAlt: "Getting Started with PyWorkflow",
  },
  {
    slug: "building-resilient-workflows",
    title: "Building Resilient Workflows: Error Handling and Retries",
    excerpt:
      "Master error handling and retry strategies in PyWorkflow. Learn how to build workflows that gracefully handle failures and recover automatically.",
    content: `# Building Resilient Workflows: Error Handling and Retries

Building robust workflows means anticipating failures and handling them gracefully. PyWorkflow provides powerful tools for error handling, retries, and recovery.

## Retry Policies

Define retry behavior for individual tasks:

\`\`\`python
from pyworkflow import Workflow, task, RetryPolicy

class ResilientWorkflow(Workflow):
    @task(
        retry_policy=RetryPolicy(
            max_retries=3,
            initial_delay=1,  # seconds
            max_delay=60,
            exponential_base=2
        )
    )
    async def call_external_api(self, endpoint: str):
        # This will retry up to 3 times with exponential backoff
        return await self.http_client.get(endpoint)
\`\`\`

## Error Handling

Use try-except blocks within your tasks:

\`\`\`python
@task
async def process_with_fallback(self, data: dict):
    try:
        return await self.primary_service.process(data)
    except ServiceError as e:
        self.logger.warning(f"Primary service failed: {e}")
        return await self.fallback_service.process(data)
\`\`\`

## Circuit Breaker Pattern

Prevent cascading failures:

\`\`\`python
from pyworkflow.patterns import CircuitBreaker

class SmartWorkflow(Workflow):
    def __init__(self):
        super().__init__()
        self.circuit_breaker = CircuitBreaker(
            failure_threshold=5,
            recovery_timeout=60
        )
    
    @task
    async def protected_call(self, endpoint: str):
        async with self.circuit_breaker:
            return await self.http_client.get(endpoint)
\`\`\`

## Monitoring and Observability

Track workflow execution and failures:

\`\`\`python
@task
async def monitored_task(self, data: dict):
    try:
        result = await self.process(data)
        self.emit_metric("task.success", 1)
        return result
    except Exception as e:
        self.emit_metric("task.failure", 1)
        self.logger.error(f"Task failed: {e}")
        raise
\`\`\`

## Best Practices

1. **Set appropriate timeouts** - Prevent tasks from hanging indefinitely
2. **Use exponential backoff** - Avoid overwhelming external services
3. **Implement circuit breakers** - Fail fast when services are down
4. **Log everything** - Track execution for debugging and monitoring
5. **Test failure scenarios** - Don't just test the happy path

## Conclusion

With these patterns and tools, you can build workflows that are resilient, observable, and production-ready.`,
    date: "2024-04-05",
    author: "Sarah Mitchell",
    authorRole: "Senior Engineer",
    tags: ["advanced", "error-handling", "best-practices"],
    readingTime: 8,
    image: "/blog/resilient-workflows.jpg",
    imageAlt: "Building Resilient Workflows",
  },
  {
    slug: "pyworkflow-vs-celery",
    title: "PyWorkflow vs Celery: Choosing the Right Tool",
    excerpt:
      "Compare PyWorkflow and Celery to understand which tool is best for your use case. We'll look at features, performance, and real-world scenarios.",
    content: `# PyWorkflow vs Celery: Choosing the Right Tool

Both PyWorkflow and Celery are powerful tools for distributed task processing, but they have different strengths. Let's compare them to help you choose the right one for your project.

## Feature Comparison

| Feature | PyWorkflow | Celery |
|---------|-----------|--------|
| Durable Execution | ✓ Event Sourcing | ✗ Basic |
| State Management | ✓ Built-in | ✗ Manual |
| Workflow Orchestration | ✓ Native | ✗ Via Airflow |
| Error Recovery | ✓ Automatic | ✗ Manual |
| Learning Curve | ✓ Gentle | ✗ Steep |
| Maturity | ✗ Newer | ✓ Mature |
| Community | ✗ Growing | ✓ Large |
| Flexibility | ✗ Opinionated | ✓ Very Flexible |

## When to Use PyWorkflow

Use PyWorkflow when you need:
- **Long-running workflows** - Multi-step processes that take hours or days
- **Durability guarantees** - Workflows that must complete even if servers fail
- **Orchestration** - Complex workflows with conditional logic and parallel tasks
- **Simplicity** - Easy-to-understand workflow definitions

## When to Use Celery

Use Celery when you need:
- **Simple task queuing** - Fire-and-forget background jobs
- **Maximum flexibility** - Custom routing, scheduling, and task definitions
- **Mature ecosystem** - Extensive integrations and community support
- **Lightweight solution** - Minimal overhead for simple use cases

## Example: Order Processing

### With PyWorkflow
\`\`\`python
class OrderWorkflow(Workflow):
    async def run(self, order_id: str):
        await self.validate_order(order_id)
        await self.process_payment(order_id)
        await self.ship_order(order_id)
\`\`\`

### With Celery
\`\`\`python
@shared_task
def validate_order(order_id):
    # validate logic
    
@shared_task
def process_payment(order_id):
    # payment logic
    
@shared_task
def ship_order(order_id):
    # shipping logic

# Chain them together
chain(
    validate_order.s(order_id),
    process_payment.s(),
    ship_order.s()
).apply_async()
\`\`\`

## Performance Considerations

- **PyWorkflow**: Optimized for long-running workflows with state persistence
- **Celery**: Optimized for high-throughput task processing

## Conclusion

PyWorkflow is ideal for complex, durable workflows. Celery is better for simple, high-volume task processing. Your choice depends on your specific requirements.`,
    date: "2024-03-28",
    author: "James Rodriguez",
    authorRole: "DevOps Engineer",
    tags: ["comparison", "celery", "architecture"],
    readingTime: 6,
    image: "/blog/pyworkflow-vs-celery.jpg",
    imageAlt: "PyWorkflow vs Celery Comparison",
  },
];
