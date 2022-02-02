document.addEventListener('DOMContentLoaded', () => {

    // Saves last channel for automated redirection
    localStorage.setItem("last_url", window.location.href)

    // Connect to websocket
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

    // When connected, configure buttons
    socket.on('connect', () => {
        document.getElementById("text_message").value = "";

        // Each button should emit a "submit vote" event
        button3.addEventListener("click", () => {
            var message = document.getElementById("text_message").value;
            var channel = document.getElementById("button3").value;
            var user = localStorage.getItem("user");

            // creates current date
            var d = new Date();
            var hour = d.getHours();
            var min = d.getMinutes();
            if (min < 10)
            {
                min = `0${min}`;
            };
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var date = `${day}/${month}/${year}_${hour}:${min}`
            document.getElementById("text_message").value = "";
            socket.emit("submit message", {"date": date, "user": user, "message": message, "channel": channel});
        });
    });
});

// connects to websocket
var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

// broadcasts a message with delete option for the user who wrote it
socket.on("messages data", message_info => {

    // Delete function triggers another socket.emit to take message out of channel dictionary
    function Del() {
        if (this.name === localStorage.getItem("user"))
        {
            socket.emit("deletion", {"message_data": message_info, "element": this});
        };
    };

    // Creates a div containing the new message
    var div = document.createElement('div');
    var message_string = `${message_info[0]} ${message_info[1]}: ${message_info[2]}`;
    div.innerHTML = message_string;
    div.id = `${message_info[0]}${message_info[1]}${message_info[2]}`;
    div.onclick = Del;
    div.name = `${message_info[1]}`;
    div.title = "Delete message.";
    document.querySelector('#chat').append(div);
});
