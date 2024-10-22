import { createEnum } from "./createEnum";

export const AVAILABLE_TOOLS = createEnum({
  ROLL_DICE: {
    value: "rollDice",
    label: "Dice roller",
  },
  WEB_SEARCH: {
    value: "webSearch",
    label: "Web search",
  },
  STEPS_REASONING: {
    value: "stepsReasoning",
    label: "Reasoning by steps",
  },
});
