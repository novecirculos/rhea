import { Client, query as q } from 'faunadb'
import { FaunaScene, Scene } from './scene-actions.types'
import { FaunaRef } from '@/lib/types'

const faunaClient = new Client({ secret: process.env.FAUNADB_SECRET as string })

export async function createScene(scene: Scene) {
  return await faunaClient.query(
    q.Create(q.Collection('scenes'), { data: scene }),
  )
}

export async function getScenes(): Promise<Scene[]> {
  try {
    const refs = await faunaClient.query<{ data: FaunaRef[] }>(
      q.Paginate(q.Documents(q.Collection('scenes'))),
    )

    const sceneData: FaunaScene[] = await Promise.all(
      refs.data.map((ref) => faunaClient.query<FaunaScene>(q.Get(ref))),
    )

    return sceneData.map((sceneDoc) => sceneDoc.data)
  } catch (error) {
    console.error('Error fetching all scenes:', error)
    return []
  }
}
