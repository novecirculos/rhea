import os
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware 

from app.api.graphql_client import HygraphGraphQLClient
from dotenv import load_dotenv
from pydub import AudioSegment
from openai import OpenAI
from faunadb import query as q
from faunadb.client import FaunaClient

load_dotenv()

app = FastAPI()

allowed_origins = [
    "http://localhost:3000",  
    "https://dashboard.novecirculos.com.br",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


openaikey = os.getenv('OPENAI_API_KEY')
faunakey = os.getenv('FAUNADB_SECRET')

openai_client = OpenAI(api_key=openaikey)
fauna_client = FaunaClient(secret=faunakey)

if os.getenv("HYGRAPH_URL") is None:
    raise ValueError("HYGRAPH_URL environment variable is not set.")

hygraph_client = HygraphGraphQLClient(
    url=os.getenv("HYGRAPH_URL"),
    headers={
        "Authorization": f"Bearer {os.getenv('HYGRAPH_TOKEN')}",
    },
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/update_todo")
async def update_todo(id: str, description: str, completed: bool):
    mutation = """
    mutation UpdateTodo($id: ID!, $description: String!, $completed: Boolean!) {
      updateTodo(
        data: {
          description: $description,
          completed: $completed
        },
        where: {
          id: $id
        }) {
        id
        description
        completed
      }
    }
    """
    variables = {
        "id": id,
        "description": description,
        "completed": completed,
    }
    result = hygraph_client.run_mutation(mutation, variables)
    return result


@app.post("/transcriptions")
async def transcribe_audio(file: UploadFile = File(...)):
    # Convert the uploaded file to an audio segment
    audio = AudioSegment.from_file(file.file, format=file.filename.split('.')[-1])

    segment_length = 25 * 60  # 25 minutes
    duration = len(audio) / 1000  # Duration in seconds
    segment_filename = os.path.splitext(file.filename)[0]
    number_of_segments = int(duration / segment_length)
    segment_start = 0
    segment_end = segment_length * 1000
    enumerate = 1
    prompt = ""
    full_transcript = ""

    for i in range(number_of_segments):
        sound_export = audio[segment_start:segment_end]
        exported_file = '/tmp/' + segment_filename + '-' + str(enumerate) + '.mp3'
        sound_export.export(exported_file, format="mp3")

        with open(exported_file, "rb") as f:
            data = openai_client.audio.transcriptions.create(file=f, model="whisper-1", prompt=prompt, language='pt')

        prompt += data.text
        full_transcript += data.text
        segment_start += segment_length * 1000
        segment_end += segment_length * 1000
        enumerate += 1

    # Save the full transcription to FaunaDB
    name_parts = segment_filename.split('-')
    name = '-'.join(name_parts[1:]) if len(name_parts) > 1 else 'unknown'
    fauna_client.query(
        q.create(
            q.collection('transcriptions'),
            {"data": {"filename": segment_filename, "text": full_transcript, "player": name}}
        )
    )

    # Return the full transcription in the response
    return JSONResponse(content={"transcription": full_transcript})
