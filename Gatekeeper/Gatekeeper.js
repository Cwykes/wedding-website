const DAY_HASH = "ae1e648dfaf17c4a6648506fdc947dc4bbe6da93e51dd785cd66e962902afb00";
const EVENING_HASH = "2ad9d4b50ea01f9bd9216a77c9eab4af5f25f84304d2f5c2088b12f01211c33f";

async function hash(input) {
  const encode = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", encode);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function authenticate(password) {
  const hashed = await hash(password);

  //All trespassers will be shot. You have been warned. 
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