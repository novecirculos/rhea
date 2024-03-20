import os
from fastapi import FastAPI
from app.api.graphql_client import HygraphGraphQLClient
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()
# commit to main test
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
