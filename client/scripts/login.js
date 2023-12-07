document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);
  const emailInput = byId("email");
  const passwordInput = byId("password");
  const loginButton = byId("login");
  const errorText = byId("error");
  const send = byId("send");

  loginButton.addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (password.length < 6) {
      send.innerHTML = "Password must be at least 6 characters.";
      return;
    } else {
      send.innerHTML = "";
    }

    try {
      const response = await fetch("localhost:6000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
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
