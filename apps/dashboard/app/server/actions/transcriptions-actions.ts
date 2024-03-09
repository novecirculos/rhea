import { Client, query as q, parseJSON } from 'faunadb'
import {
  FaunaTranscription,
  Transcription,
} from './transcriptions-actions.types'
import { FaunaRef } from '@/lib/types'

const faunaClient = new Client({ secret: process.env.FAUNADB_SECRET as string })

export async function createTranscription(transcription: Transcription) {
  return await faunaClient.query(
    q.Create(q.Collection('transcriptions'), { data: transcription }),
  )
}

export async function getTranscriptions(): Promise<Transcription[]> {
  try {
    const refs = await faunaClient.query<{ data: FaunaRef[] }>(
      q.Paginate(q.Documents(q.Collection('transcriptions'))),
    )

    const transcriptionData: FaunaTranscription[] = await Promise.all(
      refs.data.map((ref) => faunaClient.query<FaunaTranscription>(q.Get(ref))),
    )

    const transcriptions = transcriptionData.map((transcriptionDoc) => {
      const parsedRef = parseJSON(JSON.stringify(transcriptionDoc.ref))

      return { ...transcriptionDoc.data, id: parsedRef.id }
    })

    return transcriptions
  } catch (error) {
    console.error('Error fetching all transcriptions:', error)
    return []
  }
}

export async function getTranscription(
  id: number,
): Promise<Transcription | null> {
  try {
    const ref = q.Ref(q.Collection('transcriptions'), id)

    const transcriptionDoc: FaunaTranscription =
      await faunaClient.query<FaunaTranscription>(q.Get(ref))

    const parsedRef = parseJSON(JSON.stringify(transcriptionDoc.ref))

    return { ...transcriptionDoc.data, id: parsedRef.id }
  } catch (error) {
    console.error('Error fetching the transcription:', error)
    return null
  }
}
