from fastapi import FastAPI 
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse

app = FastAPI()
app.mount("/static",StaticFiles(directory="static"), name="static")

@app.get("/")
def read_root():
    with open('templates/project.html','r') as file:
        content = file.read()
    return HTMLResponse(content=content)

# from fastapi import FastAPI
# from fastapi.staticfiles import StaticFiles
# from fastapi.responses import HTMLResponse
# from fastapi import Request
# from fastapi.templating import Jinja2Templates
# from pydantic import BaseModel
# import openai

# app = FastAPI()
# app.mount("/static", StaticFiles(directory="static"), name="static")
# templates = Jinja2Templates(directory="templates")

# # Set your OpenAI API key
# openai.api_key = "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"

# class ChatInput(BaseModel):
#     input: str

# class CreateBot:

#     def __init__(self, system_prompt):
#         self.system = system_prompt
#         self.messages = [{"role": "system", "content": system_prompt}]


#     def chat(self):
#         '''
#         Tracks dialogue history and takes in user input
#         '''
#         # print('Enter "Take my medication status" to give details of medications')
#         # print()
#         print("Hello dear patient. I'm your Online Consultant Dr.John.")
#         print()
#         question = ''
#         while question != 'END':
#             # Get User Question
#             question = input("")

#             # Add to messages/dialogue history
#             self.messages.append({'role': 'user', 'content': question})

#             # Send to ChatGPT and get response
#             response = openai.ChatCompletion.create(
#                 model="gpt-3.5-turbo",
#                 messages=self.messages
#             )

#             # Get content of assistant reply
#             content = response['choices'][0]['message']['content']
#             print('\n')
#             print(content)
#             print('\n')
            
#             # Add assistant reply for dialogue history
#             self.messages.append({'role': 'assistant', 'content': content})


# @app.get("/", response_class=HTMLResponse)
# def read_root(request: Request):
#     return templates.TemplateResponse("project.html", {"request": request})

# @app.post("/chatbot")
# def chat_with_bot(chat_input: ChatInput):
#     input_text = chat_input.input.strip()
#     doctor = CreateBot(system_prompt=input_text)
#     response = doctor.chat()
#     return {"response": response}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)

    