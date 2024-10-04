import { MongoDB } from '../database/MongoDB'
import { Agent } from '../models/Agent'
import { Action, SimulationSummary, EconomyState } from '../models/types'
import init, { roll_dice } from '@novecirculos/dice'

export class MedievalEconomySimulation {
  agents: Agent[]
  mongodb: MongoDB
  economyState: EconomyState

  constructor(mongoUri: string, dbName: string) {
    this.agents = []
    this.mongodb = new MongoDB(mongoUri, dbName)
    this.economyState = EconomyState.Stable
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
      console.log(`Economy State: ${this.economyState}`)

      this.updateEconomyState()

      for (const agent of this.agents) {
        const context = `It's round ${
          i + 1
        } of the simulation. The current state of the economy is ${
          this.economyState
        }.`
        const decision = await agent.makeDecision(context)
        console.log(`${agent.type} decided:`, JSON.stringify(decision, null, 2))

        const success = this.performAction(agent, decision.action)
        if (success) {
          console.log(`${agent.type}'s action was successful.`)
        } else {
          console.log(`${agent.type}'s action failed.`)
        }

        await this.mongodb.saveAgent(agent)
      }
    }

    const summary = await this.generateSummary(rounds)
    console.log('Simulation Summary:')
    console.log(JSON.stringify(summary, null, 2))
  }

  private updateEconomyState() {
    const [stateRoll] = roll_dice({ times: 1, sides: 20 })
    if (stateRoll === 1) {
      this.economyState = EconomyState.Unstable
    } else if (stateRoll === 20) {
      this.economyState = EconomyState.Booming
    } else if (stateRoll >= 15) {
      this.economyState = EconomyState.Stable
    }
  }

  private performAction(agent: Agent, action: Action): boolean {
    const dc = this.getActionDC(action)
    const roll = roll_dice({ times: 1, sides: 20 })[0]
    const success = roll >= dc

    if (success) {
      switch (action) {
        case Action.Work:
          this.handleWork(agent)
          break
        case Action.Trade:
          this.handleTrade(agent)
          break
        case Action.Invest:
          this.handleInvest(agent)
          break
        case Action.Rest:
          this.handleRest(agent)
          break
        case Action.Produce:
          this.handleProduce(agent)
          break
        case Action.Consume:
          this.handleConsume(agent)
          break
      }
      console.log(
        `${agent.type}'s ${action} action was successful. (Roll: ${roll}, DC: ${dc})`
      )
    } else {
      console.log(
        `${agent.type}'s ${action} action failed. (Roll: ${roll}, DC: ${dc})`
      )
    }

    return success
  }

  private getActionDC(action: Action): number {
    const baseDC = {
      [Action.Work]: 10,
      [Action.Trade]: 12,
      [Action.Invest]: 15,
      [Action.Rest]: 5,
      [Action.Produce]: 8,
      [Action.Consume]: 5,
    }[action]

    switch (this.economyState) {
      case EconomyState.Unstable:
        return baseDC + 2
      case EconomyState.Booming:
        return baseDC - 2
      default:
        return baseDC
    }
  }

  private handleWork(agent: Agent) {
    const workGain = roll_dice({ times: 2, sides: 6 })
    const totalGain = workGain.reduce((sum, value) => sum + value, 0)
    const modifier =
      this.economyState === EconomyState.Booming
        ? 1.5
        : this.economyState === EconomyState.Unstable
        ? 0.5
        : 1
    const finalGain = Math.floor(totalGain * modifier)
    agent.updateState({ gold: (agent.state.gold || 0) + finalGain })
    console.log(`${agent.type} worked and earned ${finalGain} gold.`)
  }

  private async handleTrade(agent: Agent) {
    const otherAgent = this.agents.find((a) => a !== agent)
    if (otherAgent) {
      const interaction = await agent.interact(
        otherAgent,
        `The current state of the economy is ${this.economyState}.`
      )
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
