document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let response = document.getElementById("form-response");

    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
        response.innerText = "Please fill in all fields.";
        response.style.color = "red";
        return;
    }

    response.innerText = "Thank you for reaching out, " + name + "! We'll get back to you soon.";
    response.style.color = "green";

    document.getElementById("contact-form").reset();
});
