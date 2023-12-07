document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const send = document.getElementById("login");
  const errorText = document.getElementById("error");

  send.addEventListener("click", async () => {
    const username = usernameInput.value;
    const password = passwordInput.value;
    const response = await fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data?.token) {
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "/";
    } else {
      errorText.innerText = data.error || "Login fehlgeschlagen";
    }
  });
});
