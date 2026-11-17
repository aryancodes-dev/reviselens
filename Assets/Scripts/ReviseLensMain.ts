import {ReviseLensUI} from "./ReviseLensUI"

type Flashcard = {question: string; answer: string; why: string}

const CARDS: Flashcard[] = [
  {question: 'printf("%d", 7 / 2);', answer: "3", why: "Integer division truncates the decimal part. If you said 3.5, this is the trap."},
  {question: 'printf("%d", 7 % 2);', answer: "1", why: "% gives the division remainder."},
  {question: "int a = 5; a += 2; printf(\"%d\", a);", answer: "7", why: "a += 2 updates variable a in memory by adding 2."},
  {question: "char ch = 'B'; printf(\"%d\", ch);", answer: "66", why: "'B' has the value 66 on ASCII-compatible systems."},
  {question: 'int x = 3; printf("%d", x++); printf("%d", x);', answer: "34", why: "Post-increment prints the old value (3), then updates x to 4 so the second printf prints 4. The output is 34."},
]

const TRACES = [
  "Step 1: 7 / 2 (int / int) → Step 2: Decimal .5 dropped → Step 3: Output: 3",
  "Step 1: 7 / 2 = 3 → Step 2: Remainder = 1 → Step 3: Output: 1",
  "Step 1: [a = 5] → Step 2: a = 5 + 2 → Step 3: [a = 7] → Output: 7",
  "Step 1: [ch = 'B'] → Step 2: %d reads ASCII integer → Step 3: Output: 66",
  "Step 1: [x = 3] → Step 2: 1st printf prints 3 → Step 3: x++ increments [x = 4] → Step 4: 2nd printf prints 4 → Output: 34"
]

const MEMORY_STATES = [
  "[7 / 2] → [int result = 3]\nOutput: 3",
  "[7 / 2 = 3] → [remainder = 1]\nOutput: 1",
  "[a = 5] → [a = 7]\nOutput: 7",
  "[ch = 'B'] → [ASCII value = 66]\nOutput: 66",
  "[x = 3] → [x = 4]\nOutput: 34"
]

/** Owns flashcard order, flip state, scoring, and retry selection. UI remains a passive view. */
@component
export class ReviseLensMain extends BaseScriptComponent {
  @input
  @hint("UIKit view for the revision flow")
  ui!: ReviseLensUI

  private firstAttemptStatus: number[] = [-1, -1, -1, -1, -1]
  private retryStatus: number[] = [-1, -1, -1, -1, -1]
  private activeCards: number[] = [0, 1, 2, 3, 4]
  private cursor = 0
  private flipped = false
  private retryMode = false

  onAwake(): void {
    // Bind after Lens startup so the other root object's @input is ready.
    this.createEvent("OnStartEvent").bind(() => this.bindUIEvents())
  }

  private bindUIEvents(): void {
    this.ui.onStartRequested.add(() => this.startAll())
    this.ui.onFlip.add(() => this.flip())
    this.ui.onGotIt.add(() => this.scoreCurrent(true))
    this.ui.onMissed.add(() => this.scoreCurrent(false))
    this.ui.onPrev.add(() => this.previous())
    this.ui.onRetry.add(() => this.retryMissed())
    this.ui.onRestart.add(() => this.startAll())
  }

  private startAll(): void {
    this.firstAttemptStatus = [-1, -1, -1, -1, -1]
    this.retryStatus = [-1, -1, -1, -1, -1]
    this.activeCards = [0, 1, 2, 3, 4]
    this.cursor = 0
    this.retryMode = false
    this.flipped = false
    this.showCurrent()
  }

  private flip(): void {
    if (this.cursor >= this.activeCards.length) return
    this.flipped = true
    this.showCurrent()
  }

  private scoreCurrent(gotIt: boolean): void {
    if (!this.flipped || this.cursor >= this.activeCards.length) return
    const cardIndex = this.activeCards[this.cursor]
    const attemptStatus = this.retryMode ? this.retryStatus : this.firstAttemptStatus
    if (attemptStatus[cardIndex] < 0) attemptStatus[cardIndex] = gotIt ? 1 : 0
    this.cursor++
    this.flipped = false
    if (this.cursor >= this.activeCards.length) {
      this.showResult()
    } else {
      this.showCurrent()
    }
  }

  private previous(): void {
    if (this.cursor <= 0) return
    this.cursor--
    this.flipped = false
    this.showCurrent()
  }

  private retryMissed(): void {
    this.activeCards = this.firstAttemptStatus.map((value, index) => value === 0 ? index : -1).filter(index => index >= 0)
    if (this.activeCards.length === 0) return
    for (const index of this.activeCards) this.retryStatus[index] = -1
    this.cursor = 0
    this.flipped = false
    this.retryMode = true
    this.showCurrent()
  }

  private firstScore(): number {
    return this.firstAttemptStatus.filter(value => value === 1).length
  }

  private retryScore(): number {
    return this.retryStatus.filter(value => value === 1).length
  }

  private displayedStatuses(): number[] {
    return this.firstAttemptStatus.map((value, index) => this.retryMode && this.retryStatus[index] >= 0
      ? this.retryStatus[index]
      : value)
  }

  private showCurrent(): void {
    const cardIndex = this.activeCards[this.cursor]
    if (cardIndex === undefined) {
      this.showResult()
      return
    }
    const card = CARDS[cardIndex]
    this.ui.showStudy(this.cursor + 1, this.activeCards.length,
      this.retryMode ? this.retryScore() : this.firstScore(), this.firstScore(), this.retryScore(),
      card.question, card.answer, card.why, this.flipped, this.displayedStatuses(), this.retryMode,
      TRACES[cardIndex], MEMORY_STATES[cardIndex])
  }

  private showResult(): void {
    const missed = this.firstAttemptStatus.map((value, index) => value === 0 ? index + 1 : -1).filter(index => index > 0)
    const stillMissed = this.retryMode ? missed.filter(number => this.retryStatus[number - 1] === 0) : missed
    this.ui.showResult(this.firstScore(), CARDS.length, missed, this.retryMode,
      this.retryScore(), missed.length, stillMissed)
  }
}
