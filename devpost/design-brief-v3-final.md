---
status: ready
---

# Design brief: ReviseLens MAX

## The one spatial moment

A BCA 1st-year student is sitting at his study desk revising C programming before an exam. Five flashcards sit on the real desk in front of him, at real card size, next to his notebook. He thinks of the answer, pinches a card to flip it, and watches a spatial 3D Variable Memory Box next to the card step through the C execution live (showing exactly how values in RAM change and print to the output). He then honestly taps "Got it" or "Missed it". At the end he sees his score out of 5 and can retry only the cards he missed. No phone in his hand, no other app to distract him.

## Why it belongs on glasses

- Uses: draws in the world, leaves your body free, shares your view
- Why it's better than the phone or laptop version: the cards and the 3D Variable Memory Box sit spatially where he is already looking — on the desk, right beside his physical notebook. Instead of imagining how C memory and post-increment operators work in his head, he sees the variable box update and emit the output in 3D space next to the code. His hands stay free to write notes, and his eyes stay up. A phone would pull his eyes down and tempt him to open other apps. A laptop would block the desk. Glasses keep the active recall and live code execution in the same space as the studying.

## Product or overlay

- Type: product: the virtual thing is the experience
- What the real version would sense: nothing
- Stand-in for the preview: none needed. The 5 questions, answers, explanations, and step-by-step execution states are hard-coded in the Lens, as listed below.

The 5 cards (all outputs verified by running the C code with gcc):

1. Question: `printf("%d", 7 / 2);`
   - Answer: `3`
   - Step-by-Step Execution Trace: `Step 1: 7 / 2 (int / int) → Step 2: Decimal .5 dropped → Step 3: Output: 3`
   - Why: integer division truncates the decimal part. If you said 3.5, this is the trap.
2. Question: `printf("%d", 7 % 2);`
   - Answer: `1`
   - Step-by-Step Execution Trace: `Step 1: 7 / 2 = 3 → Step 2: Remainder = 1 → Step 3: Output: 1`
   - Why: % gives the division remainder.
3. Question: `int a = 5; a += 2; printf("%d", a);`
   - Answer: `7`
   - Step-by-Step Execution Trace: `Step 1: [a = 5] → Step 2: a = 5 + 2 → Step 3: [a = 7] → Output: 7`
   - Why: a += 2 updates variable a in memory by adding 2.
4. Question: `char ch = 'B'; printf("%d", ch);`
   - Answer: `66`
   - Step-by-Step Execution Trace: `Step 1: [ch = 'B'] → Step 2: %d reads ASCII integer → Step 3: Output: 66`
   - Why: 'B' has the value 66 on ASCII-compatible systems.
5. Question: `int x = 3; printf("%d", x++); printf("%d", x);`
   - Answer: `34` (the two printfs print 3 then 4 with no space or newline, so together they show as 34)
   - Step-by-Step Execution Trace: `Step 1: [x = 3] → Step 2: 1st printf prints 3 → Step 3: x++ increments [x = 4] → Step 4: 2nd printf prints 4 → Output: 34`
   - Why: post-increment (x++) prints the old value (3) first, then updates x to 4 so the second printf prints 4 (final output: 34).

This combines active recall with spatial visualization, which judges can grasp in 30 seconds: guess first, flip to watch the live memory trace, then score yourself honestly.

## Where things live

- Where the user is looking during the main task: down at the desk, at the cards, a little below eye level.
- Start panel: one panel on the desk, 60 cm away, 30 cm wide, 18 cm tall. Title "ReviseLens MAX", one line "5 C traps. Guess, flip, watch execution, score yourself.", one big Start button.
- Card row: 5 small cards in a row on the desk surface, about 60 cm in front of the user, each about 14 cm wide and 9 cm tall. The current card has a bright cyan/white highlight border. Scored cards turn green (Got it) or orange (Missed it).
- Current card (large): the card being read sits slightly raised and closer, about 50 cm away, 26 cm wide and 17 cm tall, in the centre of view.
- Execution Trace & Variable State Box panel: sits to the right of the Current card with a 4 cm gap between the card and panel edges, and the panel centre positioned at x = +26 cm relative to the card centre (about 50 cm away, 18 cm wide, 14 cm tall). Appears only when the Current card is flipped, showing the variable state in memory (e.g., `[x = 3] → [x = 4]`) and the step-by-step execution trace in bright, readable light text.
- Score / progress: small light text above the cards, "Card 2 of 5 • Score: 1 / 5", about 70 cm away, never blocking the cards.
- Got it / Missed it buttons: two large buttons under the current card, on the desk, each 12 cm wide. Green for "Got it", orange for "Missed it". They appear only after the card is flipped.
- Result panel: after Card 5 (or the final retry card), one panel on the desk, 60 cm away, 32 cm wide, 22 cm tall. Shows "You got 3 / 5 (60%)", lists the missed card numbers for revision, and two buttons: "Retry missed only" and "Restart all 5".

## Hands and input

- Start: pinch the Start button.
- Flip card: pinch on the current card to flip it, revealing the answer, the one-line why, and the Execution Trace & Variable State Box panel beside it.
- Got it: pinch the green "Got it" button after flipping. Score goes up by 1 (locked so accidental double-pinches or revisiting cards cannot increase the score twice for the same card; the first-attempt score is kept separate from the retry score).
- Missed it: pinch the orange "Missed it" button after flipping. Score stays the same, and the card is marked orange for retry.
- Next: after Got it / Missed it, the next card appears automatically. No separate Next button, to keep the flow to one decision per card.
- Retry missed only: pinch it on the result panel to revise only the missed cards, in the same flip, trace, and score flow, keeping the first-attempt score separate from the retry score. If all 5 were correct (5 / 5), this button is disabled or hidden.
- Restart all 5: pinch it on the result panel to start again from Card 1, with the score and all card statuses reset to 0.
- Targets are big and highlight clearly when aimed at or hovered over.
- Voice (if any) and the button that does the same job: none. Buttons do everything, so it works in the preview with a mouse click as a pinch.

## When things show

- Start panel: shows when the Lens starts, hides when Start is pinched.
- Card row and current card: show after Start, hide when the result panel shows.
- Answer side and Execution Trace & Variable State Box panel: show only after a pinch on the card, hide when Got it / Missed it is pinched.
- Got it / Missed it buttons: show only after a flip, hide after one is pinched.
- Progress and score text: shows always during revision.
- Result panel: shows only after Card 5 is scored, hides when Retry missed only or Restart all 5 is pinched.
- If something needs attention out of view: none. Everything needed is on the desk in view.

## Done criteria

Each one can be checked in Lens Studio's preview.

1. I can see the Start panel on the desk in the preview, and pinching Start shows Card 1 at real card size, with readable light text.
2. Pinching Card 1 flips it and shows the correct answer `3` and the why line. Pinching Got it raises the score to 1 and shows Card 2.
3. Pinching a card, then Missed it, marks that card orange in the card row and does not raise the score.
4. After Card 5 is scored, I see a result panel with the correct score out of 5, the missed card numbers, and both Retry and Restart buttons.
5. Pinching "Retry missed only" shows only the missed cards again, in the same flip-and-score flow, keeping the first-attempt score separate from the retry score. Pinching "Restart all 5" resets the score to 0 and shows Card 1.
6. All text is light and readable in the preview, and no panel is stuck to my face or behind me.
7. Flipping each of the 5 cards (Cards 1 through 5) shows the Execution Trace & Variable State Box panel beside the card (x = +26 cm relative to card centre, 4 cm edge gap) with the exact Step-by-Step Execution Trace for that card, including Card 5 showing `[x = 3] → [x = 4]`, first printf printing 3, second printf printing 4, and final output 34.
8. Pinching Got it twice quickly on the same card or revisiting a card never raises the score more than once, and the first-attempt score remains separate from the retry score.

## Out of scope

- No new questions added by the user, no typing answers, no score saving across sessions. Score resets when the Lens restarts.
- No voice input, no camera recognition of a real book or notebook.
- No login, no internet, no leaderboard, no sound that blocks the task.

## Risks and open questions

Known limitations:

- No physical SPECS device is available for testing.
- Interaction logic can be tested in Preview, but real-world comfort, field of view and hand tracking remain unverified.

The idea is small on purpose: one desk, five cards, one flow: Start → Guess → Flip → Watch execution → Got it / Missed it → Result → Retry missed.

## Build notes for CLAD

- Build for SPECS so it runs and can be demonstrated in Lens Studio's preview. No SPECS device is available.
- Use Spectacles Interaction Kit (SIK) and UI Kit for all interactions, so they work with the mouse in Interactive Preview and with LEAF.
- Build any stand-in exactly as described above, and keep it obvious in the scene.
- Use real-world scale in centimeters. Keep content inside the user's view during the main task.
- The display is additive: black renders as transparent. Don't rely on black or very dark content to be seen; keep text light and readable from where the user stands.
- Get the basic flow working first, then add detail. Order: 1) Start → Card 1 shows, 2) Flip shows answer, 3) Got it / Missed it scores and moves on, 4) Result panel, 5) Retry missed only, 6) Restart, 7) Execution Trace & Variable State Box panel beside the flipped card, 8) Double-pinch and revisit score lock + separate first-attempt vs. retry scoring.
- Write LEAF scenarios for each done criterion, run them in preview, and report which pass. Say which criteria have no test.
- Don't record, identify, or follow people.

## After the build: judge it

This part is for you, after CLAD finishes.

1. **Does it work?** Ask your agent which LEAF tests passed and which done criteria have no test.
2. **Walk around it.** Open the preview in Interactive Preview. Use WASD to move, Q and E to go down and up, and right-drag (or hold Shift) to look around. Clicking acts as a pinch. Stand where a user would and look at the task.
3. **Ask the three questions.**
   - Does it use what I'm looking at?
   - Does it put something in my space, where it belongs?
   - Does it free my hands or let me keep my eyes up?
   - Would it be just as good on a phone? If so, what would make it need the glasses?
4. **Check comfort.**
   - Everything I need is in view while I do the task. Nothing sits at the edges, behind me, or stuck to my face.
   - Every control is within reach of someone standing there.
   - Text reads easily from where I stand. No dark UI disappearing.
   - Things show when needed and get out of the way.
5. **Label what you know.** Write "logic proven" next to anything the tests and preview show working, and "feel unproven" next to anything only real glasses could tell you (comfort over time, real hand tracking, real recognition).
6. **Fix with design notes, not code.** Tell your agent what to change in design terms, for example: "Move the step card 15 cm lower and next to the pan. Make the Next button twice as big. Re-run the tests." If a fix takes under a minute, like nudging a panel, do it yourself in the scene.
7. **Submit.** Record a video under 3 minutes of your Lens in the preview, public on YouTube. Make your repo public with your Lens Studio project and this `devpost/` folder. Details are on the hackathon site: https://learn-specs.devpost.com/resources
