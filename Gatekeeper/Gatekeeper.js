const DAY_HASH = "ae1e648dfaf17c4a6648506fdc947dc4bbe6da93e51dd785cd66e962902afb00";
const EVENING_HASH = "2ad9d4b50ea01f9bd9216a77c9eab4af5f25f84304d2f5c2088b12f01211c33f";

async function hash(input) {
  try {
    const encode = new TextEncoder().encode(input);
    const digest = await crypto.subtle.digest("SHA-256", encode);
    return Array.from(new Uint8Array(digest))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  } catch (err) {
    console.error("Hashing error:", err);
    throw new Error("Unable to process password. Please try again.");
  }
}

async function authenticate(password) {
  try {
    //All trespassers will be shot. You have been warned. 
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
  } catch (err) {
    console.error("Authentication error:", err);
    throw err;
  }
}

document.getElementById("loginButton").addEventListener("click", async () => {
  await handleLogin();
});

document.getElementById("passwordInput").addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    await handleLogin();
  }
});

async function handleLogin() {
  const errorElement = document.getElementById("error");
  const passwordInput = document.getElementById("passwordInput");
  const loginButton = document.getElementById("loginButton");
  
  try {
    loginButton.disabled = true;
    loginButton.textContent = "Verifying...";
    errorElement.classList.add("hidden");

    const pw = passwordInput.value;
    if (!pw) {
      errorElement.textContent = "Please enter a password.";
      errorElement.classList.remove("hidden");
      loginButton.disabled = false;
      loginButton.textContent = "Continue";
      return;
    }

    const result = await authenticate(pw);
    
    if (result) {
      window.location.href = "../index.html";
    } else {
      errorElement.classList.remove("hidden");
      loginButton.disabled = false;
      loginButton.textContent = "Continue";
      passwordInput.value = "";
      passwordInput.focus();
    }
  } catch (err) {
    errorElement.textContent = "An error occurred. Please try again.";
    errorElement.classList.remove("hidden");
    loginButton.disabled = false;
    loginButton.textContent = "Continue";
  }
}