const form = document.getElementById("registerForm");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const fullName = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validation

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    if (phone.length !== 10) {
        alert("Enter a valid 10-digit mobile number.");
        return;
    }

    try {

        const response = await fetch("https://kisaansakthibackend-4.onrender.com/users/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                fullName,
                email,
                phone,
                password
            })

        });

        if (response.ok) {

            alert("Account created successfully!");

            form.reset();

            window.location.href = "login.html";

        } else {

            const message = await response.text();

            alert(message || "Registration Failed");

        }

    } catch (error) {

        console.error(error);

        alert("Unable to connect to the server.");

    }

});