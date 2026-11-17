import {scenariosIndex} from "Leaf.lspkg/Scenarios/decorator/ScenarioIndexDecorator"
import {ScenarioMetadata} from "Leaf.lspkg/Scenarios/scenario/ScenarioMetadata"
import {ReviseLensCriterion1} from "./ReviseLensCriterion1"
import {ReviseLensCriterion2} from "./ReviseLensCriterion2"
import {ReviseLensCriterion3} from "./ReviseLensCriterion3"
import {ReviseLensCriterion4} from "./ReviseLensCriterion4"
import {ReviseLensCriterion5} from "./ReviseLensCriterion5"
import {ReviseLensCriterion6} from "./ReviseLensCriterion6"
import {ReviseLensCriterion7} from "./ReviseLensCriterion7"
import {ReviseLensCriterion8} from "./ReviseLensCriterion8"

@component
export class LeafIndex extends BaseScriptComponent {
  @scenariosIndex
  static scenariosIndex: ScenarioMetadata[] = [
    {id: "reviselens-criterion-1-start", typename: ReviseLensCriterion1.getTypeName()},
    {id: "reviselens-criterion-2-flip-score", typename: ReviseLensCriterion2.getTypeName()},
    {id: "reviselens-criterion-3-missed", typename: ReviseLensCriterion3.getTypeName()},
    {id: "reviselens-criterion-4-result", typename: ReviseLensCriterion4.getTypeName()},
    {id: "reviselens-criterion-5-retry-restart", typename: ReviseLensCriterion5.getTypeName()},
    {id: "reviselens-criterion-6-text-placement", typename: ReviseLensCriterion6.getTypeName()},
    {id: "reviselens-criterion-7-live-execution-score-format", typename: ReviseLensCriterion7.getTypeName()},
    {id: "reviselens-criterion-8-score-lock-prev", typename: ReviseLensCriterion8.getTypeName()},
  ]
}
