import { Marked } from "marked";
import { createHighlighter, type Highlighter } from "shiki";

const THEME = "github-dark-default";

const LANGUAGES = [
  "python",
  "bash",
  "shell",
  "javascript",
  "typescript",
  "tsx",
  "jsx",
  "json",
  "yaml",
  "toml",
  "sql",
  "html",
  "css",
  "diff",
  "md",
  "text",
] as const;

type Language = (typeof LANGUAGES)[number];

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEME],
      langs: LANGUAGES as unknown as Language[],
    });
  }
  return highlighterPromise;
}

function normalizeLang(lang: string | undefined): Language {
  if (!lang) return "text";
  const l = lang.toLowerCase().trim();
  if ((LANGUAGES as readonly string[]).includes(l)) return l as Language;
  // Common aliases
  if (l === "py") return "python";
  if (l === "sh" || l === "zsh") return "bash";
  if (l === "js") return "javascript";
  if (l === "ts") return "typescript";
  if (l === "yml") return "yaml";
  return "text";
}

/**
 * Render a markdown string to HTML with syntax-highlighted code blocks.
 * Runs at request/build time on the server — no client JS.
 */
export async function renderMarkdown(content: string): Promise<string> {
  const highlighter = await getHighlighter();

  const marked = new Marked({
    gfm: true,
    breaks: false,
    async: true,
  });

  // Swap out the default fenced code block renderer so shiki produces the HTML.
  marked.use({
    renderer: {
      code({ text, lang }) {
        const language = normalizeLang(lang);
        const html = highlighter.codeToHtml(text, {
          lang: language,
          theme: THEME,
        });
        // Wrap so we can target code blocks in CSS without fighting shiki's own <pre>
        return `<div class="blog-code" data-lang="${language}">${html}</div>`;
      },
    },
  });

  return marked.parse(content) as Promise<string>;
}
