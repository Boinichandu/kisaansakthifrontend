// =====================================
// KISAN SAKTHI - FARMING TIPS
// =====================================

const BASE_URL = "https://kisaansakthibackend-4.onrender.com";

const cropSelect = document.getElementById("cropSelect");
const tipsContainer = document.getElementById("tipsContainer");

// =====================================
// LOAD TIPS
// =====================================

async function loadTips() {

    const crop = cropSelect.value;

    if (crop === "") {

        alert("Please select a crop.");

        return;

    }

    tipsContainer.innerHTML = `

        <div class="loading">

            Loading Farming Tips...

        </div>

    `;

    try {

        const response = await fetch(

            `${BASE_URL}/farming-tips/${encodeURIComponent(crop)}`

        );

        if (!response.ok) {

            throw new Error("Unable to fetch data.");

        }

        const tips = await response.json();

        if (tips.length === 0) {

            tipsContainer.innerHTML = `

                <div class="error">

                    No farming tips available.

                </div>

            `;

            return;

        }

        displayTips(tips);

    }

    catch (error) {

        tipsContainer.innerHTML = `

            <div class="error">

                Unable to connect to server.

            </div>

        `;

        console.error(error);

    }

}

// =====================================
// DISPLAY TIPS
// =====================================

function displayTips(tips) {

    tipsContainer.innerHTML = "";

    // Group tips by category

    const grouped = {};

    tips.forEach(tip => {

        if (!grouped[tip.category]) {

            grouped[tip.category] = [];

        }

        grouped[tip.category].push(tip);

    });

    // Display categories

    for (const category in grouped) {

        const categoryDiv = document.createElement("div");

        categoryDiv.className = "category";

        categoryDiv.innerHTML = `

            <div class="category-title">

                📂 ${category}

            </div>

        `;

        grouped[category].forEach(tip => {

            categoryDiv.innerHTML += `

                <div class="tip-card">

                    <h3>${tip.title}</h3>

                    <div class="stage">

                        🌱 Stage : ${tip.stage}

                    </div>

                    <p>

                        ${tip.description}

                    </p>

                </div>

            `;

        });

        tipsContainer.appendChild(categoryDiv);

    }

}