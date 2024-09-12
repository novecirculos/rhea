import { MongoDB } from '../database/MongoDB'
import { Agent } from '../models/Agent'
import { Action } from '../models/types'

export class MedievalEconomySimulation {
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
    const workGain = Math.floor(Math.random() * 10) + 1
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
        interaction.offer &&
        interaction.request &&
        (Object.keys(interaction.offer).length > 0 ||
          Object.keys(interaction.request).length > 0)
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
      } else {
        console.log(`Trade cancelled: No valid offer or request`)
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
