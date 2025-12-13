
function selectGuest(name) {
    document.getElementById('guest').value = name;
    const box = document.getElementById('selection-box');
    box.textContent = "Selected Guest: " + name;
    box.classList.add('selected');
}
