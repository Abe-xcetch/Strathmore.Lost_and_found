document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // prevent actual form submission

    const id = document.getElementById("studentID").value.trim();
    const pass = document.getElementById("password").value.trim();
    const error = document.getElementById("errorMsg");

    // Dummy validation (replace with real backend/auth later)
    if (id === "student123" && pass === "password") {
        alert("Login successful!");
        window.location.href = "index.html"; // replace with your actual page
    } else {
        error.textContent = "Invalid student ID or password.";
    }
});
