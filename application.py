import os

from flask import Flask, redirect, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channel_dict = {}

@app.route("/")
def index():
    """Renders channels.html when user enters site, carries all the keys to each available channel"""

    return render_template("channels.html", keys=list(channel_dict.keys()))


@app.route("/channel/<channel_name>", methods=["GET"])
def view_channel(channel_name):
    """Goes to the template belonging to variable channel loads all its keys and messages"""

    # if channel_name doesn't exist redirect to index
    if channel_name not in channel_dict.keys():
        return redirect("/")
    return render_template("channel.html", keys=list(channel_dict.keys()), name=channel_name, messages=channel_dict[channel_name])


@app.route("/channels", methods=["GET"])
def create():
    """Redirects to index"""

    return redirect("/index")


@socketio.on("submit channel")
def channelname(data):
    """Creates new channels"""

    name = data["channel"]
    date = data["date"]

    # If channel name already exists or name has no characters redirect to index
    if name in channel_dict.keys() or len(name) == 0:
        return redirect("/")

    # Server welcome message
    channel_dict[name] = [[date, "#Server", f"Welcome to channel {name}", name]]

    # Broadcasts new channel to all users
    emit("channel dict", name, broadcast=True)


@socketio.on("submit message")
def message(data):
    """Create messages in channel"""

    date = data["date"]
    user = data["user"]
    message = data["message"]
    channel = data["channel"]
    message_info = [date, user, message, channel]

    # Checks if message log is over 100 long if so, deletes first message
    if len(channel_dict[channel]) == 100:
        channel_dict[channel].pop(0)

    # Adds message to dictionary
    channel_dict[channel].append(message_info)

    # Broadcasts new message to all users
    emit("messages data", message_info, broadcast=True)


@socketio.on("deletion")
def delete_message(data):
    """Deletes message"""

    channel_name = data["message_data"][3]
    for i in range(len(channel_dict[channel_name])):

        # Takes deleted message out of the dictionary
        if data["message_data"] == channel_dict[channel_name][i]:
            channel_dict[channel_name].pop(i)

    # Broadcasts deletion to all users
    emit("deleted_message", data, broadcast=True)
