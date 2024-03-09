import { Client, query as q, parseJSON } from 'faunadb'
import { FaunaScene, Scene } from './scene-actions.types'
import { FaunaRef } from '@/lib/types'

const faunaClient = new Client({ secret: process.env.FAUNADB_SECRET as string })

export async function createScene(
  scene: Scene,
): Promise<FaunaScene & { id: string }> {
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

    const scenes = sceneData.map((sceneDoc) => {
      const parsedRef = parseJSON(JSON.stringify(sceneDoc.ref))

      return { ...sceneDoc.data, id: parsedRef.id }
    })

    return scenes
  } catch (error) {
    console.error('Error fetching all scenes:', error)
    return []
  }
}

export async function getScene(id: number): Promise<Scene | null> {
  try {
    const ref = q.Ref(q.Collection('scenes'), id)

    const sceneDoc: FaunaScene = await faunaClient.query<FaunaScene>(q.Get(ref))

    const parsedRef = parseJSON(JSON.stringify(sceneDoc.ref))

    return { ...sceneDoc.data, id: parsedRef.id }
  } catch (error) {
    console.error('Error fetching the scene:', error)
    return null
  }
}
