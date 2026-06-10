const RSVPForm = document.getElementById("rsvpForm"),
      guestInput = document.getElementById("guest"),
      attendanceInput = document.getElementById("attendance"),
      guestCountInput = document.getElementById("guests"),
      allergiesCheckboxes = document.querySelectorAll('input[name="allergies-item"]');

function showCustomAlert(message) {
  const alertBox = document.getElementById("customAlert");
  const alertMessage = document.getElementById("customAlertMessage");
  const alertButton = document.getElementById("customAlertButton");
  
  alertMessage.textContent = message;
  alertBox.classList.remove("hidden");
  
  alertButton.focus();
  
  return new Promise((resolve) => {
    alertButton.onclick = () => {
      alertBox.classList.add("hidden");
      resolve();
    };
  });
}

function _bindEvents(){
  RSVPForm.addEventListener("submit", _OnSubmitAsync);
  attendanceInput.addEventListener("change", _OnAttendanceChange);
  allergiesCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", _updateAllergiesValue);
  });

  document.querySelectorAll('[data-guest]').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      selectGuest(button.dataset.guest);
    });
  });
}

function init(){
  const guestType = sessionStorage.getItem("guestType");
  applyGuestTypeVisibility(guestType);
  _bindEvents();
}

document.addEventListener("DOMContentLoaded", init);

function selectGuest(name) {
    document.getElementById('guest').value = name;
    const box = document.getElementById('selection-box');
    box.innerHTML = name;
    box.classList.add('selected');

    document.querySelectorAll("details[open]").forEach((d) => {
        d.open = false;
    });

    var guestCount = countGuestCount(name);

    const guestCountInput = document.getElementById("guests");
    guestCountInput.max = guestCount; 

    const attendanceSection = document.getElementById("section-attendance");
    attendanceSection.classList.remove("hidden");
    document.getElementById("attendance").required = true;
}

function _OnAttendanceChange() {
  if (attendanceInput.value === "yes") {
    const guestCountSection = document.getElementById("section-guest-count");
    guestCountSection.classList.remove("hidden");
    document.getElementById("guests").required = true;

    const allergySection = document.getElementById("section-allergies");
    allergySection.classList.remove("hidden");
  }
  else{
    const guestCountSection = document.getElementById("section-guest-count");
    guestCountSection.classList.add("hidden");
    document.getElementById("guests").required = false;

    const allergySection = document.getElementById("section-allergies");
    allergySection.classList.add("hidden");
  }
}

function _updateAllergiesValue() {
  const selectedAllergies = Array.from(allergiesCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  
  document.getElementById("allergies").value = selectedAllergies.join(", ");
}

async function _OnSubmitAsync(e) {
  e.preventDefault();

  if (!guestInput.value) {
    await showCustomAlert("Please select a guest.");
    return;
  }

  // Validate that at least one allergy is selected if showing the allergy section
  const allergySection = document.getElementById("section-allergies");
  if (!allergySection.classList.contains("hidden")) {
    const anyChecked = Array.from(allergiesCheckboxes).some(checkbox => checkbox.checked);
    if (!anyChecked) {
      await showCustomAlert("Please select at least one dietary requirement option.");
      return;
    }
  }

  const form = e.target;
  const data = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  try {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    });

    if (!response.ok) {
      console.error("Formspree error:", response.statusText);
      await showCustomAlert("Something went wrong. Please try again.");
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      return;
    }

    document.body.innerHTML = `
      <div style="padding: 2rem; text-align: center;">
        <h2>Thank you!</h2>
        <p>Your RSVP has been sent.</p>
        <p>Redirecting you back to the main page...</p>
      </div>`;

    setTimeout(() => {
      window.location.href = "../index.html";
    }, 1200);

  } catch (err) {
    console.error("Network error:", err);
    await showCustomAlert("Unable to send. Please contact support (Which is Callum).");
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}

function countGuestCount(str) {
  const commaCount = (str.match(/,/g) || []).length;
  const ampersandCount = (str.match(/&/g) || []).length;

  return commaCount + ampersandCount + 1;
}
