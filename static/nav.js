// Alers user if trying to create a channel without entering a username first
menu.addEventListener("click", () => {
    if (!localStorage.getItem("user"))
    {
        alert("Insert a username first.");
    }
});
