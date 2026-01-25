const weddingDate = new Date("October 10, 2026 09:00:00").getTime();
const countdown = document.getElementById("countdown");

document.addEventListener("DOMContentLoaded", () => {

});

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    countdown.innerHTML = "It's Wedding Day! 🎉";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const days1 = days > 99 ? Math.floor(days / 100) : 0;
  updateCountdownDisplay(document.getElementById("days1"), days1);

  const days2 = days > 9 ? Math.floor((days - (days1 * 100)) / 10) : 0;
  updateCountdownDisplay(document.getElementById("days2"), days2);

  const days3 = days > 0 ? Math.floor((days - (days1 * 100)) - (days2 * 10)) : 0;
  updateCountdownDisplay(document.getElementById("days3"), days3);

  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const hours1 = hours > 9 ? Math.floor(hours / 10) : 0;
  updateCountdownDisplay(document.getElementById("hours1"), hours1);

  const hours2 = hours > 0 ? Math.floor((hours - (hours1 * 10))) : 0;
  updateCountdownDisplay(document.getElementById("hours2"), hours2);


  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const minutes1 = minutes > 9 ? Math.floor(minutes / 10) : 0;
  updateCountdownDisplay(document.getElementById("minutes1"), minutes1);


  const minutes2 = minutes > 0 ? Math.floor((minutes - (minutes1 * 10))) : 0;
  updateCountdownDisplay(document.getElementById("minutes2"), minutes2);

  const seconds = Math.floor((distance % (1000*60)) / 1000);
  const seconds1 = seconds > 9 ? Math.floor(seconds / 10) : 0;
  updateCountdownDisplay(document.getElementById("seconds1"), seconds1);
  
  const seconds2 = seconds > 0 ? Math.floor((seconds - (seconds1 * 10))) : 0;
  updateCountdownDisplay(document.getElementById("seconds2"), seconds2);

}

document.addEventListener("DOMContentLoaded", () => {
  const type = requireGuest();

  // if (type === "day") {
  //   document.getElementById("dayRSVP").style.display = "block";
  // } else if (type === "evening") {
  //   document.getElementById("eveningRSVP").style.display = "block";
  // }
  const venueCoords = [52.8332446, -1.7692549];

  const map = L.map('map').setView(venueCoords, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker(venueCoords)
    .addTo(map)
    .bindPopup("Hanbury Barns Wedding Venue")
    .openPopup();
});


function updateCountdownDisplay(element, value) {
  if (element.innerHTML != value)
  {
    element.classList.remove('flip-x');
    void element.offsetWidth;
    element.classList.add('flip-x');
    setTimeout(() => {
      element.innerHTML = value;
    }, 300);
  }
}


function requireGuest() {
  const type = sessionStorage.getItem("guestType");
  if (!type) {
    window.location.href = "./Gatekeeper/Gatekeeper.html";
  }
  return type;
}

  const btn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');

  btn.addEventListener('click', () => {
    toggleNavVisibility();
  });

  overlay.addEventListener('click', () => {
    toggleNavVisibility();
  });

  document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    toggleNavVisibility();
  });
});

function toggleNavVisibility() {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
  btn.innerHTML = sidebar.classList.contains('open') ? '✕' : '☰';
}


setInterval(updateCountdown, 1000);