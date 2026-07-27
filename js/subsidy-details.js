// ============================================
// KISAN SAKTHI - SUBSIDY DETAILS
// ============================================

const BASE_URL = "http://localhost:8080";

// ============================================
// GET SUBSIDY ID FROM URL
// ============================================

const params = new URLSearchParams(window.location.search);

const subsidyId = params.get("id");

// ============================================
// LOAD DATA
// ============================================

window.onload = function () {

    if (subsidyId == null) {

        alert("Invalid Subsidy");

        window.location.href = "subsidy.html";

        return;

    }

    loadSubsidy();

};

// ============================================
// FETCH SUBSIDY DETAILS
// ============================================

async function loadSubsidy() {

    try {

        const response = await fetch(`${BASE_URL}/subsidies/${subsidyId}`);

        if (!response.ok) {

            throw new Error("Unable to fetch subsidy");

        }

        const subsidy = await response.json();

        document.getElementById("schemeName").innerHTML = subsidy.schemeName;

        document.getElementById("category").innerHTML = subsidy.category;

        document.getElementById("governmentRate").innerHTML =
            "₹ " + subsidy.governmentRate.toLocaleString();

        document.getElementById("marketRate").innerHTML =
            "₹ " + subsidy.marketRate.toLocaleString();

        document.getElementById("farmerPrice").innerHTML =
            "₹ " + subsidy.farmerPrice.toLocaleString();

        document.getElementById("district").innerHTML =
            subsidy.district;

        document.getElementById("mandal").innerHTML =
            subsidy.mandal;

        document.getElementById("startDate").innerHTML =
            subsidy.startDate;

        document.getElementById("lastDate").innerHTML =
            subsidy.lastDate;

        document.getElementById("eligibility").innerHTML =
            subsidy.eligibility;

        document.getElementById("description").innerHTML =
            subsidy.description;

        // ============================================
        // REQUIRED DOCUMENTS
        // ============================================

        const documentList = document.getElementById("documentsList");

        documentList.innerHTML = "";

        if (subsidy.requiredDocuments != null &&
            subsidy.requiredDocuments.trim() !== "") {

            const docs = subsidy.requiredDocuments.split(",");

            docs.forEach(doc => {

                const li = document.createElement("li");

                li.innerHTML =
                    `<i class="fa-solid fa-circle-check"
                    style="color:#2E7D32;margin-right:10px;"></i>
                    ${doc.trim()}`;

                documentList.appendChild(li);

            });

        }
        else {

            documentList.innerHTML =
                "<li>No documents available</li>";

        }

    }

    catch (error) {

        console.log(error);

        alert("Unable to load subsidy details.");

    }

}

// ============================================
// BACK BUTTON
// ============================================

function goBack() {

    window.location.href = "subsidy.html";

}

// ============================================
// APPLY BUTTON
// ============================================

document.querySelector(".apply-btn").addEventListener("click", function () {

    alert(
`Application feature will be available soon.

Please visit your nearest Agriculture Office
with the required documents.`
    );

});