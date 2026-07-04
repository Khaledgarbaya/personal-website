---
name: blog-voice
description: >
  Write or edit blog/TIL posts in Khaled Garbaya's voice, then strip AI-writing tells.
  Use when asked to "draft a post", "write in my voice", "outline this topic",
  "make this sound like me", "de-slop this", "blog-voice", or when the brain-to-blog
  loop turns a topic signal into prose. Combines Khaled's brand voice with the vault's
  "Signs of AI Writing" field guide.
---

# blog-voice — write like Khaled, not like an LLM

Two jobs, always in this order: **(1) hit the voice**, then **(2) strip the AI tells.**
A post that's slop-free but voiceless is generic; a post in-voice but full of tells reads
as AI. You need both.

Sources this distills: Khaled's published posts (`src/content/posts/`) for the voice, and
the vault note **"Signs of AI Writing — Field Guide"** (`09 WIKI/`, via `qmd`) for the
anti-slop pass. When drafting a real post, re-read the topic's source note in the vault.

## Who's writing

Senior Engineering Manager. Deep AI-augmented-dev practitioner who treats agents like a
team he manages (specs, plans, reviews, phase gates). Writes for other senior engineers and
EMs. Credibility comes from **having shipped the thing** — real projects, real numbers, real
friction — not from authority claims. Anti-hype by temperament.

## The voice (the positive spec)

Match these. Examples are pulled from his own posts.

1. **Direct, declarative, short.** Land the point, then stop. Fragments are fine for
   emphasis.
   > "It does not ship production software with a team."
   > "Partly true. Getting specific about why changed what I needed to fix."

2. **First-person and experience-grounded.** Open from something he actually did; concrete
   specifics (numbers, timeframes, what happened).
   > "A small team I led recently shipped a greenfield project in three weeks."
   > "I spent the last few months working on L8 AI engineering… When I applied these with a
   > team of five engineers on a 2-week project at work, I hit friction I did not expect."

3. **Set up a foil, then subvert it.** State the obvious framing, then take it apart. This
   is his signature move.
   > "My first instinct was that these workflows are built for solo developers. Partly
   > true." → then: "The real divide is not solo vs. team."

4. **Name things.** Coin concrete labels for concepts and sections — they're the spine of
   the piece: *APE (Agentic Product Engineering)*, *L3/L5/L8*, *The L8 bottleneck trap*,
   *The L5 false confidence problem*. Section headers are claims, not nouns.

5. **One bold thesis sentence per section.** Bold the load-bearing line, sparingly — never
   whole phrases mechanically.
   > "**The difference is not the AI. It is the discipline around the AI.**"

6. **Anti-hype, undersell-then-reveal.** Deflate before you build up. Earns trust.
   > "most of it has been… fine. Helpful for boilerplate, decent for explaining code,
   > occasionally useful for debugging. But last week, something clicked."

7. **Comparison tables for structured contrasts** (vibe-coding vs APE; L-levels). Use when
   you're contrasting two things across several dimensions — not as decoration.

8. **Credit your sources by name.** Karpathy, Yegge, Addy Osmani, Mat Pocock. Attribution is
   part of the voice, and it's honest. If the topic's vault note summarizes someone else's
   article, the post must be *Khaled's own take* — credit the original, make the manager's-
   eye application the novel contribution. Never rehash.

**Cadence:** vary sentence length. A run of short declaratives, then one longer sentence
that does real work. Read it aloud — if it drones, break it.

## The anti-slop pass (strip the AI tells)

After the draft hits the voice, sweep for these. Full taxonomy in the vault field guide;
this is the working checklist.

- **The core test — regression to the mean:** *did I trade a specific fact for a generic
  superlative?* Put the fact back. "a revolutionary titan of industry" → the actual, specific
  thing they did.
- **Kill the AI vocabulary cluster:** delve, boasts, tapestry, vibrant, crucial, pivotal,
  underscore, showcase, foster, landscape, testament, seamless, robust, leverage, realm,
  navigate (figurative), "valuable insights," "deeply rooted," "rich tapestry."
- **Cut trailing "-ing" analysis clauses** tacked onto facts: "…, underscoring its role,"
  "…, reflecting its relevance," "…, highlighting the shift." Just end the sentence.
- **Restore copulatives:** "serves as / stands as / represents / marks" → plain **is/has**.
- **Delete significance puffery:** "marks a pivotal moment," "represents a significant
  shift," "part of a broader movement." Show the thing; don't announce its importance.
- **Kill the "Despite its challenges… continues to thrive" formula** and rigid
  "Challenges / Future Outlook" sections. The *formula* is the tell.
- **Vague authorities:** "experts argue," "researchers say," "it's widely regarded." Name
  who, or cut it.
- **Un-bold** everything except the one thesis line per section. No mechanically-bolded key
  terms.
- **Em-dashes:** allowed but earn them. Mechanical space-surrounded em-dashes as
  "punched-up emphasis" are a tell — if a comma or period works, use it.
- **No chatbot leakage:** "I hope this helps," "Certainly!," "You're absolutely right,"
  "Let's dive in," "In conclusion," "It's worth noting that."
- **Rule of three:** one purposeful triple is fine; reflexive "adjective, adjective,
  adjective" to sound comprehensive is slop.
- **Straight quotes** in code; verify no `citeturn…` artifacts, unfilled `[placeholders]`,
  or "as of my last knowledge update."

## The attribution pass (trace borrowed claims to their source)

Runs after the anti-slop sweep, before publish. The trap it catches: a paragraph that
**reads like Khaled's own reasoning but was lifted, paraphrased, from an article he
ingested.** Uncredited, that's plagiarism-by-paraphrase — the honesty line, not just
etiquette. Attribution is also part of the voice (see voice #8).

The vault makes this recoverable: ingested articles live in `00 Inbox/` with `source:`
frontmatter carrying the original URL, and wiki notes list them under `sources:`. So every
borrowed claim can be traced back to a real link.

Procedure:
1. **Flag every borrowed claim.** For each non-obvious fact, framing, quote, or number in
   the draft, ask: *is this mine, or did it come from something I read?* If it came from a
   source, mark it.
2. **Trace it to the URL.** Follow the topic's wiki note `sources:` → the `00 Inbox/`
   article → its `source:` URL (`grep -i '^source:' "00 Inbox/<article>.md"`).
3. **Link the ones worth it.** Inline-link the *primary* source(s) and any framing/number
   you're leaning on. Credit the author by name where natural ("Viktor Cessan's *…* makes
   the number concrete"). A named quote gets its source.
4. **Skip the rest.** Tangential or secondary links (an article's own back-catalog, a
   link-farm of "related") are noise. **Only link if it's worth it** — one or two solid
   external sources beat a footnote pile. Judgment over completeness.

Litmus: if a reader asked "says who?" of any sentence, could you point at a link or a name?
If not and the claim isn't yours, either attribute it or cut it.

## Earned vs. mechanical (the reconciliation)

Khaled's own voice *does* use em-dashes, bold, and occasional triples — because they're
**earned** (purposeful, sparing), not **mechanical** (reflexive, everywhere). Same instinct
as earned-vs-unearned complexity: the fix for slop is subtraction, but don't sand off the
devices that carry his voice. Judge by intent, not by presence.

## Workflow

1. **Read the source.** The topic signal (`signals/…`) + its vault note (`qmd get …`). Pull
   the real specifics, numbers, and the one non-obvious claim.
2. **Outline as claims.** Section headers are arguments (see voice #4). Find the foil (#3).
3. **Draft in-voice.** Open from experience, deflate hype, land a bold thesis per section,
   table any multi-dimensional contrast.
4. **Anti-slop sweep.** Run the checklist above. Read aloud.
5. **Attribution pass.** Trace every borrowed claim to its `00 Inbox/` `source:` URL; link
   the ones worth it, credit authors by name, skip the noise (see the attribution pass above).
6. **Frontmatter + verify.** Match the posts schema (title, description ≤155 chars keyword-
   front-loaded, published, tags, keywords). Cross-link related posts (the AI cluster / the
   leadership cluster). Then `pnpm verify`.

## Notes

- **Sanitization still applies** (brain-to-blog rule): no employer, no colleague names, no
  internal specifics. Abstract to the general lesson.
- This skill is voice + de-slop only — it does not decide *what* to write. Topic selection
  is the `brain-to-blog` loop's job (`domains/brain-to-blog/`).
