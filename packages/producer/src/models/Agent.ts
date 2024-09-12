import { ObjectId } from 'mongodb'
import {
  Action,
  Decision,
  DecisionSchema,
  Interaction,
  InteractionSchema,
  Resource,
  ResourceSchema,
} from './types'
import { thread } from '@novecirculos/ai'

export class Agent {
  id: ObjectId
  type: string
  state: Resource
  threadId: string | undefined

  constructor(type: string, initialState: Partial<Resource>) {
    this.id = new ObjectId()
    this.type = type
    this.state = ResourceSchema.parse(initialState)
  }

  async initialize() {
    const { threadId, response } = await thread({
      content: `You are a ${
        this.type
      } in a medieval economy simulation. Your initial state is: ${JSON.stringify(
        this.state
      )}. Acknowledge your role.`,
      creator: 'System',
    })
    this.threadId = threadId
    console.log(`Agent initialized: ${response}`)
  }

  async makeDecision(context: string): Promise<Decision> {
    if (!this.threadId) {
      throw new Error('Agent not initialized')
    }
    const { response } = await thread({
      threadId: this.threadId,
      content: `Do not ever respond outside of the given values. Given the current context: ${context}, what decision do you make? Respond in JSON format with 'action' and 'reasoning' keys. The action must be one of: ${Object.values(
        Action
      ).join(', ')}.`,
      creator: 'User',
    })
    return DecisionSchema.parse(this.safeParseJSON(response))
  }

  async interact(otherAgent: Agent, context: string): Promise<Interaction> {
    if (!this.threadId) {
      throw new Error('Agent not initialized')
    }
    const { response } = await thread({
      threadId: this.threadId,
      content: `You are interacting with a ${
        otherAgent.type
      }. Your current state is ${JSON.stringify(
        this.state
      )}. Their state is ${JSON.stringify(
        otherAgent.state
      )}. Given the context: ${context}, how do you interact? Respond in JSON format with 'action', 'message', 'offer', and 'request' keys. The action must be one of: ${Object.values(
        Action
      ).join(
        ', '
      )}. 'offer' and 'request' should be objects with resource names and amounts.`,
      creator: 'User',
    })
    return InteractionSchema.parse(this.safeParseJSON(response))
  }

  async updateState(newState: Partial<Resource>) {
    this.state = ResourceSchema.parse({ ...this.state, ...newState })
    if (!this.threadId) {
      throw new Error('Agent not initialized')
    }
    await thread({
      threadId: this.threadId,
      content: `Your state has been updated to: ${JSON.stringify(
        this.state
      )}. Acknowledge this update.`,
      creator: 'System',
    })
  }

  async trade(offer: Partial<Resource>, request: Partial<Resource>) {
    for (const [resource, amount] of Object.entries(offer)) {
      if (this.state[resource] >= amount) {
        this.state[resource] -= amount
      } else {
        throw new Error(`Insufficient ${resource} for trade`)
      }
    }
    for (const [resource, amount] of Object.entries(request)) {
      this.state[resource] = (this.state[resource] || 0) + amount
    }
    await this.updateState(this.state)
  }

  private safeParseJSON(jsonString: string): any {
    try {
      const match = jsonString.match(/\{[\s\S]*\}/)
      const jsonObject = match ? match[0] : jsonString
      return JSON.parse(jsonObject)
    } catch (error) {
      console.warn(`Failed to parse JSON: ${jsonString}`)
      console.warn(`Error: ${error}`)
      throw new Error('Failed to parse AI response')
    }
  }
}
