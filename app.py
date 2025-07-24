from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

# Change this if your bot.js runs somewhere else or different port
BOT_WS_PORT = 8081

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/command', methods=['POST'])
def send_command():
    data = request.json
    command = data.get('command')
    if not command:
        return jsonify({'error': 'No command provided'}), 400

    # Here you could send commands to your bot via chat or some other interface.
    # For simplicity, we rely on the bot listening to chat commands sent by players.
    # So this API does not directly control the bot, but we simulate success.
    # You would want to connect your Flask app and bot.js with a real command relay in a production environment.

    # In a simple setup, the bot is connected to the same Minecraft server,
    # and the player can send these commands in chat. So your website "pretends" to send commands.
    # In a real setup, you could add a WebSocket or TCP connection to send commands directly to bot.js.

    # For now, just return success
    print(f"Received command to send to bot: {command}")
    return jsonify({'status': 'Command received', 'command': command})

if __name__ == '__main__':
    app.run(debug=True)
