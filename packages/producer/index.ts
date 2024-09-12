import { thread } from '@novecirculos/ai'
import { MongoClient, Db, Collection, ObjectId } from 'mongodb'
import { z } from 'zod'

enum Action {
  Work = 'work',
  Trade = 'trade',
  Invest = 'invest',
  Rest = 'rest',
  Produce = 'produce',
  Consume = 'consume',
}

const ActionSchema = z.nativeEnum(Action)

const ResourceSchema = z
  .object({
    gold: z.number().nonnegative().optional(),
    food: z.number().nonnegative().optional(),
    goods: z.number().nonnegative().optional(),
    land: z.number().nonnegative().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one resource must be defined',
  })

const DecisionSchema = z.object({
  action: ActionSchema,
  reasoning: z.string(),
})

const InteractionSchema = z.object({
  action: ActionSchema,
  message: z.string(),
  offer: ResourceSchema.optional(),
  request: ResourceSchema.optional(),
})

type Resource = z.infer<typeof ResourceSchema>
type Decision = z.infer<typeof DecisionSchema>
type Interaction = z.infer<typeof InteractionSchema>

class MongoDB {
  private client: MongoClient
  private db: Db
  agents: Collection
  interactions: Collection

  constructor(uri: string, dbName: string) {
    this.client = new MongoClient(uri)
    this.db = this.client.db(dbName)
    this.agents = this.db.collection('agents')
    this.interactions = this.db.collection('interactions')
  }

  async connect() {
    await this.client.connect()
    console.log('Connected to MongoDB')
  }

  async saveAgent(agent: Agent) {
    await this.agents.updateOne(
      { _id: agent.id },
      {
        $set: {
          type: agent.type,
          state: agent.state,
          threadId: agent.threadId,
        },
      },
      { upsert: true }
    )
  }

  async saveInteraction(
    agentId: ObjectId,
    otherAgentId: ObjectId,
    interaction: Interaction
  ) {
    await this.interactions.insertOne({
      agentId,
      otherAgentId,
      interaction,
      timestamp: new Date(),
    })
  }

  async close() {
    await this.client.close()
    console.log('Disconnected from MongoDB')
  }
}

class Agent {
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

class MedievalEconomySimulation {
  agents: Agent[]
  mongodb: MongoDB

  constructor(mongoUri: string, dbName: string) {
    this.agents = []
    this.mongodb = new MongoDB(mongoUri, dbName)
  }

  async initialize() {
    await this.mongodb.connect()

    const peasant = new Agent('Peasant', { gold: 10, food: 50 })
    const merchant = new Agent('Merchant', { gold: 100, goods: 50 })
    const noble = new Agent('Noble', { gold: 500, land: 1000 })

    this.agents = [peasant, merchant, noble]

    for (const agent of this.agents) {
      await agent.initialize()
      await this.mongodb.saveAgent(agent)
    }
  }

  async runSimulation(rounds: number) {
    for (let i = 0; i < rounds; i++) {
      console.log(`Round ${i + 1}`)

      for (const agent of this.agents) {
        const context = `It's round ${
          i + 1
        } of the simulation. The current state of the economy is stable.`
        const decision = await agent.makeDecision(context)
        console.log(`${agent.type} decided:`, JSON.stringify(decision, null, 2))

        // Handle the decision based on the action
        switch (decision.action) {
          case Action.Work:
            await this.handleWork(agent)
            break
          case Action.Trade:
            await this.handleTrade(agent, context)
            break
          case Action.Invest:
            await this.handleInvest(agent)
            break
          case Action.Rest:
            await this.handleRest(agent)
            break
          case Action.Produce:
            await this.handleProduce(agent)
            break
          case Action.Consume:
            await this.handleConsume(agent)
            break
        }

        await this.mongodb.saveAgent(agent)
      }
    }
  }

  private async handleWork(agent: Agent) {
    const workGain = Math.floor(Math.random() * 10) + 1 // Random gain between 1 and 10
    await agent.updateState({ gold: (agent.state.gold || 0) + workGain })
    console.log(`${agent.type} worked and earned ${workGain} gold.`)
  }

  private async handleTrade(agent: Agent, context: string) {
    const otherAgent = this.agents.find((a) => a !== agent)
    if (otherAgent) {
      const interaction = await agent.interact(otherAgent, context)
      console.log(
        `${agent.type} interacted with ${otherAgent.type}:`,
        JSON.stringify(interaction, null, 2)
      )

      if (
        Object.keys(interaction.offer).length > 0 ||
        Object.keys(interaction.request).length > 0
      ) {
        try {
          await agent.trade(interaction.offer, interaction.request)
          await otherAgent.trade(interaction.request, interaction.offer)
          console.log(
            `Trade successful between ${agent.type} and ${otherAgent.type}`
          )
        } catch (error) {
          console.error(`Trade failed: ${error.message}`)
        }
      }

      await this.mongodb.saveInteraction(agent.id, otherAgent.id, interaction)
    } else {
      console.log(`${agent.type} couldn't find a trading partner.`)
    }
  }

  private async handleInvest(agent: Agent) {
    const investmentAmount = Math.min(agent.state.gold || 0, 50)
    const returnRate = 1 + Math.random() * 0.5 // Random return rate between 1 and 1.5
    const returnAmount = Math.floor(investmentAmount * returnRate)

    await agent.updateState({
      gold: (agent.state.gold || 0) - investmentAmount + returnAmount,
    })
    console.log(
      `${agent.type} invested ${investmentAmount} gold and received ${returnAmount} in return.`
    )
  }

  private async handleRest(agent: Agent) {
    // Resting might increase productivity for the next round
    console.log(`${agent.type} rested and is ready for the next round.`)
  }

  private async handleProduce(agent: Agent) {
    let production = {}
    switch (agent.type) {
      case 'Peasant':
        production = { food: Math.floor(Math.random() * 10) + 5 }
        break
      case 'Merchant':
        production = { goods: Math.floor(Math.random() * 5) + 3 }
        break
      case 'Noble':
        production = { gold: Math.floor(Math.random() * 20) + 10 }
        break
    }
    await agent.updateState(production)
    console.log(`${agent.type} produced:`, JSON.stringify(production))
  }

  private async handleConsume(agent: Agent) {
    const foodConsumed = Math.min(agent.state.food || 0, 5)
    await agent.updateState({ food: (agent.state.food || 0) - foodConsumed })
    console.log(`${agent.type} consumed ${foodConsumed} food.`)
  }

  async close() {
    await this.mongodb.close()
  }
}

async function runSimulation() {
  const simulation = new MedievalEconomySimulation(
    'mongodb://localhost:27017',
    'medieval_economy'
  )

  try {
    await simulation.initialize()
    await simulation.runSimulation(10) // Run for 10 rounds
  } catch (error) {
    console.error('Simulation error:', error)
  } finally {
    await simulation.close()
  }
}

runSimulation()
