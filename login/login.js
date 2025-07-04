document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const studentID = document.getElementById("studentID").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentID, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token); // Store token
            window.location.href = "../StrathFind/index.html";
        } else {
            document.getElementById("errorMsg").textContent = data.error || 'Login failed';
        }
    } catch (err) {
        console.error('Login error:', err);
    }
});