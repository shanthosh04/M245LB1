document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);
  const emailInput = byId("email");
  const passwordInput = byId("password");
  const loginButton = byId("send");
  const errorText = byId("error");

  loginButton.addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data?.token) {
        sessionStorage.setItem("token", data.token);

        window.location.href = "rentroom.html";
      } else {
        errorText.innerText = data.error || "An error occurred.";
      }
    } catch (error) {
      console.error("An error occurred:", error);
      errorText.innerText = "An error occurred. Please try again.";
    }
  });
});
