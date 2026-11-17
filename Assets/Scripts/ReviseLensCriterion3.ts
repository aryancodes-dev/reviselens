import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {scoreValue, startRevision, text, trigger} from "./ReviseLensLeafHelpers"

/** Criterion 3: a Missed rating keeps score unchanged and marks Card 2 orange. */
@component
export class ReviseLensCriterion3 extends Scenario {
  async run(): Promise<void> {
    await sleep(500)
    await startRevision()
    const before = scoreValue()
    await trigger("Current Card")
    await sleep(100)
    await trigger("Missed it")
    await sleep(200)
    expect(scoreValue()).toBe(before)
    const missed = text("Card 1 Status")
    expect(missed.text).toBe("1")
    expect(missed.textFill.color.x).toBeCloseTo(1.0, 2)
    expect(missed.textFill.color.y).toBeCloseTo(0.58, 2)
    expect(text("Progress").text).toBe("Card 2 of 5 • Score: 0 / 5")
  }
}
