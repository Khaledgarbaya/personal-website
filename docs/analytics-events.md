---
kind: doc
type: reference
domain: [content-seo]
status: adopted
links: ["src/components/posthog.astro", "[[meta-descriptions-too-long]]"]
---

# PostHog analytics — event catalog

PostHog is initialized in both the English (`BaseLayout.astro`) and German
(`GermanLayout.astro`) layouts via the reusable `src/components/posthog.astro`
`is:inline` snippet, keyed off `PUBLIC_POSTHOG_PROJECT_TOKEN` / `PUBLIC_POSTHOG_HOST`.
Ten events are captured across content engagement, newsletter conversion, and the
German freelance funnel. Users are identified by email on newsletter signup and on
contact-form submission.

This is the durable reference for *what's instrumented*. The `content-seo` loop reads
it to know which signals exist; when the site's capture surface changes, update this
table.

## Events

| Event | Fires when | File |
|---|---|---|
| `newsletter_form_submitted` | User submits the newsletter signup form | `src/components/NewsletterForm.astro` |
| `contact_form_submitted` | User submits the German contact form | `src/pages/de/kontakt.astro` |
| `contact_form_success` | German contact submission completed | `src/pages/de/kontakt.astro` |
| `post_shared` | User clicks a social share button (Facebook / X / LinkedIn) | `src/components/SocialShare.astro` |
| `leistungen_cta_clicked` | User clicks the primary CTA on the services page | `src/pages/de/leistungen.astro` |
| `pricing_tier_clicked` | User clicks "Anfragen" on a pricing tier | `src/pages/de/leistungen.astro` |
| `faq_item_opened` | User expands a FAQ accordion item | `src/pages/de/leistungen.astro` |
| `case_study_cta_clicked` | User clicks "Anfrage senden" on a case study | `src/pages/de/projekte/[slug].astro` |
| `youtube_video_clicked` | User clicks the homepage YouTube link | `src/pages/index.astro` |
| `blog_post_viewed` | User views a blog post or TIL entry | `src/layouts/BlogLayout.astro` |

## Dashboards & insights (PostHog project 56040)

- [Analytics basics — Dashboard](https://us.posthog.com/project/56040/dashboard/1799479)
- [Freelance contact funnel](https://us.posthog.com/project/56040/insights/Fw1bCrvC) — services CTA → form submitted → form success
- [Newsletter signups over time](https://us.posthog.com/project/56040/insights/GU6ZBsf8)
- [Content engagement](https://us.posthog.com/project/56040/insights/jXZuSPCJ) — daily blog views vs social shares
- [German services page engagement](https://us.posthog.com/project/56040/insights/haDg1RO6)
- [Contact form: submitted vs success](https://us.posthog.com/project/56040/insights/mFeYzfIA)

## Open follow-ups

- [ ] Returning-visitor `identify`: identification only fires on newsletter + contact
      submit. Returning visitors who do neither stay on anonymous distinct IDs.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or equivalent) into CI so
      production stack traces de-minify in PostHog error tracking.
- [ ] For the `content-seo` traffic collector, a PostHog **personal** API key (read
      scope, `phx_…`) is still needed — distinct from the public capture token.

## Timeline
2026-07-04 | Instrumented via the PostHog setup wizard; migrated this catalog out of a
root-level `posthog-setup-report.md` into the knowledge base. Verified against
`pnpm verify` + e2e (16/16 green).
