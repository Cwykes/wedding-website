
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
