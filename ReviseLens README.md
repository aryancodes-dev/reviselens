<div align="center">

# 🥽 ReviseLens

### *5 C flashcards on your desk — in AR.*

**Guess. Flip. Watch the code run. Score yourself. Retry only what you missed.**

[![Devpost](https://img.shields.io/badge/Devpost-Learn_AR_with_SPECS-003E54?style=for-the-badge&logo=devpost)](https://devpost.com/software/reviselens)
[![GitHub](https://img.shields.io/badge/GitHub-aryancodes--dev-181717?style=for-the-badge&logo=github)](https://github.com/aryancodes-dev/reviselens)
[![Demo Video](https://img.shields.io/badge/▶️_Demo_Video-YouTube-FF0000?style=for-the-badge&logo=youtube)](https://youtu.be/jMEF9048rJY)
[![Hackathon](https://img.shields.io/badge/Hackathon-Learn_AR_with_SPECS_Round_2-8B5CF6?style=for-the-badge)](https://devpost.com/software/reviselens)

**Built for Learn AR with SPECS, Round 2 on Devpost — solo.**

| 🏆 Prize Pool | 📅 Deadline | 👤 Built By |
|:---:|:---:|:---:|
| **$2,500** (1st $1,250 • 2nd $750 • 3rd $500) | **8 Dec 2026, 3:30 AM IST** | **Aryan Kumar Shah** |

</div>

---

## ✨ What It Is

BCA 1st-year students revising C before exams have a problem:

- 📱 **Phone revision distracts** — one notification and you're gone
- 🃏 **Paper cards cannot score you** — you never know what you actually missed

**ReviseLens fixes both.** It puts the cards on your desk **in AR**, next to your notebook, hands-free.

> ### *Your desk becomes your revision room.*

---

## 🎮 How It Works

| Step | What happens |
|:---:|:---|
| **1. Start panel** | Open the Lens, see the Start panel |
| **2. Card 1–5** | Question side appears — **guess the answer first** |
| **3. Flip** | Flip the card — answer + one-line *why* appears |
| **4. Score yourself** | Tap **Got it** (green, score +1) or **Missed it** (orange, marked for retry) |
| **5. Result panel** | After Card 5, see your score **out of 5** + the missed card numbers |
| **6. Retry** | **Retry missed only** — or **Restart all 5** |

### 🔍 Execution Trace & Variable State Box

Beside each flipped card, a box shows the code **running step by step**.

On Card 5 (`x++`), it shows `[x = 3] → [x = 4]`, 3 then 4, final output **34**.

---

## 🃏 The 5 Cards — All Answers Verified By Running The C Code

| # | Question | Answer | Why |
|:---:|---|:---:|:---|
| 1 | `printf("%d", 7 / 2);` | **3** | Integer division — no decimal part |
| 2 | `printf("%d", 7 % 2);` | **1** | Remainder of 7 ÷ 2 |
| 3 | `int a = 5; a += 2; printf("%d", a);` | **7** | `a += 2` means `a = a + 2` |
| 4 | `char ch = 'B'; printf("%d", ch);` | **66** | ASCII value of `'B'` |
| 5 | `int x = 3; x++; printf("%d", x);` | **34** | Trace: `[x = 3] → [x = 4]`, 3 then 4 |

*Every answer was verified by actually running the C code — no guessed answers.*

---

## 🚀 Features

| Feature | Details |
|:---|:---|
| 🥽 **Real AR** | Cards appear on your real desk in AR |
| 🃏 **5 C flashcards** | The most-asked C predict-the-output questions |
| 🔍 **Execution trace** | See the code run step by step, with variable state |
| ✅ **Self-scoring** | Got it / Missed it — honest score out of 5 |
| 🔁 **Smart retry** | Retry only the cards you missed |
| 🎯 **Exam-focused** | Made for BCA 1st-year C revision before exams |
| 📱 **Hands-free** | No phone scrolling, no distractions |

---

## 🛠️ Tech Stack

| | |
|:---|:---|
| **AR** | Lens Studio / Snap AR |
| **Language** | TypeScript (100%) |
| **Platform** | Snapchat Lens |
| **Code** | C (flashcard questions, gcc-verified) |

---

## 📁 Project Structure

```
reviselens/
├── Assets/                  # Lens assets — cards, textures, models
├── Packages/                # Lens Studio packages
├── agent/skills/plan-lens/  # Planning skill for the Lens
├── devpost/                 # Devpost submission files
├── AGENTS.md                # Agent instructions
├── CLAUDE.md                # Claude instructions
├── README.md                # This file
├── ReviseLens.esproj        # Lens Studio project
├── .virtual-scene.json      # Virtual scene config
├── jsconfig.json
├── tsconfig.json
└── skills-lock.json
```

---

## ▶️ Demo Video

🎬 **Watch ReviseLens in action (2:24):**

[![ReviseLens Demo](https://img.shields.io/badge/▶️_Watch_Demo-YouTube-FF0000?style=for-the-badge&logo=youtube)](https://youtu.be/jMEF9048rJY)

**https://youtu.be/jMEF9048rJY**

---

## 🏆 Hackathon — Learn AR with SPECS, Round 2

| | |
|:---|:---|
| **Hackathon** | Learn AR with SPECS, Round 2 |
| **Platform** | [Devpost](https://devpost.com/software/reviselens) |
| **Submission** | [devpost.com/software/reviselens](https://devpost.com/software/reviselens) |
| **Prize** | $2,500 total — 1st $1,250, 2nd $750, 3rd $500 |
| **Deadline** | 8 Dec 2026, 3:30 AM IST |
| **Live Review** | 3 Dec 2026, 12 PM ET |
| **Team** | Solo — Aryan Kumar Shah |

---

## 💡 Why ReviseLens?

| Problem | ReviseLens answer |
|:---|:---|
| Phone revision distracts | AR on your desk — no feed, no notifications |
| Paper cards can't score you | Got it / Missed it scoring, out of 5 |
| You re-read everything | Retry missed only — revision where you're weak |
| Code feels abstract | Execution trace shows every step, every variable |

---

## 🔗 Links

| | |
|:---|:---|
| 🐙 **GitHub** | [github.com/aryancodes-dev/reviselens](https://github.com/aryancodes-dev/reviselens) |
| 🏆 **Devpost** | [devpost.com/software/reviselens](https://devpost.com/software/reviselens) |
| ▶️ **Demo** | [youtu.be/jMEF9048rJY](https://youtu.be/jMEF9048rJY) |
| 🌐 **Portfolio** | [aryancodes-dev.github.io](https://aryancodes-dev.github.io/) |
| 💼 **LinkedIn** | [aryan-kumar-shah-933222443](https://www.linkedin.com/in/aryan-kumar-shah-933222443) |

---

<div align="center">

### 💜 *Made by Aryan Kumar Shah — Aspiring Software Developer*

### 🥽 *Revise in AR. Remember forever.*

</div>
