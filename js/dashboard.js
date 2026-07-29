// =============================================
// KISAN SAKTHI DASHBOARD
// =============================================

const BASE_URL = "https://kisaansakthibackend-4.onrender.com";

// =============================================
// PAGE LOAD
// =============================================

window.onload = () => {

    loadUser();

    loadWeather();

    loadMarketPrice();

    setupSearch();

    setupLogout();

};

// =============================================
// LOAD USER
// =============================================

function loadUser() {

    const user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    document.getElementById("userName").innerText = user.fullName;

}

// =============================================
// LOAD WEATHER
// =============================================

async function loadWeather() {

    try {

        const response = await fetch(`${BASE_URL}/weather`);

        if (!response.ok) {

            throw new Error();

        }

        const weather = await response.json();

        if (weather.length > 0) {

            document.getElementById("weatherCity").innerHTML =
                "📍 " + weather[0].city;

            document.getElementById("weatherTemp").innerHTML =
                weather[0].temperature + "°C";

        }

    }

    catch (error) {

        document.getElementById("weatherCity").innerHTML =
            "Weather Unavailable";

        document.getElementById("weatherTemp").innerHTML =
            "--";

    }

}

// =============================================
// LOAD MARKET PRICE
// =============================================

async function loadMarketPrice() {

    try {

        const response = await fetch(`${BASE_URL}/market-prices`);

        if (!response.ok) {

            throw new Error();

        }

        const market = await response.json();

        if (market.length > 0) {

            document.getElementById("marketCrop").innerHTML =
                market[0].cropName;

            document.getElementById("marketPrice").innerHTML =
                "₹ " + market[0].pricePerQuintal;

        }

    }

    catch (error) {

        document.getElementById("marketCrop").innerHTML =
            "No Data";

        document.getElementById("marketPrice").innerHTML =
            "--";

    }

}

// =============================================
// SEARCH
// =============================================

function setupSearch() {

    const input = document.getElementById("searchInput");

    const cards = document.querySelectorAll(".service-card, .summary-card");

    input.addEventListener("keyup", () => {

        const value = input.value.toLowerCase();

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            if (text.includes(value)) {

                card.style.display = "";

            }

            else {

                card.style.display = "none";

            }

        });

    });

}

// =============================================
// LOGOUT
// =============================================

function setupLogout() {

    document.getElementById("logoutBtn").addEventListener("click", () => {

        if (confirm("Are you sure you want to logout?")) {

            localStorage.removeItem("loggedInUser");

            window.location.href = "login.html";

        }

    });

}

// =============================================
// PROFILE
// =============================================

function goToProfile() {

    window.location.href = "profile.html";

}

// =============================================
// NOTIFICATIONS
// =============================================

function goToNotifications() {

    window.location.href = "notifications.html";

}

// =============================================
// BOTTOM NAVIGATION
// =============================================

const bottomItems = document.querySelectorAll(".bottom-nav div");

bottomItems.forEach(item => {

    item.addEventListener("click", () => {

        const text = item.innerText.trim();

        switch (text) {

            case "Home":

                window.location.href = "dashboard.html";

                break;

            case "Search":

                document.getElementById("searchInput").focus();

                break;

            case "Alerts":

                goToNotifications();

                break;

            case "Profile":

                goToProfile();

                break;

        }

    });

});

// =============================================
// AUTO REFRESH
// =============================================

setInterval(() => {

    loadWeather();

    loadMarketPrice();

}, 60000);