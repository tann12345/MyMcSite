async function register() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("https://minecraft-site-backend.onrender.com/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    alert("✅ Registered successfully!");
    window.location.href = "/login.html"; // or show success message
  } else {
    alert("❌ Registration failed");
  }
}
