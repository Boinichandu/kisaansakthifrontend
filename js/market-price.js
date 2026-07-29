// ======================================
// MARKET PRICE PAGE
// ======================================

const BASE_URL = "https://kisaansakthibackend-4.onrender.com";

let allPrices = [];

// ======================================
// PAGE LOAD
// ======================================

window.onload = function () {

    loadMarketPrices();

};

// ======================================
// LOAD MARKET PRICES
// ======================================

async function loadMarketPrices() {

    try {

        const response = await fetch(`${BASE_URL}/market-prices`);

        if (!response.ok) {

            throw new Error("Unable to fetch market prices.");

        }

        allPrices = await response.json();

        displayPrices(allPrices);

    }

    catch (error) {

        console.error(error);

        alert("Unable to load Market Prices.");

    }

}

// ======================================
// DISPLAY MARKET CARDS
// ======================================

function displayPrices(prices) {

    const container = document.getElementById("marketContainer");

    container.innerHTML = "";

    if (prices.length === 0) {

        container.innerHTML = `
            <h2 style="text-align:center;color:red;">
                No Market Found
            </h2>
        `;

        return;

    }

    const groupedMarkets = {};

    prices.forEach(price => {

        if (!groupedMarkets[price.marketName]) {

            groupedMarkets[price.marketName] = [];

        }

        groupedMarkets[price.marketName].push(price);

    });

    Object.keys(groupedMarkets).forEach(market => {

        let card = `

        <div class="market-card">

            <h2>${market}</h2>

            <table>

                <thead>

                    <tr>

                        <th>Crop</th>

                        <th>Price / Quintal</th>

                    </tr>

                </thead>

                <tbody>

        `;

        groupedMarkets[market].forEach(item => {

            card += `

                <tr>

                    <td>${item.cropName}</td>

                    <td>₹ ${item.pricePerQuintal}</td>

                </tr>

            `;

        });

        card += `

                </tbody>

            </table>

        </div>

        `;

        container.innerHTML += card;

    });

}

// ======================================
// SEARCH BUTTON
// ======================================

function searchMarket() {

    const keyword = document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    if (keyword === "") {

        displayPrices(allPrices);

        return;

    }

    const filtered = allPrices.filter(price =>

        price.marketName.toLowerCase().includes(keyword)

    );

    displayPrices(filtered);

}

// ======================================
// ENTER KEY SEARCH
// ======================================

document.getElementById("searchInput").addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        searchMarket();

    }

});