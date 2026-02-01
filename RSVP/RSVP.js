
function selectGuest(name) {
    document.getElementById('guest').value = name;
    const box = document.getElementById('selection-box');
    box.textContent = "Selected Guest: " + name;
    box.classList.add('selected');

    document.querySelectorAll("details[open]").forEach((d) => {
        d.open = false;
    });
}

document.querySelectorAll("details").forEach((detail) => {
  detail.addEventListener("toggle", function () {
    if (this.open) {
      const section = this.querySelector(":scope > *:not(summary)");
      if (section) {
        section.style.opacity = 0;
        section.style.transition = "opacity 0.3s ease";
        requestAnimationFrame(() => {
          section.style.opacity = 1;
        });
      }
    }
  });
});

document.getElementById("rsvpForm").addEventListener("submit", async function (e) {
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
    alert("Unable to send. Please contact support (Callum).");
  }
});
