# Personal Website

My personal website built with Astro, featuring my blog posts and TIL (Today I Learned) articles.

## 🚀 Project Structure

```text
/
├── public/              # Static assets
│   ├── favicons/        # Favicon files
│   ├── _redirects       # Netlify redirects
│   └── ...              # Other static files
├── src/
│   ├── assets/          # Images and SVGs
│   ├── components/      # Astro components
│   ├── content/         # Content collections
│   │   ├── posts/       # Blog posts (MDX)
│   │   └── til/         # TIL articles (MDX)
│   ├── layouts/         # Page layouts
│   ├── lib/             # Utility functions
│   ├── pages/           # File-based routing
│   │   ├── blog/        # Blog pages
│   │   ├── til/         # TIL pages
│   │   └── ...          # Other pages
│   └── styles/          # Global styles
├── astro.config.mjs     # Astro configuration
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`            | Installs dependencies                            |
| `pnpm dev`                | Starts local dev server at `localhost:4321`      |
| `pnpm build`              | Build your production site to `./dist/`          |
| `pnpm preview`            | Preview your build locally, before deploying     |
| `pnpm astro ...`          | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help`    | Get help using the Astro CLI                     |

## 📝 Content

Content is managed using Astro's Content Collections:

- **Blog Posts**: Located in `src/content/posts/` - Long-form articles about web development
- **TIL Articles**: Located in `src/content/til/` - Short tips and learnings

Each content piece is written in MDX format with frontmatter metadata.

## 🎨 Features

- Blog with tags and RSS feed
- TIL (Today I Learned) section with its own RSS feed
- Responsive design with Tailwind CSS
- Syntax highlighting for code blocks
- Social sharing for blog posts
- Newsletter subscription
- Sitemap generation

## 📦 Tech Stack

- [Astro](https://astro.build) - Static site framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [MDX](https://mdxjs.com) - Markdown with JSX support
- TypeScript
