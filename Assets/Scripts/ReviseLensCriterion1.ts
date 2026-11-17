import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {findSceneObjectByName, sleep} from "Leaf.lspkg/Utils/common/Utils"
import {text, trigger} from "./ReviseLensLeafHelpers"

/** Criterion 1: pinch Start and see the correctly sized, readable first card. */
@component
export class ReviseLensCriterion1 extends Scenario {
  async run(): Promise<void> {
    await sleep(1200)
    expect(findSceneObjectByName("Start Panel").enabled).toBe(true)
    expect(text("Start Title").text).toBe("ReviseLens MAX")
    await trigger("Start")
    await sleep(300)
    expect(text("Card Text").text).toBe('printf("%d", 7 / 2);')
    expect(text("Score").text).toBe("0 / 5")
  }
}
