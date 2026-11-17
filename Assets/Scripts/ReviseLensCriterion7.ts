import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {findSceneObjectByName, sleep} from "Leaf.lspkg/Utils/common/Utils"
import {startRevision, text, trigger} from "./ReviseLensLeafHelpers"

/** Criterion 7: show the live trace beside the flipped card and format score/results. */
@component
export class ReviseLensCriterion7 extends Scenario {
  async run(): Promise<void> {
    await sleep(500)
    await startRevision()
    expect(findSceneObjectByName("Live Execution Panel").enabled).toBe(false)
    await trigger("Current Card")
    await sleep(150)
    expect(findSceneObjectByName("Live Execution Panel").enabled).toBe(true)
    expect(text("Execution Trace").text).toBe("Step 1: 7 / 2 (int / int) → Step 2: Decimal .5 dropped → Step 3: Output: 3")
    await trigger("Got it")
    await sleep(150)
    expect(text("Score").text).toBe("1 / 5")
    for (let i = 1; i < 5; i++) {
      await trigger("Current Card")
      await sleep(80)
      await trigger(i < 3 ? "Got it" : "Missed it")
      await sleep(120)
    }
    expect(text("Result Details").text).toBe("You got 3 / 5 (60%)\nMissed cards: 4, 5")
  }
}
