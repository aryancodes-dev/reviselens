import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {scoreValue, startRevision, text, trigger} from "./ReviseLensLeafHelpers"

/** Criterion 2: reveal Card 1, verify the answer and explanation, then score and advance. */
@component
export class ReviseLensCriterion2 extends Scenario {
  async run(): Promise<void> {
    await sleep(600)
    await startRevision()
    expect(text("Card Text").text).toBe('printf("%d", 7 / 2);')
    await trigger("Current Card")
    await sleep(200)
    expect(text("Answer Text").text).toBe("3")
    expect(text("Why Text").text).toBe("Integer division truncates the decimal part. If you said 3.5, this is the trap.")
    const before = scoreValue()
    await trigger("Got it")
    await sleep(200)
    expect(scoreValue() - before).toBe(1)
    expect(text("Progress").text).toBe("Card 2 of 5 • Score: 1 / 5")
    expect(text("Card Text").text).toBe('printf("%d", 7 % 2);')
  }
}
