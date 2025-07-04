document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const studentID = document.getElementById("studentID").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorMsg = document.getElementById("errorMsg");

    // Client-side validation
    if (password !== confirmPassword) {
        errorMsg.textContent = "Passwords don't match!";
        return;
    }
    if (password.length < 8) {
        errorMsg.textContent = "Password must be at least 8 characters!";
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentID, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! Please login.");
            window.location.href = "login_page.html";
        } else {
            errorMsg.textContent = data.error || "Registration failed";
        }
    } catch (err) {
        console.error("Registration error:", err);
        errorMsg.textContent = "Network error. Try again later.";
    }
});