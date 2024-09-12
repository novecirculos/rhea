import { MongoDB } from '../database/MongoDB'
import { Agent } from '../models/Agent'
import { Action, SimulationSummary } from '../models/types'
import init, { roll_dice } from '@novecirculos/dice'

export class MedievalEconomySimulation {
  agents: Agent[]
  mongodb: MongoDB

  constructor(mongoUri: string, dbName: string) {
    this.agents = []
    this.mongodb = new MongoDB(mongoUri, dbName)
  }

  async initialize() {
    await init()
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

    const summary = await this.generateSummary(rounds)
    console.log('Simulation Summary:')
    console.log(JSON.stringify(summary, null, 2))
  }

  private async handleWork(agent: Agent) {
    const workGain = await roll_dice({ times: 2, sides: 6 })
    const totalGain = workGain.reduce((sum, value) => sum + value, 0)
    await agent.updateState({ gold: (agent.state.gold || 0) + totalGain })
    console.log(`${agent.type} worked and earned ${totalGain} gold.`)
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
    const returnRoll = await roll_dice({ times: 3, sides: 6 })
    const returnRate =
      1 + returnRoll.reduce((sum, value) => sum + value, 0) / 18
    const returnAmount = Math.floor(investmentAmount * returnRate)

    await agent.updateState({
      gold: (agent.state.gold || 0) - investmentAmount + returnAmount,
    })
    console.log(
      `${agent.type} invested ${investmentAmount} gold and received ${returnAmount} in return.`
    )
  }

  private async handleRest(agent: Agent) {
    const restRoll = await roll_dice({ times: 1, sides: 6 })
    const restBonus = restRoll[0]
    console.log(
      `${agent.type} rested and gained a +${restBonus} bonus for the next round.`
    )
  }

  private async handleProduce(agent: Agent) {
    let production = {}
    switch (agent.type) {
      case 'Peasant':
        const foodRoll = await roll_dice({ times: 2, sides: 6 })
        production = { food: foodRoll.reduce((sum, value) => sum + value, 0) }
        break
      case 'Merchant':
        const goodsRoll = await roll_dice({ times: 1, sides: 6 })
        production = { goods: goodsRoll[0] }
        break
      case 'Noble':
        const goldRoll = await roll_dice({ times: 3, sides: 6 })
        production = { gold: goldRoll.reduce((sum, value) => sum + value, 0) }
        break
    }
    await agent.updateState(production)
    console.log(`${agent.type} produced:`, JSON.stringify(production))
  }

  private async handleConsume(agent: Agent) {
    const consumeRoll = await roll_dice({ times: 1, sides: 4 })
    const foodConsumed = Math.min(agent.state.food || 0, consumeRoll[0])
    await agent.updateState({ food: (agent.state.food || 0) - foodConsumed })
    console.log(`${agent.type} consumed ${foodConsumed} food.`)
  }

  async generateSummary(rounds: number) {
    const summary: SimulationSummary = {
      rounds,
      agentSummaries: [],
      totalInteractions: 0,
      mostCommonAction: '',
      economyGrowth: 0,
    }

    for (const agent of this.agents) {
      const initialState = await this.mongodb.getAgentInitialState(agent.id)
      const finalState = await this.mongodb.getAgentFinalState(agent.id)
      const actionCounts = await this.mongodb.getAgentActionCounts(agent.id)

      const agentSummary = {
        type: agent.type,
        initialState,
        finalState,
        netWorthChange:
          this.calculateNetWorth(finalState) -
          this.calculateNetWorth(initialState),
        mostFrequentAction: this.getMostFrequentAction(actionCounts),
      }

      summary.agentSummaries.push(agentSummary)
    }

    summary.totalInteractions = await this.mongodb.getTotalInteractions()

    const allActionCounts = await this.mongodb.getAllActionCounts()
    summary.mostCommonAction = this.getMostFrequentAction(allActionCounts)

    const initialTotalWealth = summary.agentSummaries.reduce(
      (sum, agent) => sum + this.calculateNetWorth(agent.initialState),
      0
    )
    const finalTotalWealth = summary.agentSummaries.reduce(
      (sum, agent) => sum + this.calculateNetWorth(agent.finalState),
      0
    )
    summary.economyGrowth =
      ((finalTotalWealth - initialTotalWealth) / initialTotalWealth) * 100

    return summary
  }

  private calculateNetWorth(state: any): number {
    return (
      (state.gold || 0) +
      (state.food || 0) * 2 +
      (state.goods || 0) * 3 +
      (state.land || 0) * 5
    )
  }

  private getMostFrequentAction(actionCounts: Record<string, number>): string {
    if (Object.keys(actionCounts).length === 0) {
      return 'No actions recorded'
    }
    return Object.entries(actionCounts).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0]
  }

  async close() {
    await this.mongodb.close()
  }
}
