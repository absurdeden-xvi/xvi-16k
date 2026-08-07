---
name: xvi-art-direction
description: Review, explore, and refine the UI, interaction, typography, color, editorial layout, responsive behavior, product copy, logo, and brand system of XVI / 十六开. Use for design audits, screenshot critique, redesign concepts, mobile polish, template exploration, brand or logo studies, and implementation review whenever a task could change how XVI looks, reads, or feels.
---

# XVI Art Direction

## Establish the task boundary

1. Read `../../docs/XVI_DESIGN_DIRECTION_ZH.md` before proposing a direction. Treat it as the current design memory, not an immutable specification.
2. Identify the layer being changed:
   - application UI;
   - exported editorial page;
   - brand and logo.
3. State whether the task is an audit, concept exploration, implementation, or verification.
4. Mark important judgments as **confirmed**, **strong preference**, **provisional**, or **to explore**.
5. Give the user's latest explicit decision priority over every older document or implementation.

Do not let a change in one layer silently redesign another layer. Do not edit production files while the user is asking to review, compare, explore, or create a static study.

## Preserve the product

- Keep XVI a working editor rather than turning it into a landing page.
- Preserve the write, compose, refine, and export flow unless the task explicitly changes product behavior.
- Preserve local-first privacy, rich text, imported fonts, direct preview editing, language conversion, templates, palettes, and export controls when redesigning their presentation.
- Express literary character through typography, reading structure, proportion, and rhythm. Avoid generic literary symbols and decorative copy.
- Build breathing room through hierarchy and spacing, not tiny labels, excessive empty canvas, or compressed body text.
- Keep application chrome restrained while allowing exported pages to be more expressive.
- Treat mobile as a deliberate workflow, not a scaled-down desktop layout.
- Never invent slogans, sample prose, or brand claims for the user.

## Run the design workflow

### 1. Diagnose before drawing

Describe the concrete friction, affected user action, visual cause, and functions that must remain. Use screenshots and current files as evidence. Separate observed problems from personal speculation.

### 2. Propose genuinely distinct directions

Offer no more than three directions in one round. Keep their content and feature inventory identical. Differentiate them through information architecture, spatial composition, type hierarchy, control organization, and interaction behavior rather than color, radius, or font swaps alone.

Show desktop and mobile consequences together. Keep research labels out of the production UI.

### 3. Compare before recommending

For each direction, explain:

- what changes;
- what remains;
- why it suits XVI;
- where it may fail;
- what must be tested.

Recommend one direction only when the evidence supports it. Otherwise state the unresolved design question precisely.

### 4. Wait for the approval gate

Do not overwrite the main page, deploy, or push a concept merely because a mockup exists. Implement only the accepted direction and only within the agreed scope. Keep experimental HTML and CSS isolated until approval.

### 5. Verify the implementation

Check the real desktop UI, a real iPhone-sized viewport or device mirror, and Android browser behavior where relevant. Verify text fit, keyboard reachability, scroll behavior, selected states, preview-to-export consistency, and preservation of existing data and editing features.

### 6. Record the decision

After explicit user confirmation, update the design memory with the accepted rule or rejection reason. Record concrete observations such as "label is unreadably small" or "template compresses body width" instead of only "liked" or "disliked."

## Use focused task modes

- **Audit:** identify problems and priorities without changing files.
- **Concept:** create isolated studies or prototypes without changing production.
- **Implementation:** apply an already accepted direction with focused edits.
- **Verification:** compare the implementation against the accepted direction and test behavior.
- **Brand study:** isolate wordmark, naming, logo, and brand relationships from application and template work.

Use `references/review-template.md` to structure substantial reviews. Keep small reviews proportionate to the task.

## Stop on these failure patterns

Rework a proposal when it relies on generic SaaS cards, marketing heroes, rigid console grids, decorative purple gradients, literature clichés, arbitrary shape mixing, unexplained English decoration, reduced one-character labels, body-space compression, or a "new direction" consisting only of recoloring and rounding.

Do not hide uncertainty. If an issue remains exploratory, preserve it as an open question instead of fabricating a final rule.
