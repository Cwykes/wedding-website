const RSVPForm = document.getElementById("rsvpForm"),
      guestInput = document.getElementById("guest"),
      attendanceInput = document.getElementById("attendance"),
      guestCountInput = document.getElementById("guests");

function _bindEvents(){
  RSVPForm.addEventListener("submit", _OnSubmitAsync);
  attendanceInput.addEventListener("change", _OnAttendanceChange);
}

function init(){
  const guestType = sessionStorage.getItem("guestType");
  applyGuestTypeVisibility(guestType);
  _bindEvents();
}

document.addEventListener("DOMContentLoaded", init);

function applyGuestTypeVisibility(guestType) {
  // Get all elements marked with data-guest-type attribute
  const allGuestElements = document.querySelectorAll('[data-guest-type]');
  
  allGuestElements.forEach(element => {
    const allowedTypes = element.getAttribute('data-guest-type').split(',').map(t => t.trim());
    
    if (allowedTypes.includes(guestType)) {
      element.classList.remove('hidden');
      element.style.display = '';
    } else {
      element.classList.add('hidden');
      element.style.display = 'none';
    }
  });
}

function selectGuest(name) {
    document.getElementById('guest').value = name;
    const box = document.getElementById('selection-box');
    box.innerHTML = "Selected Guest:<br>" + name;
    box.classList.add('selected');

    document.querySelectorAll("details[open]").forEach((d) => {
        d.open = false;
    });

    var guestCount = countGuestCount(name);

    const guestCountInput = document.getElementById("guests");
    guestCountInput.max = guestCount; 

    const attendanceSection = document.getElementById("section-attendance");
    attendanceSection.classList.remove("hidden");
}

function _OnAttendanceChange() {
  if (attendanceInput.value === "yes") {
    const guestCountSection = document.getElementById("section-guest-count");
    guestCountSection.classList.remove("hidden");

    const allergySection = document.getElementById("section-allergies");
    allergySection.classList.remove("hidden");
  }
  else{
    const guestCountSection = document.getElementById("section-guest-count");
    guestCountSection.classList.add("hidden");

    const allergySection = document.getElementById("section-allergies");
    allergySection.classList.add("hidden");
  }
}

async function _OnSubmitAsync(e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    });


    if (!response.ok) {
      console.error("Formspree error:", response.statusText);
      alert("Something went wrong. Please try again.");
      return;
    }
    document.body.innerHTML = `
      <div style="padding: 2rem; text-align: center;">
        <h2>Thank you!</h2>
        <p>Your RSVP has been sent.</p>
        <p>Redirecting…</p>
      </div>`;

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1200);

  } catch (err) {
    console.error("Network error:", err);
    alert("Unable to send. Please contact support (Which is Callum).");
  }
}

function countGuestCount(str) {
  const commaCount = (str.match(/,/g) || []).length;
  const ampersandCount = (str.match(/&/g) || []).length;

  return commaCount + ampersandCount + 1;
}
