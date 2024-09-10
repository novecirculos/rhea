import ky from 'ky'

const { QUAVE_API_KEY } = process.env

const api = ky.create({
  prefixUrl: 'https://ai.quave.dev/v1',
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('x-api-key', QUAVE_API_KEY)
      },
    ],
  },
})

const messages = async ({ threadId }: { threadId: string }) => {
  const res = await api.get(`thread/${threadId}`).json()

  console.log(res)

  return res
}

const thread = async ({
  content,
  creator,
  threadId,
}: {
  content: string
  creator: string
  threadId?: string
}) => {
  const res: {
    text: string
    threadId: string
    meta: {
      tips: string[]
      infos: string[]
    }
  } = await api
    .post('thread', {
      json: { content, creator, threadId },
    })
    .json()

  return {
    response: res.text,
    threadId: res.threadId,
  }
}

export { thread, messages }
