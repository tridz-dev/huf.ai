# HUF Design System

> Instrument / Control-Room aesthetic for the HUF documentation site.
> Built on Next.js 15 + Nextra 4. Source of truth: `docs/app/globals.css`.

---

## 1. Design Philosophy

The HUF docs are styled like a **control-room interface**: readable under pressure, high information density, and restrained. There is one accent color (signal orange) used sparingly to mark state, links, and active elements. Everything else is near-black ink, warm paper, and cool steel.

Principles:

- **One accent only.** Orange is the signal. Everything else is neutral.
- **Flat surfaces.** No drop shadows; depth is created with borders and background tiers.
- **Sharp corners.** Radius is `2px` everywhere.
- **Mono labels, sans body, display headings.** Information hierarchy is conveyed through typeface, size, and letter-spacing, not color.
- **Borders as structure.** Grids and panels are separated with 1px hairlines.

---

## 2. Design Tokens

Tokens are defined as CSS custom properties in `docs/app/globals.css` under `:root` (light) and `.dark` (dark mode).

### 2.1 Surfaces

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-bg` | `#F2F3EF` | `#15181C` | Page background |
| `--color-bg-secondary` | `#E9EBE4` | `#1E2228` | Sidebar, code backgrounds, secondary panels |
| `--color-surface` | `#FBFCFA` | `#1E2228` | Cards, popovers, active sidebar rows |
| `--color-border` | `#D7DACF` | `#343A42` | Primary borders, dividers |
| `--color-border-subtle` | `#E3E5DD` | `#2A2F36` | Table row separators, subtle dividers |

### 2.2 Text

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-text-primary` | `#15181C` | `#F2F3EF` | Headings, strong text, primary body |
| `--color-text-secondary` | `#5A636F` | `#9AA3AE` | Body paragraphs, captions, descriptions |
| `--color-text-muted` | `#8A929C` | `#6A737E` | Labels, folder names, disabled/meta text |

### 2.3 Signal / Accent

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-accent` | `#E8531F` | `#E8531F` | Active states, links hover, markers, primary CTA |
| `--color-accent-hover` | `#BC3E0F` | `#F26A36` | Link color, hover states |
| `--color-accent-subtle` | `#F2F3EF` | `#2A1A14` | Tinted backgrounds (rare) |

### 2.4 Links

| Token | Light | Dark |
|-------|-------|------|
| `--color-link` | `#BC3E0F` | `#F26A36` |
| `--color-link-hover` | `#E8531F` | `#FF8A5C` |

Links use a 1px bottom border at 40% opacity instead of underlines.

### 2.5 Code

| Token | Light | Dark |
|-------|-------|------|
| `--color-code-bg` | `#E9EBE4` | `#1E2228` |
| `--color-code-text` | `#15181C` | `#F2F3EF` |

### 2.6 Nextra Theme Overrides

```css
--nextra-primary-hue: 17;
--nextra-primary-saturation: 82%;
```

This wires Nextra's active-link / search highlight into the signal orange.

---

## 3. Typography

### 3.1 Typefaces

| Role | Font | Fallback |
|------|------|----------|
| Display | Big Shoulders | `sans-serif` |
| Body | Archivo | system sans stack |
| Mono / Data | Martian Mono | `Fira Code`, `Cascadia Code`, monospace |

Loaded via Google Fonts:

```css
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders:opsz,wght@10..72,500;10..72,600;10..72,700&family=Archivo:wght@400;500;600&family=Martian+Mono:wght@400;500&display=swap');
```

### 3.2 Type Scale

| Token | Size | Usage |
|-------|------|-------|
| `--text-xs` | 11px | Captions, labels, TOC |
| `--text-sm` | 13px | Tables, navigation, small UI |
| `--text-base` | 15px | Body paragraphs, lists |
| `--text-lg` | 17px | Lead paragraphs |
| `--text-xl` | 20px | H3 |
| `--text-2xl` | 25px | H2 |
| `--text-3xl` | 32px | — |
| `--text-4xl` | 40px | Article H1 |
| `--text-5xl` | 52px | — |

### 3.3 Line Heights

| Token | Value | Usage |
|-------|-------|-------|
| `--leading-tight` | 0.92 | Display H1 |
| `--leading-snug` | 1.18 | H2, H3 |
| `--leading-normal` | 1.55 | Body, tables |
| `--leading-relaxed` | 1.7 | Long-form paragraphs, lists |

### 3.4 Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--tracking-tight` | -0.01em | — |
| `--tracking-normal` | 0 | Body, headings |
| `--tracking-wide` | 0.05em | Breadcrumbs |
| `--tracking-widest` | 0.14em | Uppercase mono labels, TOC heading |

### 3.5 Heading Styles

| Element | Font | Size | Weight | Case | Notes |
|---------|------|------|--------|------|-------|
| H1 | Big Shoulders | `--text-4xl` | 700 | uppercase | One display moment per page |
| H2 | Archivo | `--text-2xl` | 600 | normal | Border-bottom separator |
| H3 | Archivo | `--text-xl` | 600 | normal | — |
| H4–H6 | Martian Mono | `--text-xs` | 500 | uppercase | Widest tracking |

---

## 4. Spacing

Base unit is **4px**. All spacing tokens are defined in rems assuming 16px root.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 0.25rem / 4px | Tight inline gaps |
| `--space-2` | 0.5rem / 8px | Small gaps, pill padding |
| `--space-3` | 0.75rem / 12px | Cell padding, TOC margins |
| `--space-4` | 1rem / 16px | Standard padding |
| `--space-5` | 1.25rem / 20px | List indentation, code padding |
| `--space-6` | 1.5rem / 24px | Section gaps, card padding |
| `--space-8` | 2rem / 32px | Major block margins |
| `--space-10` | 2.5rem / 40px | H3 top margin |
| `--space-12` | 3rem / 48px | First H2 after intro |
| `--space-16` | 4rem / 64px | H2 chapter breaks |

---

## 5. Borders, Radius & Elevation

### 5.1 Radius

Everything is **2px**. All radius tokens point to the same value intentionally.

```css
--radius-sm: 2px;
--radius-md: 2px;
--radius-lg: 2px;
--radius-xl: 2px;
```

### 5.2 Borders

- Default border: `1px solid var(--color-border)`
- Accent left rail: `border-left: 3px solid var(--color-accent)`
- Muted left rail: `border-left: 3px solid var(--color-text-muted)`
- Active sidebar marker: `2px` left border

### 5.3 Elevation

**No shadows.** Elevation is achieved through:

1. Background tier changes (`--color-bg` → `--color-bg-secondary` → `--color-surface`)
2. Borders
3. Accent markers

```css
--shadow-sm: none;
--shadow-md: none;
--shadow-lg: none;
```

---

## 6. Motion

Fast, utilitarian transitions.

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | 120ms | Hover, focus, color changes |
| `--duration-normal` | 180ms | Slightly larger transitions |
| `--duration-slow` | 260ms | Expand/collapse |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Hover in |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | State toggles |

### 6.1 Focus Rings

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

No browser default shadows.

---

## 7. Components

These are CSS utility classes defined in `docs/app/globals.css`. Use them directly in MDX with `className="..."`.

### 7.1 Eyebrow

A mono uppercase label with a signal-square marker.

```jsx
<div className="huf-eyebrow">Open source · AI agent infrastructure</div>
```

### 7.2 Buttons

```jsx
<a href="#" className="huf-btn huf-btn-solid">Primary →</a>
<a href="#" className="huf-btn huf-btn-ghost">Secondary →</a>
```

- Solid: ink background, paper text, signal hover
- Ghost: transparent, ink border, ink hover

### 7.3 Tick Rule

A chart-recorder strip divider.

```jsx
<div className="huf-tickrule"></div>
```

### 7.4 Use-Case Card

Wraps a complete use-case section.

```jsx
<div className="huf-use-case">
  <div className="huf-eyebrow">Use Case</div>
  ## Customer Support Automation
  ...
</div>
```

### 7.5 Problem / Solution Grid

```jsx
<div className="huf-ps-grid">
  <div className="huf-ps-cell">
    <span className="huf-ps-label">Problem</span>
    Support team spends too much time...
  </div>
  <div className="huf-ps-cell">
    <span className="huf-ps-label">Solution</span>
    AI agent handles common inquiries...
  </div>
</div>
```

### 7.6 Capability Grid

Term/definition cells in a bordered grid.

```jsx
<div className="huf-cap-grid">
  <div className="huf-cap-cell">
    <span className="huf-cap-term">Answer FAQs</span>
    Common questions about products...
  </div>
</div>
```

### 7.7 Feature Grid

Lighter version of capability grid, used for next steps and feature lists.

```jsx
<div className="huf-feature-grid">
  <div className="huf-feature-cell">
    <span className="huf-feature-label">FAQ automation</span>
    Low risk, high value, easy to test
  </div>
</div>
```

### 7.8 Agent Configuration Box

```jsx
<div className="huf-agent-config">
  <div className="huf-agent-config-header">Agent Configuration</div>
  <div className="huf-agent-config-body">
    ...
  </div>
</div>
```

### 7.9 Tool Tags

Mono tool names row.

```jsx
<div className="huf-tool-tags">
  <strong>Get Document</strong> (Customer) · <strong>Get List</strong> (...)
</div>
```

### 7.10 Trigger Badge

```jsx
<div className="huf-trigger-badge">After Insert on Support Ticket</div>
```

### 7.11 Benefit Strip

A row of benefit cells.

```jsx
<div className="huf-benefit-strip">
  <div className="huf-benefit-cell">
    <span className="huf-benefit-label">24/7 Availability</span>
    Instant responses anytime
  </div>
</div>
```

### 7.12 Pipeline Stepper

Numbered horizontal process steps.

```jsx
<div className="huf-pipeline">
  <div className="huf-pipeline-step">
    <span className="huf-pipeline-label">Build</span>
    <span className="huf-pipeline-desc">Create your tool package</span>
  </div>
</div>
```

### 7.13 Procedure Step

Large numbered vertical steps.

```jsx
<div className="huf-procedure-step">
  <span className="huf-step-counter">1</span>
  <div className="huf-step-body">
    <div className="huf-step-title">Start with One Use Case</div>
    <p>...</p>
  </div>
</div>
```

### 7.14 State Row

Agent lifecycle pills.

```jsx
<div className="huf-state-row">
  <span className="huf-state-pill">Idle</span>
  <span className="huf-state-arrow">→</span>
  <span className="huf-state-pill">Triggered</span>
</div>
```

### 7.15 Next Steps Grid

Card grid with linked next actions.

```jsx
<div className="huf-next-steps">
  - [Quick Start](/docs/quick-start)
    Short description
  - [Concepts](/docs/concepts/agents)
    Short description
</div>
```

> Requires an unordered list with links as direct children.

### 7.16 CLI Note

```jsx
<div className="huf-cli-note">
  Run <code>bench --site mysite install-app agent_flo</code>...
</div>
```

---

## 8. Nextra Integration

The design system overrides default Nextra chrome:

| Element | Override |
|---------|----------|
| Navbar | `--color-bg` background, `--color-border` bottom border |
| Logo | HUF wordmark + signal square via `::before` |
| Nav links | Martian Mono, 11px, uppercase, wide tracking |
| Sidebar | `--color-sidebar-bg` background, signal left rail on active |
| Sidebar folders | Martian Mono, 9.5px, uppercase, muted color |
| TOC heading | Martian Mono, widest tracking, muted |
| TOC active link | `--color-accent` |
| Search input | Mono, uppercase, 2px radius, accent focus border |
| Search results | No shadow, bordered panel |
| Footer | Mono, uppercase, muted |
| Breadcrumbs | Mono, uppercase |
| Pagination | Top border, accent hover |

---

## 9. Article Content Defaults

Default styles applied inside `article`:

- Body text: `--text-base` / `--leading-relaxed` / `--color-text-secondary`
- Lists: indented `--space-5`, relaxed line-height
- Tables: full-width, `--text-sm`, header in `--color-bg-secondary`
- Code blocks: `--color-surface` background, bordered, no shadow
- Inline code: `--color-code-bg`, bordered, `--font-mono`
- Blockquotes: left accent border, `--color-bg-secondary` background
- Callouts: Same blockquote styling; default emoji icon hidden

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
<Button href="https://github.com/tridz-dev/agent_flo" variant="ghost">View on GitHub</Button>
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

Dark mode is supported via the `.dark` class. Tokens invert the background/text scale while keeping the signal accent and sharp-radius language.

The docs site uses `suppressHydrationWarning` on `<html>` to play nicely with Nextra's theme toggle.

---

## 13. How to Extend

1. **Add a new component:** define a new `.huf-*` class in `docs/app/globals.css` using existing tokens, or add a new React component in `docs/app/components/` and register it in `docs/mdx-components.js`.
2. **Add a new color:** prefer `color-mix()` or a new semantic token; avoid adding new accent colors.
3. **Add a new spacing value:** keep to the 4px grid.
4. **Keep radius at 2px.** If you need to change it globally, update all `--radius-*` tokens.
5. **Document new utilities and components in this file.**

---

## 14. Quick Reference

```css
:root {
  /* Core brand */
  --color-bg: #F2F3EF;
  --color-text-primary: #15181C;
  --color-text-secondary: #5A636F;
  --color-accent: #E8531F;
  --color-accent-hover: #BC3E0F;

  /* Typography */
  --font-display: 'Big Shoulders', sans-serif;
  --font-body: 'Archivo', sans-serif;
  --font-mono: 'Martian Mono', monospace;

  /* Radius & motion */
  --radius-sm: 2px;
  --duration-fast: 120ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

*Last updated: 2026-06-11 · Branch: `feat/huf-instrument-redesign`*
