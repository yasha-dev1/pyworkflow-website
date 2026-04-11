export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  authorRole?: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  readingTime: number;
}

export interface BlogPostMetadata {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  authorRole?: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
}
