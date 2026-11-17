import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {expectCardOne, startRevision, text, trigger} from "./ReviseLensLeafHelpers"

/** Criterion 5: retry only Card 2, then restart all five at score zero. */
@component
export class ReviseLensCriterion5 extends Scenario {
  async run(): Promise<void> {
    await sleep(500)
    await startRevision()
    for (let i = 0; i < 5; i++) {
      await trigger("Current Card")
      await sleep(100)
      await trigger(i === 1 ? "Missed it" : "Got it")
      await sleep(150)
    }
    await trigger("Retry missed only")
    await sleep(200)
    expect(text("Progress").text).toBe("Retry 1 of 1 • Retry score: 0 / 1\nFirst attempt: 4 / 5")
    expect(text("Card Text").text).toBe('printf("%d", 7 % 2);')
    await trigger("Current Card")
    await sleep(100)
    await trigger("Got it")
    await sleep(200)
    expect(text("Result Details").text).toBe("First attempt: 4 / 5 (80%)\nRetry score: 1 / 1\nAll retry cards mastered.")
    await trigger("Restart all 5")
    await sleep(200)
    expect(text("Score").text).toBe("0 / 5")
    expect(text("Progress").text).toBe("Card 1 of 5 • Score: 0 / 5")
    expectCardOne()
  }
}
