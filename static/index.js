document.addEventListener('DOMContentLoaded', () => {

    // If user has not entered a username before it will render a form in which the user can type one
    if (!localStorage.getItem("user"))
    {
        document.getElementById("form").style.display = "block";
        var div = document.createElement("div")

        var br = document.createElement('br')

        var input = document.createElement("input")
        input.type = "text"
        input.name = "display_name"
        input.id = "display_name"
        input.placeholder = "Enter Username"

        var button = document.createElement("button");
        button.innerHTML = "Submit"
        button.id = "button2"

        div.append(input)
        div.append(br)
        div.append(button)

        document.querySelector("#form").append(div)
    }
    else
    {
        document.getElementById("form").style.display = "none";
    }

    // Saves last url so user get put back into the same channel when visiting again
    if (localStorage.getItem("last_url"))
    {
        window.location.href = localStorage.getItem("last_url");
    };

});
document.addEventListener('DOMContentLoaded', () => {

    // if form submit button is clicked name get saved in localstorage
    button2.addEventListener("click", () => {
        var username = document.getElementById("display_name").value;

        // user is not allowed a # in the name as it is reserved for the server
        var contain = username.search("#")
        if (username === "" || contain != -1)
        {
            event.preventDefault()
        }
        else
        {
            localStorage.setItem("user", username);
            document.getElementById("form").style.display = "none";
        }
    });
});
