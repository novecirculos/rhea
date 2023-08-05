import { Client, query as q } from 'faunadb'
import { Scene } from './scene-actions.types'

const faunaClient = new Client({ secret: process.env.FAUNADB_SECRET as string })

export async function createScene(scene: Scene) {
  return await faunaClient.query(
    q.Create(q.Collection('scenes'), { data: scene }),
  )
}
