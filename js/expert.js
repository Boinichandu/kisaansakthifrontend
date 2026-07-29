const BASE_URL = "https://kisaansakthibackend-4.onrender.com";

const districtSelect = document.getElementById("districtSelect");
const mandalSelect = document.getElementById("mandalSelect");
const expertContainer = document.getElementById("expertContainer");
const loading = document.getElementById("loading");

let experts = [];

window.onload = async function(){
    await loadExperts();
    populateDistricts();
};

async function loadExperts(){
    try{
        const response = await fetch(`${BASE_URL}/experts`);
        experts = await response.json();
        displayExperts(experts);
    }catch(error){
        loading.innerHTML = "Unable to load experts";
    }
}

function populateDistricts(){
    const districts = [...new Set(experts.map(e => e.district))];
    districts.forEach(d => {
        districtSelect.innerHTML += `<option value="${d}">${d}</option>`;
    });
}

districtSelect.addEventListener("change", function(){
    const district = this.value;
    mandalSelect.innerHTML = '<option value="">Select Mandal</option>';

    const mandals = [...new Set(
        experts.filter(e => e.district === district).map(e => e.mandal)
    )];

    mandals.forEach(m => {
        mandalSelect.innerHTML += `<option value="${m}">${m}</option>`;
    });
});

function searchExperts(){
    const district = districtSelect.value;
    const mandal = mandalSelect.value;

    let filtered = experts;

    if(district){
        filtered = filtered.filter(e => e.district === district);
    }

    if(mandal){
        filtered = filtered.filter(e => e.mandal === mandal);
    }

    displayExperts(filtered);
}

function displayExperts(data){
    loading.style.display = "none";
    expertContainer.innerHTML = "";

    if(data.length === 0){
        expertContainer.innerHTML = '<h2>No experts found</h2>';
        return;
    }

    data.forEach(expert => {
        expertContainer.innerHTML += `
        <div class="expert-card">
            <h3>👨‍🌾 ${expert.expertName}</h3>
            <p class="specialization">${expert.specialization}</p>

            <div class="expert-info">
                <p>📍 <b>District:</b> ${expert.district}</p>
                <p>🌾 <b>Mandal:</b> ${expert.mandal}</p>
                <p>🏢 ${expert.officeName}</p>
                <p>📧 ${expert.email}</p>
                <p>🕒 ${expert.availableDays} | ${expert.availableTime}</p>
            </div>

            <div class="button-group">
                <a href="tel:${expert.phoneNumber}" class="call-btn">
                    <i class="fa-solid fa-phone"></i> Call Now
                </a>

                <button class="book-btn" onclick="bookCall('${expert.expertName}')">
                    <i class="fa-solid fa-calendar-check"></i> Book Call
                </button>
            </div>
        </div>
        `;
    });
}

function bookCall(expertName){
    document.getElementById("bookingMessage").innerHTML = `
        Your call with <b>${expertName}</b> has been booked.<br><br>
        📱 Please check your SMS for the scheduled date and time.<br><br>
        Thank you for using <b>Kisan Sakthi</b> 🌾
    `;

    document.getElementById("bookingModal").style.display = "flex";
}

function closeModal(){
    document.getElementById("bookingModal").style.display = "none";
}

function goBack(){
    window.location.href = "dashboard.html";
}