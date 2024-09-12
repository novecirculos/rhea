import { MongoClient, Db, Collection, ObjectId } from 'mongodb'
import { Agent } from '../models/Agent'
import { Interaction } from '../models/types'

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
