// Connect to websocket
var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

// delete function that will emit to a socket that removes message from dictionary
function Del(element, message_data) {
    if (message_data[1] === localStorage.getItem("user"))
    {
        socket.emit("deletion", {"message_data": message_data, "element": element});
    };
};

// after being removed from channel dictionary it will now be removed by broadcast for everyone
socket.on("deleted_message", data => {
    var message_string = `${data["message_data"][0]}${data["message_data"][1]}${data["message_data"][2]}`;
    var element = document.getElementById(message_string);
    element.remove();
});
