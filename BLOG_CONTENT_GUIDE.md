# PyWorkflow Blog Content Guide

## Quick Start for Content Creators

Welcome! This guide will help you publish blog posts on the PyWorkflow website. No coding experience required!

## Creating a New Blog Post

### 1. Create the JSON File

Create a new file in the `src/content/blog/` folder with a name like `your-post-title.json`

**Important**: Use lowercase letters, numbers, and hyphens only (no spaces or special characters).

Example: `getting-started-with-pyworkflow.json`

### 2. Copy the Template

Use this template and fill in your content:

```json
{
  "id": "unique-post-id",
  "slug": "your-post-title",
  "title": "Your Post Title Here",
  "excerpt": "A brief 150-160 character summary of your post.",
  "author": "Your Name",
  "date": "2024-04-20",
  "readingTime": 8,
  "tags": ["tag1", "tag2", "tag3"],
  "featured": false,
  "content": "# Your Post Title\n\nYour markdown content here..."
}
```

### 3. Fill in Each Field

#### `id`
A unique identifier for your post. Use the same as your slug.
```
"id": "getting-started-with-pyworkflow"
```

#### `slug`
The URL path for your post. Must be lowercase with hyphens.
```
"slug": "getting-started-with-pyworkflow"
```
This creates the URL: `https://pyworkflow.dev/blog/getting-started-with-pyworkflow`

#### `title`
Your post title (50-60 characters recommended).
```
"title": "Getting Started with PyWorkflow: Your First Distributed Workflow"
```

#### `excerpt`
A compelling summary (150-160 characters). This appears in:
- Blog listing cards
- Search engine results
- Social media previews
```
"excerpt": "Learn how to build your first distributed workflow with PyWorkflow. This guide covers installation, basic concepts, and a practical example."
```

#### `author`
Your name or team name.
```
"author": "PyWorkflow Team"
```

#### `date`
Publication date in YYYY-MM-DD format.
```
"date": "2024-04-20"
```

#### `readingTime`
Estimated reading time in minutes. Calculate as: word count ÷ 200
```
"readingTime": 8
```

#### `tags`
3-5 relevant tags for categorization. Use lowercase.
```
"tags": ["tutorial", "getting-started", "python"]
```

#### `featured`
Set to `true` to highlight this post on the blog homepage (use sparingly).
```
"featured": true
```

#### `content`
Your full article content in Markdown format (see below).

## Writing Content in Markdown

Your `content` field should be formatted in Markdown. Here's a quick reference:

### Headings
```markdown
# Main Title (H1)
## Section Title (H2)
### Subsection (H3)
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
`inline code`
```

### Code Blocks
Use triple backticks with the language name:
```markdown
```python
def hello_world():
    print("Hello, PyWorkflow!")
```
```

### Lists
```markdown
- Item 1
- Item 2
- Item 3

1. First step
2. Second step
3. Third step
```

### Links
```markdown
[Link text](https://example.com)
[Internal link](/blog/another-post)
```

### Blockquotes
```markdown
> This is a blockquote
> It can span multiple lines
```

## Complete Example

Here's a complete blog post example:

```json
{
  "id": "python-workflow-patterns",
  "slug": "python-workflow-patterns",
  "title": "Common Python Workflow Patterns with PyWorkflow",
  "excerpt": "Discover the most effective patterns for building Python workflows. Learn best practices used by production teams.",
  "author": "Sarah Chen",
  "date": "2024-04-20",
  "readingTime": 10,
  "tags": ["patterns", "python", "best-practices"],
  "featured": false,
  "content": "# Common Python Workflow Patterns with PyWorkflow\n\nBuilding robust workflows requires understanding common patterns. In this post, we'll explore patterns used by production teams.\n\n## Pattern 1: Sequential Processing\n\nThe simplest pattern chains tasks in order:\n\n```python\nfrom pyworkflow import Workflow\n\nclass OrderWorkflow(Workflow):\n    def define(self):\n        self.task('validate', self.validate_order)\n        self.task('process', self.process_payment)\n        self.task('confirm', self.send_confirmation)\n```\n\n## Pattern 2: Parallel Processing\n\nFor independent tasks, run them in parallel:\n\n```python\nclass DataProcessing(Workflow):\n    def define(self):\n        self.parallel([\n            self.task('transform', self.transform_data),\n            self.task('validate', self.validate_data),\n        ])\n```\n\n## Best Practices\n\n- Keep tasks focused and single-purpose\n- Use meaningful task names\n- Implement proper error handling\n- Log important events\n\n## Conclusion\n\nThese patterns form the foundation of reliable workflows. Start with sequential patterns and add complexity as needed."
}
```

## SEO Tips for Better Visibility

### Title
- Include your main keyword
- Keep it 50-60 characters
- Make it compelling and clickable

Example: ✅ "Getting Started with PyWorkflow: Your First Distributed Workflow"
Not ideal: ❌ "PyWorkflow"

### Excerpt
- Summarize the key takeaway
- Include relevant keywords naturally
- 150-160 characters is ideal
- Make readers want to click

### Tags
Use tags that readers might search for:
- ✅ "tutorial", "getting-started", "python"
- ❌ "cool", "awesome", "post1"

### Content
- Use clear heading hierarchy (H2, H3)
- Include relevant keywords naturally
- Add internal links to related posts
- Use code examples where helpful
- Keep paragraphs short and scannable

## Content Best Practices

### Structure
1. **Hook** - Start with why this matters
2. **Introduction** - Set expectations
3. **Body** - Deliver the main content
4. **Examples** - Show real code/scenarios
5. **Conclusion** - Summarize and next steps

### Length
- Aim for 1,500-2,500 words
- Longer posts rank better but need to be valuable
- Use short paragraphs and sections for scannability

### Code Examples
- Include working code samples
- Show both the problem and solution
- Explain what the code does
- Use syntax highlighting

### Internal Links
Link to:
- Related blog posts
- Documentation pages
- Other resources

Example:
```markdown
[Learn more about event sourcing](/blog/event-sourcing-for-reliability)
[See the docs](https://docs.pyworkflow.dev)
```

## Publishing Your Post

### Step 1: Create the File
Save your JSON file to `src/content/blog/your-post-slug.json`

### Step 2: Test Locally (Optional)
If you have access, test locally:
```bash
npm run dev
# Visit http://localhost:3000/blog
```

### Step 3: Submit for Review
Create a pull request or share the JSON file with your team lead.

### Step 4: Deployment
Once approved, the post goes live immediately when merged to main branch.

## Common Mistakes to Avoid

❌ **Incorrect slug**: "My Post Title" → Use "my-post-title"
❌ **Wrong date format**: "April 20, 2024" → Use "2024-04-20"
❌ **Missing excerpt**: Readers need to know what the post is about
❌ **Too many tags**: 3-5 is ideal, not 10+
❌ **Broken markdown**: Test code blocks and formatting
❌ **No internal links**: Help readers discover related content

## Editing Posts

To update an existing post:
1. Find the JSON file in `src/content/blog/`
2. Edit the content
3. Update the date if it's a major revision
4. Commit and push

The site updates automatically!

## Monitoring Performance

After publishing, check:
- **Google Search Console**: Search impressions and clicks
- **Google Analytics**: Page views and engagement
- **Time on page**: Are readers staying?
- **Bounce rate**: Is content engaging?

## Getting Help

### Questions About:
- **Markdown formatting**: See the Writing Content section above
- **SEO best practices**: Check SEO Tips section
- **Technical issues**: Contact your development team
- **Content strategy**: Discuss with your content lead

## Inspiration and Resources

### Topic Ideas
- Tutorials and how-tos
- Case studies and real-world examples
- Best practices and patterns
- Performance optimization tips
- Common pitfalls and solutions
- Integration guides
- Release announcements

### Writing Resources
- [Markdown Guide](https://www.markdownguide.org/)
- [SEO Best Practices](https://moz.com/beginners-guide-to-seo)
- [Technical Writing Tips](https://www.writethedocs.org/)

## Post Checklist

Before submitting, verify:

- [ ] Filename matches slug (lowercase, hyphens only)
- [ ] JSON is valid (test at jsonlint.com)
- [ ] Title is 50-60 characters
- [ ] Excerpt is 150-160 characters
- [ ] Date is in YYYY-MM-DD format
- [ ] Reading time is accurate (word count ÷ 200)
- [ ] Tags are relevant (3-5 tags)
- [ ] Content uses proper markdown formatting
- [ ] Code blocks have language specified
- [ ] Links are working and relevant
- [ ] No spelling or grammar errors
- [ ] Headings follow H2/H3 hierarchy
- [ ] Paragraphs are short and scannable

## Examples in the Repository

Check out these sample posts for reference:
- `src/content/blog/getting-started-with-pyworkflow.json`
- `src/content/blog/event-sourcing-for-reliability.json`
- `src/content/blog/scaling-workflows-with-celery.json`

Feel free to use them as templates!

---

**Happy writing!** 🚀

If you have questions or need help, reach out to your content team lead.
