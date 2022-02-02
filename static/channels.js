document.addEventListener('DOMContentLoaded', () => {

        // Connect to websocket
        var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

        // When connected, configure buttons
        socket.on('connect', () => {
            document.getElementById("channelname").value = "";

            // Each button should emit a "submit vote" event
            button.addEventListener("click", () => {

                // user must insert a username before making a channel or typing a message
                if (!localStorage.getItem("user"))
                {
                    alert("Insert a username first.");
                    event.preventDefault();
                }
                else
                {

                    // Creates variables to write welcome from server message
                    var name = document.getElementById("channelname").value;
                    document.getElementById("channelname").value = "";
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
                    socket.emit("submit channel", {"channel":name, "date": date});
                }
            });
        });

        // Adds new channel to dictionary
        socket.on("channel dict", name => {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = `/channel/${name}`;
            a.innerHTML = name;
            li.append(a);
            document.querySelector('#channels').append(li);
        });
    });
