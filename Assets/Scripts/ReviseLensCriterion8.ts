import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {findSceneObjectByName, sleep} from "Leaf.lspkg/Utils/common/Utils"
import {scoreValue, startRevision, text, trigger} from "./ReviseLensLeafHelpers"
import {ReviseLensUI} from "./ReviseLensUI"

/** Criterion 8: a scored card is locked, including when revisited with Prev. */
@component
export class ReviseLensCriterion8 extends Scenario {
  async run(): Promise<void> {
    await sleep(500)
    await startRevision()
    await trigger("Current Card")
    await sleep(100)
    await trigger("Got it")
    await sleep(100)
    expect(scoreValue()).toBe(1)
    // The score action leaves the card unflipped and its score controls hidden;
    // invoke the same public event again to simulate a duplicate pinch callback.
    const uiObject = findSceneObjectByName("ReviseLens UI")
    const ui = uiObject.getComponent(ReviseLensUI.getTypeName()) as ReviseLensUI
    ui.onGotIt.invoke()
    await sleep(100)
    expect(text("Progress").text).toBe("Card 2 of 5 • Score: 1 / 5")
    expect(text("Score").text).toBe("1 / 5")
    await trigger("Prev")
    await sleep(100)
    expect(text("Progress").text).toBe("Card 1 of 5 • Score: 1 / 5")
    await trigger("Current Card")
    await sleep(100)
    await trigger("Missed it")
    await sleep(100)
    expect(scoreValue()).toBe(1)
    expect(text("Progress").text).toBe("Card 2 of 5 • Score: 1 / 5")
  }
}
