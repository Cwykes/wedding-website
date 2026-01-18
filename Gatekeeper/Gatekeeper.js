const DAY_HASH = "8f2364e11b8be3ff008f32b3dedb54e659362429bcc9e3eb6acb6070de4ffbff";
const EVENING_HASH = "458c1fed574354042397e664d6dabe58415c8ab629f052db5723fb42b490d280";

async function hash(input) {
  const encode = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", encode);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function authenticate(password) {
  const hashed = await hash(password);

  if (hashed === DAY_HASH) {
    sessionStorage.setItem("guestType", "day");
    return "day";
  }

  if (hashed === EVENING_HASH) {
    sessionStorage.setItem("guestType", "evening");
    return "evening";
  }

  return null;
}

document.getElementById("loginButton").addEventListener("click", async () => {
    const pw = document.getElementById("passwordInput").value;
    const result = await authenticate(pw);
    
    if (result) {
        window.location.href = "../index.html";
    } else {
        document.getElementById("error").classList.remove("hidden");
    }
});