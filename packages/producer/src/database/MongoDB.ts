import { MongoClient, Db, Collection, ObjectId } from 'mongodb'
import { Agent } from '../models/Agent'
import { AgentState, Interaction } from '../models/types'

export class MongoDB {
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
          threadId: agent.threadId,
          currentState: agent.state,
        },
        // @ts-ignore
        $push: {
          stateHistory: {
            $each: [
              {
                state: agent.state,
                timestamp: new Date(),
              },
            ],
          },
        },
        $currentDate: { lastModified: true },
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

  async getAgentInitialState(agentId: ObjectId): Promise<AgentState> {
    const result = await this.agents.findOne(
      { _id: agentId },
      { projection: { stateHistory: { $slice: [0, 1] } } }
    )
    return result?.stateHistory[0]?.state || {}
  }

  async getAgentFinalState(agentId: ObjectId): Promise<AgentState> {
    const result = await this.agents.findOne(
      { _id: agentId },
      { projection: { currentState: 1 } }
    )
    return result?.currentState || {}
  }

  async getAgentActionCounts(
    agentId: ObjectId
  ): Promise<Record<string, number>> {
    const result = await this.interactions
      .aggregate([
        { $match: { agentId: agentId } },
        { $group: { _id: '$interaction.action', count: { $sum: 1 } } },
        { $project: { _id: 0, action: '$_id', count: 1 } },
      ])
      .toArray()

    if (result.length === 0) {
      return {}
    }

    return result.reduce(
      (acc, { action, count }) => ({ ...acc, [action]: count }),
      {}
    )
  }

  async getTotalInteractions() {
    return this.interactions.countDocuments()
  }

  async getAllActionCounts(): Promise<Record<string, number>> {
    const result = await this.interactions
      .aggregate([
        { $group: { _id: '$interaction.action', count: { $sum: 1 } } },
        { $project: { _id: 0, action: '$_id', count: 1 } },
      ])
      .toArray()

    if (result.length === 0) {
      return {}
    }

    return result.reduce(
      (acc, { action, count }) => ({ ...acc, [action]: count }),
      {}
    )
  }

  async close() {
    await this.client.close()
    console.log('Disconnected from MongoDB')
  }
}
