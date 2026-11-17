# ReviseLens

5 C programming flashcards on your desk in AR — guess, flip, watch execution, score yourself, retry only what you missed.

Built for **Learn AR with SPECS, Round 2** on Devpost.

## What it is

BCA 1st-year students revising C before exams. Phone revision distracts; paper cards cannot score you. ReviseLens puts the cards on your desk in AR, next to your notebook, hands free.

Flow: Start panel → Card 1–5: question side → guess → flip the card → answer + one-line why → tap **Got it** (green, score +1) or **Missed it** (orange, marked for retry) → after Card 5, result panel shows your score out of 5 and the missed card numbers → **Retry missed only** or **Restart all 5**.

The **Execution Trace & Variable State Box** sits beside each flipped card and shows the code running step by step. On Card 5 (`x++`), it shows `[x = 3] → [x = 4]`, 3 then 4, final output `34`.

The 5 cards (all answers verified by running the C code):

1. `printf("%d", 7 / 2);` → `3` — integer division
2. `printf("%d", 7 % 2);` → `1` — remainder
3. `int a = 5; a += 2; printf("%d", a);` → `7`
4. `char ch = 'B'; printf("%d", ch);` → `66` — ASCII of 'B'
5. `int x = 3; printf("%d", x++); printf("%d", x);` → `34` — x++ prints the old value first

First-attempt score is kept separate from the retry score. Double-tapping Got it never adds the point twice.

## Demo video

https://youtu.be/jMEF9048rJY

## How it was built

- Lens Studio 5.23.2 (SPECS Base Template) — do not use 5.24.1, its SPECS developer sign-in is blocked in India
- CLAD via Lens Studio MCP, built with Codex
- Spectacles Interaction Kit + UI Kit (pinch / click to interact)
- LEAF tests: all 8 scenarios passed (Start, Flip/score, Missed, Result, Retry/Restart, Text/placement, Execution traces, Score lock)

## How to open it

1. Install Lens Studio 5.23.2 and sign in.
2. Open `ReviseLens.esproj`.
3. Open Interactive Preview (Preview 1). Click = pinch.

## Testing

Tested in Lens Studio preview only. No physical SPECS glasses were used. Real-glasses comfort and hand tracking are unverified.

## Files

- `devpost/design-brief.md` — the final design brief (8 done criteria)
- `Assets/Scripts/ReviseLensMain.ts` — main logic
- `Assets/Scripts/ReviseLensUI.ts` — UI
- `Assets/Scripts/LeafIndex.ts` — LEAF test scenarios
