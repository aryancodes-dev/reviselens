import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {findInteractableByName} from "Leaf.lspkg/Interactors/InteractableUtils"
import {findSceneObjectByName, sleep} from "Leaf.lspkg/Utils/common/Utils"
import {startRevision, trigger, text} from "./ReviseLensLeafHelpers"

/** Criterion 4: finish the run and verify result, missed number, retry, and restart. */
@component
export class ReviseLensCriterion4 extends Scenario {
  async run(): Promise<void> {
    await sleep(500)
    await startRevision()
    for (let i = 0; i < 5; i++) {
      await trigger("Current Card")
      await sleep(100)
      await trigger(i === 1 ? "Missed it" : "Got it")
      await sleep(150)
    }
    expect(findSceneObjectByName("Result Panel").enabled).toBe(true)
    expect(text("Result Details").text).toBe("You got 4 / 5 (80%)\nMissed cards: 2")
    expect(findInteractableByName("Retry missed only") !== undefined).toBe(true)
    expect(findInteractableByName("Restart all 5") !== undefined).toBe(true)
  }
}
