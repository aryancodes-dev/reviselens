import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {findInteractableByName} from "Leaf.lspkg/Interactors/InteractableUtils"
import {findSceneObjectByName} from "Leaf.lspkg/Utils/common/Utils"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"
import {DefaultLeafInteractor} from "Leaf.lspkg/Interactors/interactor/DefaultLeafInteractor"

export function text(name: string): Text {
  return findSceneObjectByName(name).getComponent("Component.Text") as Text
}

export async function trigger(name: string): Promise<void> {
  const target = findInteractableByName(name)
  if (!target) throw new Error(`LEAF could not find interactable: ${name}`)
  await new DefaultLeafInteractor().trigger(target)
}

/** Start from the initial screen so each scenario is independent of prior runs. */
export async function startRevision(): Promise<void> {
  await trigger("Start")
  await sleep(250)
}

export function expectCardOne(): void {
  expect(text("Card Text").text).toBe('printf("%d", 7 / 2);')
}

export function scoreValue(): number {
  return Number(text("Score").text.split(" /")[0])
}
