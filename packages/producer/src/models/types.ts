import { z } from 'zod'

export enum Action {
  Work = 'work',
  Trade = 'trade',
  Invest = 'invest',
  Rest = 'rest',
  Produce = 'produce',
  Consume = 'consume',
}

export const ActionSchema = z.nativeEnum(Action)

export const ResourceSchema = z
  .object({
    gold: z.number().nonnegative().optional(),
    food: z.number().nonnegative().optional(),
    goods: z.number().nonnegative().optional(),
    land: z.number().nonnegative().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one resource must be defined',
  })

export const DecisionSchema = z.object({
  action: ActionSchema,
  reasoning: z.string(),
})

export const InteractionSchema = z.object({
  action: ActionSchema,
  message: z.string(),
  offer: ResourceSchema.optional(),
  request: ResourceSchema.optional(),
})

export type Resource = z.infer<typeof ResourceSchema>
export type Decision = z.infer<typeof DecisionSchema>
export type Interaction = z.infer<typeof InteractionSchema>

export type AgentState = {
  gold?: number
  food?: number
  goods?: number
  land?: number
}

export type AgentSummary = {
  type: string
  initialState: AgentState
  finalState: AgentState
  netWorthChange: number
  mostFrequentAction: string
}

export type SimulationSummary = {
  rounds: number
  agentSummaries: AgentSummary[]
  totalInteractions: number
  mostCommonAction: string
  economyGrowth: number
}
