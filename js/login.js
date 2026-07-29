const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {

        const response = await fetch("https://kisaansakthibackend-4.onrender.com/users/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })

        });

        if (response.ok) {

            const user = await response.json();

            if (user == null) {

                alert("Invalid Email or Password");
                return;

            }

            // Save logged-in user
            localStorage.setItem("loggedInUser", JSON.stringify(user));

            alert("Login Successful!");

            window.location.href = "dashboard.html";

        } else {

            alert("Login Failed!");

        }

    } catch (error) {

        console.error(error);

        alert("Server Connection Failed!");

    }

});