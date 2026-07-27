// =====================================
// KISAN SAKTHI - PROFILE PAGE
// =====================================

const user = JSON.parse(localStorage.getItem("loggedInUser"));

// If user is not logged in
if (!user) {

    alert("Please login first.");

    window.location.href = "login.html";

}

// ===============================
// DISPLAY USER DETAILS
// ===============================

document.getElementById("profileName").innerText = user.fullName;

document.getElementById("name").innerText = user.fullName;

document.getElementById("email").innerText = user.email;

document.getElementById("mobile").innerText = user.phone;

document.getElementById("district").innerText = user.district;


// ===============================
// EDIT PROFILE
// ===============================

function editProfile() {

    alert("Edit Profile feature coming soon.");

    // Later:
    // window.location.href = "edit-profile.html";

}


// ===============================
// LOGOUT
// ===============================

function logout() {

    if (confirm("Are you sure you want to logout?")) {

        localStorage.removeItem("loggedInUser");

        window.location.href = "login.html";

    }

}