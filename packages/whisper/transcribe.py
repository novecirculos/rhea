import os
import sys
from openai import OpenAI
import os.path

from dotenv import load_dotenv
from pydub import AudioSegment

load_dotenv()


key = os.getenv('OPENAI_API_KEY')
faunakey = os.getenv('FAUNADB_SECRET')

from faunadb import query as q
from faunadb.objects import Ref
from faunadb.client import FaunaClient

fauna_client = FaunaClient(secret=faunakey)


client = OpenAI(api_key=key)



audio = AudioSegment.from_mp3(sys.argv[1])

segment_length = 25 * 60
duration = audio.duration_seconds
print('Segment length: %d seconds' % segment_length)
print('Duration: %d seconds' % duration)

segment_filename = os.path.basename(sys.argv[1])
segment_filename = os.path.splitext(segment_filename)[0]
number_of_segments = int(duration / segment_length)
segment_start = 0
segment_end = segment_length * 1000
enumerate = 1
prompt = ""
audio_dir = 'audios/s1e1/'

full_transcript = ""

for i in range(number_of_segments):
    sound_export = audio[segment_start:segment_end]

    exported_file = '/tmp/' + segment_filename + '-' + str(enumerate) + '.mp3'
    sound_export.export(exported_file, format="mp3")
    print('Exported segment %d of %d' % (enumerate, number_of_segments))

    f = open(exported_file, "rb")
    data = client.audio.transcriptions.create(file=f, model="whisper-1", prompt=prompt)
    f.close()

    # Save the transcription text to a file
    transcript_file_path = os.path.join('transcripts', segment_filename + '.txt')
    with open(transcript_file_path, "a") as f:
        f.write(data.text)

    prompt += data.text
    full_transcript += data.text
    segment_start += segment_length * 1000
    segment_end += segment_length * 1000
    enumerate += 1

result = fauna_client.query(
    q.create(
        q.collection('transcriptions'),
        {"data": {"filename": segment_filename, "text": full_transcript}}
    )
)
print('Saved full transcription to FaunaDB with ref:', result['ref'])