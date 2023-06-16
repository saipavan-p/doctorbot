from flask import Flask, request, jsonify
import openai
import getpass 
import re

openai.api_key = getpass.getpass('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')

class CreateBot:
    def __init__(self, system_prompt):
        '''
        system_prompt: [str] Describes context for Chat Assistant
        '''
        self.system = system_prompt
        self.messages = [{"role": "system", "content": system_prompt}]

    def chat(self):
        '''
        Tracks dialogue history and takes in user input
        '''
        question = ''
        response_list = []

        while question != 'Take My Status':
            # Get User Question
            question = input("")

            # Add to messages/dialogue history
            self.messages.append({'role':'user','content':question})

            # Send to ChatGPT and get response
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=self.messages
            )

            # Get content of assistant reply
            content = response.choices[0].message.content

            # Add assistant reply for dialogue history
            self.messages.append({'role':'assistant','content':content})

            # Append response to the list
            response_list.append(content)

        return response_list

def get_completion(prompt, model="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=0.7,
        max_tokens=100,
    )
    return response.choices[0].message["content"]

def extract_advantages(response):
    # Define patterns for advantages
    patterns = [
        r"(?i)advantages:([\s\S]+?)(?:\\n|$)",
        r"(?i)uses:([\s\S]+?)(?:\\n|$)",
        r"(?i)benefits:([\s\S]+?)(?:\\n|$)",
    ]

    advantages = []

    for pattern in patterns:
        match = re.search(pattern, response)
        if match:
            advantage_text = match.group(1)
            advantage_list = advantage_text.split(",")
            advantages.extend([advantage.strip() for advantage in advantage_list])

    return advantages

app = Flask(__name__)
doctor = CreateBot(system_prompt="""You are Dr.John a doctor interacting with your diabetic patient,first you greet the patient and then ask for their problems,you respond in short and sweet manner """)

@app.route('/bot', methods=['POST'])
def bot_response():
    message = request.json.get('message')  # Get the user's message from the request JSON data

    # Add user message to the bot's dialogue history
    doctor.messages.append({'role': 'user', 'content': message})

    # Send to ChatGPT and get response
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=doctor.messages
    )

    # Get content of assistant reply
    content = response.choices[0].message.content

    # Add assistant reply to the bot's dialogue history
    doctor.messages.append({'role': 'assistant', 'content': content})

    # Return the response as JSON
    return jsonify({'response': content})

if __name__ == '__main__':
    app.run(port=5000)
