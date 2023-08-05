import { Configuration, OpenAIApi } from 'openai-edge'
import {
  ChatCompletionFunctions,
  ChatCompletionRequestMessage,
} from 'openai-edge/types/api'
import { NextResponse } from 'next/server'
import { auth } from '@/auth'

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

const functions: ChatCompletionFunctions[] = [
  {
    name: 'describe_scene',
    description: 'Generate a vivid description based on the scene input',
    parameters: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Title of the scene',
        },
        characters: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'List of characters present in the scene',
        },
        location: {
          type: 'string',
          description: 'Location where the scene takes place',
        },
        objects: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Multiple major objects present in the scene',
        },
        categories: {
          type: 'array',
          items: {
            type: 'string',
          },
          description: 'Multiple categories of the scene',
        },
        events: {
          type: 'array',
          items: {
            event: {
              type: 'object',
              title: 'Title of the event',
              description: 'Description of the event',
            },
          },
          description: 'Multiple events associated with the scene',
        },
      },
      required: [
        'title',
        'characters',
        'location',
        'categories',
        'objects',
        'events',
      ],
    },
  },
]

export async function POST(req: Request) {
  const { content } = await req.json()

  // const userId = (await auth())?.user.id

  // if (!userId) {
  //   return new Response('Unauthorized', {
  //     status: 401,
  //   })
  // }

  const messages: ChatCompletionRequestMessage[] = [
    {
      role: 'user',
      content,
    },
  ]
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4-0613',
      messages: messages,
      functions,
      temperature: 0.1,
    })

    const result = await response.json()

    const sceneProperties = JSON.parse(
      result.choices[0].message.function_call.arguments,
    )

    const scene = {
      ...sceneProperties,
      content,
    }

    // await Scene.create(scene)

    return NextResponse.json({
      scene,
    })
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      {
        error: 'There was an error while trying to format the data',
      },
      {
        status: 400,
      },
    )
  }
}
