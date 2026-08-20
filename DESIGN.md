# HUF Design System

> Documentation site styling for HUF. Built on Next.js 15 + Nextra 4.
> **Source of truth:** `docs/app/globals.css`. **Status:** v3.0.

---

## 1. Design Philosophy

**v3.0 change:** this replaces the v2 "instrument / control-room" language (warm paper, condensed uppercase display type, orange signal, 2px corners) with a quieter system — near-white canvas, the platform UI type stack, hairline structure, soft radii, and a single violet accent reserved for *state*.

The docs are something people read for a long time. v3 optimizes for that: structure comes from surface steps and hairlines, not from borders and caps, and color is spent almost nowhere so that when it appears it means something.

Principles:

- **One accent, and it marks state.** Violet appears on the active sidebar row, the active TOC entry, and focus rings. Never on labels, figures, icons, or commit buttons.
- **Sentence case everywhere.** Uppercase lives only in mono — eyebrows, column heads, group labels.
- **Hairlines as structure.** `#ECECF0` dividers, never doubled where two surfaces meet.
- **Soft corners.** Controls at 8px, cards at 14px. No square corners, no hard black borders.
- **Mono is a voice, not a decoration.** It marks machine values: ids, model names, timestamps, paths, counts.
- **Two shadow steps.** A 1px raise and an overlay. Nothing else.

---

## 2. Design Tokens

Tokens are CSS custom properties in `docs/app/globals.css` under `:root` (light) and `.dark`.

### 2.1 Surfaces

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-bg` | `#FBFBFD` | `#101012` | Page background (canvas) |
| `--color-bg-secondary` | `#F4F4F7` | `#1C1C20` | Sunken fills — table heads, code wells, hover |
| `--color-surface` | `#FFFFFF` | `#17171A` | Cards, panels, elevated content |
| `--color-border` | `#ECECF0` | `#2A2A2F` | Hairlines — every divider and card edge |
| `--color-border-subtle` | `#F4F4F7` | `#232327` | Internal rules inside a panel |
| `--color-border-strong` | `#E4E4E8` | `#34343A` | Control borders — inputs, secondary buttons |

### 2.2 Text

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-text-primary` | `#1D1D1F` | `#F5F5F7` | Headings, body emphasis, commit fills |
| `--color-text-secondary` | `#6E6E73` | `#A1A1A8` | Reading text, descriptions |
| `--color-text-muted` | `#98989D` | `#7C7C85` | Eyebrows, metadata, mono labels |
| `--color-text-disabled` | `#B8B8BD` | `#5A5A62` | Disabled labels |

### 2.3 Accent

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-accent` | `#6D4AFF` | `#8B6DFF` | **State only:** active sidebar row, active TOC link, focus ring |
| `--color-accent-subtle` | `#F1EDFF` | `#221B3D` | Active-row fill, note callouts |
| `--color-accent-hover` | `#5A38E8` | `#A48CFF` | Accent hover |

Accent never fills a commit button — those are `--color-text-primary` (ink). Accent never colors a figure, a label, or an icon.

### 2.4 Semantic

| Token | Light | Dark | Tint token |
|-------|-------|------|-----------|
| `--color-success` | `#1C7C54` | `#4BB07A` | `--color-success-tint` |
| `--color-warning` | `#8A5A00` | `#D9A343` | `--color-warning-tint` |
| `--color-danger` | `#B3261E` | `#E5776E` | `--color-danger-tint` |

Semantic colors appear as 10–12% tints behind text — never as fills larger than a badge.

### 2.5 Links

| Token | Light | Dark |
|-------|-------|------|
| `--color-link` | `#6D4AFF` | `#8B6DFF` |
| `--color-link-hover` | `#5A38E8` | `#A48CFF` |

Links take the accent so the palette never carries a second hue. Prev/next
page navigation is **not** a content link — it is secondary text that darkens
to ink on hover.

### 2.6 Code

| Token | Light | Dark |
|-------|-------|------|
| `--color-code-bg` | `#F4F4F7` | `#1C1C20` |
| `--color-code-text` | `#1D1D1F` | `#F5F5F7` |

### 2.7 Nextra theme overrides

```css
--nextra-primary-hue: 253;
--nextra-primary-saturation: 100%;
```

These drive Nextra's own primary-colored chrome so it matches the accent.

---

## 3. Typography

### 3.1 Typefaces

No webfonts are loaded — the platform UI stack renders natively everywhere and is calmer at reading sizes than any condensed display face.

```css
--font-body:    -apple-system, BlinkMacSystemFont, 'SF Pro Text',
                'Helvetica Neue', Helvetica, Arial, sans-serif;
--font-display: var(--font-body);   /* kept as an alias; there is no second face */
--font-mono:    ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
```

Mono is for **machine values only**: ids, model names, timestamps, paths, counts, and the uppercase eyebrow/column-head voice.

### 3.2 Type scale

| Token | Size | Usage |
|-------|------|-------|
| `--text-xs` | 11px | Mono meta, eyebrows, column heads |
| `--text-sm` | 13px | UI — nav links, sidebar rows, buttons, table cells |
| `--text-base` | 15px | Body copy |
| `--text-lg` | 17px | Lede paragraphs |
| `--text-xl` | 20px | `h3` |
| `--text-2xl` | 24px | `h2` |
| `--text-3xl` | 32px | — |
| `--text-4xl` | 40px | `h1` |
| `--text-5xl` | 52px | — |

### 3.3 Line heights

| Token | Value | Usage |
|-------|-------|-------|
| `--leading-tight` | 1.08 | `h1` |
| `--leading-snug` | 1.2 | `h2`, `h3` |
| `--leading-normal` | 1.55 | Body |
| `--leading-relaxed` | 1.65 | Long-form article text, code output |

### 3.4 Letter spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--tracking-display` | `-0.022em` | `h1` |
| `--tracking-tight` | `-0.015em` | `h2`, `h3` |
| `--tracking-normal` | `0` | Body, UI, nav |
| `--tracking-wide` | `0.05em` | Mono meta |
| `--tracking-widest` | `0.07em` | Mono uppercase labels |

### 3.5 Heading styles

| Element | Spec |
|---------|------|
| `h1` | 40px / 600 / `-0.022em` / 1.08 — **sentence case**, the one display moment |
| `h2` | 24px / 600 / `-0.015em`, hairline bottom rule, chapter break |
| `h3` | 20px / 590 / `-0.015em` |
| `h4`–`h6` | 11px mono, uppercase, `0.07em`, secondary — label-weight headings |

---

## 4. Spacing

Steps: 4 · 8 · 12 · 16 · 24 · 32 · 48. Tokens `--space-1` … `--space-16` map onto this scale; nothing falls between steps.

---

## 5. Borders, radius & elevation

### 5.1 Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 6px | Machine-identifier chips — so they never read as interactive |
| `--radius-md` | 8px | Controls: inputs, buttons, sidebar rows |
| `--radius-lg` | 10px | Tiles, icon wells |
| `--radius-xl` | 14px | Cards, callouts, panels |
| — | 999px | Status badges only |

### 5.2 Borders

All structural dividers are 1px `--color-border`. Control edges use `--color-border-strong`. Never double a rule where two surfaces already meet.

### 5.3 Elevation

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,.04)` | Secondary buttons, hovered cards |
| `--shadow-md` | `0 1px 2px rgba(0,0,0,.12)` | Selected segment of a control |
| `--shadow-lg` | `0 8px 24px -8px rgba(0,0,0,.16)` | Popovers, search results, modals |

---

## 6. Motion

| Token | Value |
|-------|-------|
| `--duration-fast` | 120ms |
| `--duration-normal` | 180ms |
| `--duration-slow` | 260ms |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |

### 6.1 Focus rings

Accent border plus `0 0 0 3px` of the accent at 14% opacity. Never remove focus affordances outright.

---

## 7. Components

### 7.1 Eyebrow

`.huf-eyebrow` — mono, 11px, `0.07em`, uppercase, muted. The v2 signal square is gone; uppercase mono is enough to set it apart.

### 7.2 Buttons

`.huf-btn` — 13px / 500, sentence case, `9px 16px`, 9px radius.

| Variant | Spec |
|---------|------|
| `.huf-btn-solid` | Ink fill (`--color-text-primary`), surface-colored text; 88% opacity on hover |
| `.huf-btn-ghost` | Surface fill, `--color-border-strong` edge, `--shadow-sm`; sunken on hover |

One primary action per view.

### 7.3 Callouts & blockquotes

A tint behind text, not a colored rail: 14px radius, hairline border, `--color-accent-subtle` for notes, `--color-warning-tint` and `--color-danger-tint` for the warning and error variants. The default emoji icon is hidden — the tint already sets the box apart.

### 7.4 Cards & grids

Surface fill, hairline border, 14px radius. The capability, feature, benefit, and next-steps grids all share this shell; their labels are mono 10–11px uppercase in `--color-text-muted`.

### 7.5 Machine values

Mono at 11px for ids, model names, timestamps, and paths. Code output sits on a sunken well at 11px with 1.65 line-height and its own copy control.

---

## 8. Nextra integration

The design system overrides default Nextra chrome:

| Element | Override |
|---------|----------|
| Navbar | Canvas background, hairline bottom border |
| Logo | `huf.svg` mark alone at 22px — no wordmark beside it |
| Nav links | System font, 13px, sentence case |
| Sidebar | **Sunken** (`--color-bg-secondary`) panel; the **active row is a white pill at 8px radius with a `0 1px 2px rgba(0,0,0,.05)` raise**, per Components 2.1 — the surface step carries the state, so the accent is not spent here. Hover is `--color-border`. Rules cover `aside.nextra-sidebar` and `aside.nextra-mobile-nav`. |
| Sidebar folders | Mono, 10px, uppercase, muted |
| TOC heading | Mono, widest tracking, muted |
| TOC active link | `--color-accent` — state, as intended |
| Search input | System font, 13px, sentence case, 8px radius, accent focus ring |
| Search results | Bordered panel with `--shadow-lg` |
| Footer | Mono, muted |
| Breadcrumbs | Mono, uppercase |
| Pagination | Top border, accent on hover |

---

### 7.6 Favicons

Rendered from the brand mark: `public/favicon.ico` (16/32/48/64/128,
PNG-compressed), `public/apple-touch-icon.png` (180), and
`public/huf-192.png` / `huf-512.png`. `huf.svg` is declared first so modern
browsers use the vector; the `.ico` is the fallback.

---

## 9. Article content defaults

Styles applied inside `article`:

- Body text: `--text-base` / `--leading-relaxed` / `--color-text-secondary`
- Lists: indented `--space-5`, relaxed line-height
- Tables: full-width, `--text-sm`, header row in `--color-bg-secondary` with mono uppercase column heads
- Code blocks: `--color-surface` background, hairline border, 8px radius
- Inline code: `--color-code-bg`, `--font-mono`, 6px radius
- Blockquotes and callouts: tinted card, 14px radius, no accent rail

---

## 10. React Components (MDX)

In addition to CSS utility classes, the docs provide globally-registered React components for common documentation patterns. They are defined in `docs/app/components/` and registered via `docs/mdx-components.js`, so they can be used in any MDX file without importing.

### 10.1 Chat Transcript

```mdx
<ChatTranscript>
  <ChatMessage role="system">[Agent Instructions]</ChatMessage>
  <ChatMessage role="user">Can you look up customer CUST-001?</ChatMessage>
  <ChatMessage role="agent">Sure! Let me get that information.</ChatMessage>
  <ChatMessage role="tool-call">get_customer("CUST-001")</ChatMessage>
  <ChatMessage role="tool-result">{'{...customer data...}'}</ChatMessage>
  <ChatMessage role="agent">Here's the information...</ChatMessage>
</ChatTranscript>
```

**Tip:** wrap literal `{...}` in a JSX expression string (`{'{...}'}`) so MDX doesn't try to parse it as an expression.

### 10.2 Agent Prompt

```mdx
<AgentPrompt title="Customer Support Assistant">
  You are a customer support assistant. Your role is to:
  1. Answer common questions
  2. Look up customer information
</AgentPrompt>
```

For long prompts with complex nested lists, keep the prompt inside a code fence inside `<AgentPrompt>` to avoid MDX JSX parsing issues.

### 10.3 Token Calculation

```mdx
<TokenCalculation>
  <TokenRow label="Message 1" prompt={100} response={50} total={150} />
  <TokenRow label="Message 2" prompt={100} response={50} carry={[150]} total={300} />
  <TokenRow label="Message 3" prompt={100} response={50} carry={[300]} total={450} />
</TokenCalculation>
```

Use `carry` to include prior-message token totals in the running sum.

### 10.4 Tool Call / Result

```mdx
<ToolCallResult
  call={`get_document(doctype="Customer", name="CUST-001")`}
  result={`{ "name": "CUST-001", ... }`}
/>
```

### 10.5 Config Panel

```mdx
<ConfigPanel title="Agent Configuration">
  <ConfigField label="Agent Name" value="Customer Support Assistant" />
  <ConfigField label="Model" value="gpt-4-turbo" />
  <ConfigSection title="Tools">
    <ConfigField label="Get Document" value="Customer" />
  </ConfigSection>
</ConfigPanel>
```

### 10.6 Do / Don't

```mdx
<DoDont
  doItems={["Test changes first", "Document what changed"]}
  dontItems={["Edit production agents at peak hours", "Forget rollback plan"]}
/>
```

### 10.7 Checklist

```mdx
<Checklist items={[
  "Instructions are clear",
  "Tools are called correctly",
  "Responses are accurate"
]} />
```

### 10.8 Tabs

```mdx
<Tabs defaultValue="overview">
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="config">Config</Tab>
    <Tab value="benefits">Benefits</Tab>
  </TabList>
  <TabPanel value="overview">...</TabPanel>
  <TabPanel value="config">...</TabPanel>
  <TabPanel value="benefits">...</TabPanel>
</Tabs>
```

Use tabs to collapse long use-case cards or multi-section config into a compact viewport-friendly interface.

### 10.9 Button

```mdx
<Button href="/docs/quick-start" variant="solid">Get started</Button>
<Button href="https://github.com/tridz-dev/huf" variant="ghost">View on GitHub</Button>
```

Use `variant="solid"` or `variant="ghost"`. External URLs automatically render with `target="_blank"` and `rel="noreferrer"`.

### 10.10 Mermaid Diagrams

```mdx
<Mermaid>{`
flowchart LR
    A[User Request] --> B[Create Orchestration]
    B --> C[Planning Phase]
    C --> D[Completed]
`}</Mermaid>
```

Use Mermaid for execution flows and lifecycle diagrams instead of ASCII art or numbered lists. The component renders client-side using the HUF color tokens.

### 10.11 Execution Profile Config

```mdx
<ExecutionProfileConfig title="Local Python Sandbox">
  <ConfigField label="Environment" value="venv" />
  <ConfigField label="Executable" value="/usr/bin/python3" />
  <ConfigSection title="Sandbox Restrictions">
    <ConfigField label="Allowlist" value="pandas, numpy, math" />
  </ConfigSection>
</ExecutionProfileConfig>
```

Used to document Execution Profiles. Renders with an infrastructure/terminal feel using heavy `IBM Plex Mono`.

### 10.12 Chat PWA Preview

```mdx
<ChatPWAPreview mode="desktop">
  <ChatMessage role="user">What is the status of ticket T-49?</ChatMessage>
  <ChatMessage role="agent" status="running">Checking...</ChatMessage>
</ChatPWAPreview>
```

Renders a live preview of the Chat PWA control-room ledger interface. Avoids consumer chat bubbles.

---

## 11. Responsive Behavior

Breakpoints are minimal. The main responsive overrides collapse multi-column grids on small screens:

```css
@media (max-width: 640px) {
  .huf-ps-grid { grid-template-columns: 1fr; }
  .huf-pipeline { grid-template-columns: 1fr; }
}
```

Most grids use `auto-fill` / `auto-fit` with `minmax()` and adapt naturally.

---

## 12. Dark Mode

Dark mode is supported via the `.dark` class. The `.dark` block redefines every `--color-*` token — surfaces darken, text inverts, and the accent lifts to `#8B6DFF` so it keeps its contrast against a dark canvas. Semantic colors get their own dark pairs and much darker tints. Radius, spacing, type, and motion tokens are shared; only color changes.

The docs site uses `suppressHydrationWarning` on `<html>` to play nicely with Nextra's theme toggle.

---

## 13. How to Extend

1. **Add a new component:** define a new `.huf-*` class in `docs/app/globals.css` using existing tokens, or add a new React component in `docs/app/components/` and register it in `docs/mdx-components.js`.
2. **Add a new color:** prefer `color-mix()` or an existing semantic token; never add a second accent.
3. **Add a new spacing value:** keep to 4 / 8 / 12 / 16 / 24 / 32 / 48.
4. **Keep controls at 8px radius and cards at 14px.** If that needs to change, change the `--radius-*` tokens rather than a call site.
5. **Define both themes.** Any new color token needs a `.dark` counterpart.
6. **Document new utilities and components in this file.**

---

## 14. Quick Reference

```css
:root {
  /* Neutrals */
  --color-bg: #FBFBFD;            /* canvas */
  --color-bg-secondary: #F4F4F7;  /* sunken */
  --color-surface: #FFFFFF;
  --color-border: #ECECF0;        /* hairline */
  --color-border-strong: #E4E4E8; /* control edge */

  /* Text */
  --color-text-primary: #1D1D1F;
  --color-text-secondary: #6E6E73;
  --color-text-muted: #98989D;

  /* Accent — state only */
  --color-accent: #6D4AFF;
  --color-accent-subtle: #F1EDFF;
  --color-link: #6D4AFF;          /* the same accent — one hue only */

  /* Typography — system stack, no webfonts */
  --font-body: -apple-system, BlinkMacSystemFont, 'SF Pro Text',
               'Helvetica Neue', Helvetica, Arial, sans-serif;
  --font-mono: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;

  /* Radius, depth & motion */
  --radius-md: 8px;               /* controls */
  --radius-xl: 14px;              /* cards */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 8px 24px -8px rgba(0, 0, 0, 0.16);
  --duration-fast: 120ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

*HUF DESIGN.md v3.0*
