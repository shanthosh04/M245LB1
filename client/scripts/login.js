document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginButton = document.getElementById("login");
  const errorText = document.getElementById("error");
  const send = document.getElementById("send");

  if (!usernameInput || !passwordInput || !loginButton || !errorText || !send) {
    console.error("One or more elements not found. Check HTML structure and IDs.");
    return;
  }

  loginButton.addEventListener("click", async () => {
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (password.length < 6) {
      send.innerHTML = "Password must be at least 6 characters.";
      return;
    } else {
      send.innerHTML = "";
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data?.token) {
        localStorage.setItem("token", data.token);

        window.location.href = "/";
      } else {
        errorText.innerText = data.error || "An error occurred.";
      }
    } catch (error) {
      console.error("An error occurred:", error);
      errorText.innerText = "An error occurred. Please try again.";
    }
  });
});