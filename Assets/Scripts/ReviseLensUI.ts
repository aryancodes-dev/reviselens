import Event from "SpectaclesInteractionKit.lspkg/Utils/Event"
import {FlexLayout} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexLayout"
import {FlexItem} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexItem"
import {FlexAlign, FlexAlignSelf, FlexDirection, FlexJustify} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexTypes"
import {BackPlate} from "SpectaclesUIKit.lspkg/Scripts/BackPlate"
import {Button} from "SpectaclesUIKit.lspkg/Scripts/Components/Button/Button"

const TEXT_WHITE = new vec4(0.96, 0.98, 1.0, 1.0)
const GREEN = new vec4(0.35, 1.0, 0.62, 1.0)
const ORANGE = new vec4(1.0, 0.58, 0.22, 1.0)
const YELLOW = new vec4(1.0, 0.86, 0.38, 1.0)
const RED = new vec4(1.0, 0.38, 0.36, 1.0)

/** Passive UIKit view for ReviseLens. All quiz state and scoring live in ReviseLensMain. */
@component
export class ReviseLensUI extends BaseScriptComponent {
  readonly onStartRequested = new Event<void>()
  readonly onFlip = new Event<void>()
  readonly onGotIt = new Event<void>()
  readonly onMissed = new Event<void>()
  readonly onPrev = new Event<void>()
  readonly onRetry = new Event<void>()
  readonly onRestart = new Event<void>()

  private startView!: SceneObject
  private studyView!: SceneObject
  private resultView!: SceneObject
  private traceView!: SceneObject
  private questionText!: Text
  private answerText!: Text
  private whyText!: Text
  private progressText!: Text
  private scoreText!: Text
  private traceText!: Text
  private memoryText!: Text
  private rowTexts: Text[] = []
  private resultText!: Text
  private startButton!: Button
  private currentCardButton!: Button
  private prevButton!: Button
  private gotButton!: Button
  private missedButton!: Button
  private retryButton!: Button
  private restartButton!: Button

  onAwake(): void {
    this.startView = this.makePanel("Start Panel", 30, 18)
    this.studyView = this.makePanel("Study Panel", 38, 38)
    this.resultView = this.makePanel("Result Panel", 32, 22)
    this.traceView = this.makePanel("Live Execution Panel", 18, 14)
    this.traceView.getTransform().setLocalPosition(new vec3(26, 0, 0))

    this.buildStart(this.startView)
    this.buildStudy(this.studyView)
    this.buildResult(this.resultView)
    this.buildTrace(this.traceView)
    this.showStart()
  }

  showStart(): void {
    this.startView.enabled = true
    this.studyView.enabled = false
    this.resultView.enabled = false
    this.traceView.enabled = false
  }

  showStudy(cardNumber: number, total: number, score: number, firstScore: number, retryScore: number,
            question: string,
            answer: string, why: string, flipped: boolean, statuses: number[], retryMode: boolean,
            trace: string, memoryState: string): void {
    this.startView.enabled = false
    this.studyView.enabled = true
    this.resultView.enabled = false
    this.traceView.enabled = flipped
    this.progressText.text = retryMode
      ? `Retry ${cardNumber} of ${total} • Retry score: ${retryScore} / ${total}\nFirst attempt: ${firstScore} / 5`
      : `Card ${cardNumber} of ${total} • Score: ${firstScore} / 5`
    this.progressText.size = retryMode ? 17 : 22
    this.scoreText.text = `${retryMode ? firstScore : score} / 5`
    this.traceText.text = trace
    this.memoryText.text = memoryState
    this.questionText.text = flipped ? answer : question
    this.answerText.text = flipped ? answer : "Think of the answer, then pinch the card to flip it."
    this.whyText.text = flipped ? why : ""
    this.answerText.sceneObject.enabled = flipped
    this.whyText.sceneObject.enabled = flipped
    this.prevButton.sceneObject.enabled = cardNumber > 1
    this.gotButton.sceneObject.enabled = flipped
    this.missedButton.sceneObject.enabled = flipped
    for (let i = 0; i < this.rowTexts.length; i++) {
      const status = statuses[i] ?? -1
      this.rowTexts[i].text = `${i + 1}`
      this.rowTexts[i].textFill.color = status === 1 ? GREEN : status === 0 ? ORANGE : i === cardNumber - 1 ? YELLOW : TEXT_WHITE
    }
  }

  showResult(score: number, total: number, missedNumbers: number[], retryMode: boolean,
             retryScore: number, retryTotal: number, stillMissed: number[]): void {
    this.startView.enabled = false
    this.studyView.enabled = false
    this.resultView.enabled = true
    this.traceView.enabled = false
    const percent = Math.round(score / total * 100)
    this.resultText.text = retryMode
      ? `First attempt: ${score} / ${total} (${percent}%)\nRetry score: ${retryScore} / ${retryTotal}` +
        (stillMissed.length ? `\nStill missed: ${stillMissed.join(", ")}` : "\nAll retry cards mastered.")
      : missedNumbers.length
      ? `You got ${score} / ${total} (${percent}%)\nMissed cards: ${missedNumbers.join(", ")}`
      : `You got ${score} / ${total} (${percent}%)\nAll five mastered.`
    this.retryButton.sceneObject.enabled = !retryMode && missedNumbers.length > 0
  }

  private makePanel(name: string, width: number, height: number): SceneObject {
    const panel = global.scene.createSceneObject(name)
    panel.setParent(this.sceneObject)
    panel.createComponent("Component.Canvas")
    const plate = panel.createComponent(BackPlate.getTypeName()) as BackPlate
    plate.size = new vec2(width, height)
    return panel
  }

  private makeColumn(parent: SceneObject, height: number, width: number = 30): SceneObject {
    const content = global.scene.createSceneObject("Content")
    content.setParent(parent)
    content.getTransform().setLocalPosition(new vec3(0, 0, 0.6))
    const flex = content.createComponent(FlexLayout.getTypeName()) as FlexLayout
    flex.autoDiscoverItemsOnStart = false
    flex.width = width - 2
    flex.height = height - 2
    flex.direction = FlexDirection.Column
    flex.justifyContent = FlexJustify.Center
    flex.alignItems = FlexAlign.Stretch
    flex.rowGap = 0.55
    flex.paddingTop = 0.8
    flex.paddingBottom = 0.8
    flex.paddingLeft = 1.2
    flex.paddingRight = 1.2
    return content
  }

  private addText(parent: SceneObject, name: string, value: string, height: number, size: number,
                  color: vec4 = TEXT_WHITE, textWidth: number = 29): Text {
    const so = global.scene.createSceneObject(name)
    so.setParent(parent)
    const text = so.createComponent("Component.Text") as Text
    text.text = value
    text.size = size
    text.weight = 500
    text.depthTest = true
    text.horizontalAlignment = HorizontalAlignment.Center
    text.verticalAlignment = VerticalAlignment.Center
    text.horizontalOverflow = HorizontalOverflow.Overflow
    text.verticalOverflow = VerticalOverflow.Overflow
    text.textFill.color = color
    text.layoutRect = Rect.create(-textWidth / 2, textWidth / 2, -height / 2, height / 2)
    const item = so.createComponent(FlexItem.getTypeName()) as FlexItem
    item.overrideHeight = height
    item.alignSelf = FlexAlignSelf.Stretch
    const parentFlex = parent.getComponent(FlexLayout.getTypeName()) as FlexLayout | null
    if (parentFlex) parentFlex.addItems([item])
    return text
  }

  private addButton(parent: SceneObject, name: string, label: string, width: number, height: number,
                    action: () => void): Button {
    const so = global.scene.createSceneObject(name)
    so.setParent(parent)
    const button = so.createComponent(Button.getTypeName()) as Button
    button.size = new vec3(width, height, 1)
    const labelSO = global.scene.createSceneObject(`${name} Label`)
    labelSO.setParent(so)
    labelSO.getTransform().setLocalPosition(new vec3(0, 0, 0.08))
    const text = labelSO.createComponent("Component.Text") as Text
    text.text = label
    text.size = 30
    text.weight = 500
    text.depthTest = true
    text.horizontalAlignment = HorizontalAlignment.Center
    text.verticalAlignment = VerticalAlignment.Center
    text.horizontalOverflow = HorizontalOverflow.Overflow
    text.layoutRect = Rect.create(-width / 2 + 0.4, width / 2 - 0.4, -height / 2, height / 2)
    button.onTriggerUp.add(action)
    const item = so.createComponent(FlexItem.getTypeName()) as FlexItem
    item.overrideWidth = width
    item.overrideHeight = height
    const parentFlex = parent.getComponent(FlexLayout.getTypeName()) as FlexLayout | null
    if (parentFlex) parentFlex.addItems([item])
    return button
  }

  private buildStart(panel: SceneObject): void {
    const content = this.makeColumn(panel, 18)
    this.addText(content, "Start Title", "ReviseLens MAX", 4.2, 54)
    this.addText(content, "Start Subtitle", "5 C traps. Guess, flip, watch execution, score yourself.", 3.0, 24)
    this.startButton = this.addButton(content, "Start", "Start", 15, 3.6, () => this.onStartRequested.invoke())
  }

  private buildStudy(panel: SceneObject): void {
    const content = this.makeColumn(panel, 38)
    const top = global.scene.createSceneObject("Progress Row")
    top.setParent(content)
    const topFlex = top.createComponent(FlexLayout.getTypeName()) as FlexLayout
    topFlex.autoDiscoverItemsOnStart = false
    topFlex.width = 27.6; topFlex.height = 2.1; topFlex.direction = FlexDirection.Row
    topFlex.alignItems = FlexAlign.Center; topFlex.justifyContent = FlexJustify.SpaceBetween
    this.progressText = this.addText(top, "Progress", "Card 1 of 5", 2.1, 24)
    this.scoreText = this.addText(top, "Score", "Score 0", 2.1, 24)
    this.rowTexts = []
    const cards = global.scene.createSceneObject("Card Row")
    cards.setParent(content)
    const rowFlex = cards.createComponent(FlexLayout.getTypeName()) as FlexLayout
    rowFlex.autoDiscoverItemsOnStart = false
    rowFlex.width = 27.6; rowFlex.height = 1.8; rowFlex.direction = FlexDirection.Row
    rowFlex.alignItems = FlexAlign.Center; rowFlex.justifyContent = FlexJustify.SpaceEvenly
    for (let i = 0; i < 5; i++) {
      const label = this.addText(cards, `Card ${i + 1} Status`, `${i + 1}`, 1.8, 25)
      this.rowTexts.push(label)
    }
    const cardObject = global.scene.createSceneObject("Current Card")
    cardObject.setParent(content)
    this.currentCardButton = cardObject.createComponent(Button.getTypeName()) as Button
    this.currentCardButton.size = new vec3(26, 17, 1)
    const cardItem = cardObject.createComponent(FlexItem.getTypeName()) as FlexItem
    cardItem.overrideWidth = 26
    cardItem.overrideHeight = 17
    const studyFlex = content.getComponent(FlexLayout.getTypeName()) as FlexLayout
    studyFlex.addItems([cardItem])
    const cardLabel = global.scene.createSceneObject("Card Text")
    cardLabel.setParent(cardObject)
    cardLabel.getTransform().setLocalPosition(new vec3(0, 0, 0.08))
    this.questionText = cardLabel.createComponent("Component.Text") as Text
    this.questionText.text = ""
    this.questionText.size = 31
    this.questionText.weight = 500
    this.questionText.depthTest = true
    this.questionText.horizontalAlignment = HorizontalAlignment.Center
    this.questionText.verticalAlignment = VerticalAlignment.Center
    this.questionText.horizontalOverflow = HorizontalOverflow.Wrap
    this.questionText.verticalOverflow = VerticalOverflow.Overflow
    this.questionText.textFill.color = TEXT_WHITE
    this.questionText.layoutRect = Rect.create(-12, 12, -7.5, 7.5)
    this.currentCardButton.onTriggerUp.add(() => this.onFlip.invoke())
    this.answerText = this.addText(content, "Answer Text", "", 2.2, 23, GREEN)
    this.whyText = this.addText(content, "Why Text", "", 2.0, 19, TEXT_WHITE)
    const actions = global.scene.createSceneObject("Study Actions")
    actions.setParent(content)
    const actionFlex = actions.createComponent(FlexLayout.getTypeName()) as FlexLayout
    actionFlex.autoDiscoverItemsOnStart = false
    actionFlex.width = 27.6; actionFlex.height = 3.2; actionFlex.direction = FlexDirection.Row
    actionFlex.alignItems = FlexAlign.Center; actionFlex.justifyContent = FlexJustify.SpaceBetween
    this.prevButton = this.addButton(actions, "Prev", "Prev", 8.5, 2.8, () => this.onPrev.invoke())
    this.gotButton = this.addButton(actions, "Got it", "Got it", 12, 3.0, () => this.onGotIt.invoke())
    this.missedButton = this.addButton(actions, "Missed it", "Missed it", 12, 3.0, () => this.onMissed.invoke())
  }

  private buildResult(panel: SceneObject): void {
    const content = this.makeColumn(panel, 22)
    this.addText(content, "Result Title", "Revision complete", 3.2, 40)
    this.resultText = this.addText(content, "Result Details", "You got 0 / 5", 4.4, 28)
    const row = global.scene.createSceneObject("Result Actions")
    row.setParent(content)
    const rowFlex = row.createComponent(FlexLayout.getTypeName()) as FlexLayout
    rowFlex.autoDiscoverItemsOnStart = false
    rowFlex.width = 27.6; rowFlex.height = 3.6; rowFlex.direction = FlexDirection.Row
    rowFlex.alignItems = FlexAlign.Center; rowFlex.justifyContent = FlexJustify.SpaceBetween
    this.retryButton = this.addButton(row, "Retry missed only", "Retry missed only", 15.5, 3.2, () => this.onRetry.invoke())
    this.restartButton = this.addButton(row, "Restart all 5", "Restart all 5", 12, 3.2, () => this.onRestart.invoke())
  }

  private buildTrace(panel: SceneObject): void {
    const content = this.makeColumn(panel, 14, 18)
    this.addText(content, "Live Execution Title", "Execution Trace & Variable State Box", 2.0, 18, YELLOW, 16)
    this.memoryText = this.addText(content, "Variable State Box", "", 2.4, 17, GREEN, 16)
    this.traceText = this.addText(content, "Execution Trace", "", 6.5, 15, TEXT_WHITE, 16)
    this.traceText.horizontalAlignment = HorizontalAlignment.Left
    this.traceText.horizontalOverflow = HorizontalOverflow.Wrap
    this.traceText.layoutRect = Rect.create(-8, 8, -3.25, 3.25)
  }
}
