import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {findSceneObjectByName, sleep} from "Leaf.lspkg/Utils/common/Utils"
import {startRevision, text} from "./ReviseLensLeafHelpers"

/** Criterion 6: light text and task content placed forward and below the user's view. */
@component
export class ReviseLensCriterion6 extends Scenario {
  async run(): Promise<void> {
    await sleep(500)
    await startRevision()
    const color = text("Card Text").textFill.color
    expect(color.x).toBeGreaterThan(0.9)
    expect(color.y).toBeGreaterThan(0.9)
    expect(color.z).toBeGreaterThan(0.9)
    const position = findSceneObjectByName("ReviseLens UI").getTransform().getLocalPosition()
    expect(position.z).toBe(-60)
    expect(position.y).toBe(-12)
    expect(findSceneObjectByName("Study Panel").enabled).toBe(true)
  }
}
