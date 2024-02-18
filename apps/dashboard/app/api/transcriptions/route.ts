import { getTranscriptions } from '@/app/server/transcriptions-actions'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const transcriptions = await getTranscriptions()

  return NextResponse.json({
    transcriptions,
  })
}
