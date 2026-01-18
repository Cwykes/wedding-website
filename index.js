const weddingDate = new Date("October 10, 2026 00:00:00").getTime();
const countdownEl = document.getElementById("countdown");

document.addEventListener("DOMContentLoaded", () => {
  const type = requireGuest();

  if (type === "day") {
    document.getElementById("dayRSVP").style.display = "block";
  } else if (type === "evening") {
    document.getElementById("eveningRSVP").style.display = "block";
  }
});

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    countdownEl.innerHTML = "It's Wedding Day! 🎉";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000*60*60));
  const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
  const seconds = Math.floor((distance % (1000*60)) / 1000);

  countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function requireGuest() {
  const type = sessionStorage.getItem("guestType");
  if (!type) {
    window.location.href = "./Gatekeeper/Gatekeeper.html";
  }
  return type;
}

setInterval(updateCountdown, 1000);