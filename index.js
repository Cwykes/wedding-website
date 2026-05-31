const weddingDate = new Date("October 10, 2026 00:00:00").getTime();
const countdown = document.getElementById("countdown");
let mapInitialized = false;

// Utility function to apply visibility based on guest type
function applyGuestTypeVisibility(guestType) {
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

document.addEventListener("DOMContentLoaded", () => {
  const type = requireGuest();
  applyGuestTypeVisibility(type);

  // Give Leaflet time to load before setting up the observer
  setTimeout(() => {
    initializeMapWithObserver();
  }, 500);
});

function initializeMapWithObserver() {
  const venueSection = document.querySelector('#venue');
  if (!venueSection) return;

  // Check if section is already in view
  if (venueSection.getBoundingClientRect().top < window.innerHeight) {
    initializeMap();
    return;
  }

  // Set up observer for when section comes into view
  const mapObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !mapInitialized) {
        initializeMap();
        mapObserver.unobserve(venueSection);
      }
    });
  }, { threshold: 0.1 });
  
  mapObserver.observe(venueSection);
}

function initializeMap() {
  try {
    if (mapInitialized) return;

    // Wait for Leaflet to be available
    if (typeof L === "undefined") {
      console.log("Leaflet not loaded yet, retrying...");
      setTimeout(initializeMap, 100);
      return;
    }

    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.warn("Map element not found");
      return;
    }

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

    mapInitialized = true;
    console.log("Map initialized successfully");
  } catch (err) {
    console.error("Map initialization error:", err);
  }
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    countdown.innerHTML = "It's Wedding Day! 🎉";
    countdown.style.color = "white";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const daysStr = String(days).padStart(3, '0');
  const hoursStr = String(hours).padStart(2, '0');
  const minutesStr = String(minutes).padStart(2, '0');
  const secondsStr = String(seconds).padStart(2, '0');

  updateCountdownDisplay(document.getElementById("days1"), daysStr[0]);
  updateCountdownDisplay(document.getElementById("days2"), daysStr[1]);
  updateCountdownDisplay(document.getElementById("days3"), daysStr[2]);
  updateCountdownDisplay(document.getElementById("hours1"), hoursStr[0]);
  updateCountdownDisplay(document.getElementById("hours2"), hoursStr[1]);
  updateCountdownDisplay(document.getElementById("minutes1"), minutesStr[0]);
  updateCountdownDisplay(document.getElementById("minutes2"), minutesStr[1]);
  updateCountdownDisplay(document.getElementById("seconds1"), secondsStr[0]);
  updateCountdownDisplay(document.getElementById("seconds2"), secondsStr[1]);
}

function updateCountdownDisplay(element, value) {
  if (element.innerHTML !== value) {
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

document.querySelectorAll('[data-href]').forEach(button => {
  button.addEventListener('click', function() {
    const href = this.getAttribute('data-href');
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      window.location.href = href;
    }
  });
});

function toggleNavVisibility() {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
  btn.innerHTML = sidebar.classList.contains('open') ? '✕' : '☰';
}


setInterval(updateCountdown, 1000);