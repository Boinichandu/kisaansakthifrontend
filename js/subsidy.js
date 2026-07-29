// ======================================
// KISAN SAKTHI - SUBSIDY PAGE
// ======================================

const BASE_URL = "https://kisaansakthibackend-4.onrender.com";

const subsidyContainer = document.getElementById("subsidyContainer");
const loading = document.getElementById("loading");
const searchInput = document.getElementById("searchInput");

let subsidies = [];

// ======================================
// PAGE LOAD
// ======================================

window.onload = function () {

    loadSubsidies();

};

// ======================================
// LOAD SUBSIDIES
// ======================================

async function loadSubsidies() {

    try {

        const response = await fetch(`${BASE_URL}/subsidies`);

        if (!response.ok) {

            throw new Error("Unable to fetch subsidies");

        }

        subsidies = await response.json();

        displaySubsidies(subsidies);

    }

    catch (error) {

        loading.innerHTML = "Unable to load subsidy data.";

        console.log(error);

    }

}

// ======================================
// DISPLAY SUBSIDIES
// ======================================

function displaySubsidies(data) {

    loading.style.display = "none";

    subsidyContainer.innerHTML = "";

    if (data.length === 0) {

        subsidyContainer.innerHTML = "<h2>No Subsidies Available</h2>";

        return;

    }

    data.forEach(subsidy => {

        subsidyContainer.innerHTML += `

        <div class="subsidy-card">

            <h2>${subsidy.schemeName}</h2>

            <p><strong>Category :</strong> ${subsidy.category}</p>

            <div class="price-box">

                <div class="price">

                    <h4>Government Rate</h4>

                    <span>₹ ${subsidy.governmentRate}</span>

                </div>

                <div class="price">

                    <h4>Market Rate</h4>

                    <span>₹ ${subsidy.marketRate}</span>

                </div>

                <div class="price">

                    <h4>Farmer Pays</h4>

                    <span>₹ ${subsidy.farmerPrice}</span>

                </div>

            </div>

            <div class="location">

                <div>

                    📍 <strong>District</strong><br>

                    ${subsidy.district}

                </div>

                <div>

                    🌾 <strong>Mandal</strong><br>

                    ${subsidy.mandal}

                </div>

            </div>

            <div class="description">

                ${subsidy.description}

            </div>

            <button
                class="apply-btn"
                onclick="window.location.href='subsidy-details.html?id=${subsidy.id}'">

                View Details

            </button>

        </div>

        `;

    });

}

// ======================================
// SEARCH
// ======================================

searchInput.addEventListener("keyup", function () {

    const value = this.value.toLowerCase();

    const filtered = subsidies.filter(subsidy =>

        subsidy.schemeName.toLowerCase().includes(value) ||

        subsidy.category.toLowerCase().includes(value) ||

        subsidy.district.toLowerCase().includes(value) ||

        subsidy.mandal.toLowerCase().includes(value)

    );

    displaySubsidies(filtered);

});

// ======================================
// VIEW DETAILS
// ======================================

function showDetails(id) {

    const subsidy = subsidies.find(item => item.id === id);

    if (!subsidy) return;

    document.getElementById("modalTitle").innerHTML = subsidy.schemeName;

    document.getElementById("modalBody").innerHTML = `

        <div class="detail-section">

            <h3>Category</h3>

            <div class="detail-box">

                ${subsidy.category}

            </div>

        </div>

        <div class="detail-section">

            <h3>Price Details</h3>

            <div class="detail-box">

                <p><strong>Government Subsidy :</strong> ₹${subsidy.governmentRate}</p>

                <p><strong>Market Price :</strong> ₹${subsidy.marketRate}</p>

                <p><strong>Farmer Pays :</strong> ₹${subsidy.farmerPrice}</p>

            </div>

        </div>

        <div class="detail-section">

            <h3>Location</h3>

            <div class="detail-box">

                <p><strong>District :</strong> ${subsidy.district}</p>

                <p><strong>Mandal :</strong> ${subsidy.mandal}</p>

            </div>

        </div>

        <div class="detail-section">

            <h3>Eligibility</h3>

            <div class="detail-box">

                ${subsidy.eligibility}

            </div>

        </div>

        <div class="detail-section">

            <h3>Application Dates</h3>

            <div class="detail-box">

                <p><strong>Start Date :</strong> ${subsidy.startDate}</p>

                <p><strong>Last Date :</strong> ${subsidy.lastDate}</p>

            </div>

        </div>

        <div class="detail-section">

            <h3>Required Documents</h3>

            <div class="detail-box">

                ${
                    subsidy.requiredDocuments
                        ? subsidy.requiredDocuments
                            .split(",")
                            .map(doc => `<div class="document">📄 ${doc.trim()}</div>`)
                            .join("")
                        : "No documents available"
                }

            </div>

        </div>

        <div class="detail-section">

            <h3>Description</h3>

            <div class="detail-box">

                ${subsidy.description}

            </div>

        </div>

    `;

    document.getElementById("detailsModal").style.display = "block";

}

// ======================================
// CLOSE MODAL
// ======================================

document.querySelector(".close").addEventListener("click", function () {

    document.getElementById("detailsModal").style.display = "none";

});

window.addEventListener("click", function (event) {

    const modal = document.getElementById("detailsModal");

    if (event.target === modal) {

        modal.style.display = "none";

    }

});

// ======================================
// BACK BUTTON
// ======================================

function goBack() {

    window.location.href = "dashboard.html";

}