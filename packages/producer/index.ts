import { MedievalEconomySimulation } from './src/simulation/MedievalEconomySimulation'

async function runSimulation() {
  const simulation = new MedievalEconomySimulation(
    'mongodb://localhost:27017',
    'medieval_economy'
  )

  try {
    await simulation.initialize()
    await simulation.runSimulation(5)
  } catch (error) {
    console.error('Simulation error:', error)
  } finally {
    await simulation.close()
  }
}

runSimulation()
