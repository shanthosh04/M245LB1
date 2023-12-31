document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);
  const registerButton = byId("send");

  registerButton.addEventListener("click", async () => {
    const data = {
      firstname: byId("firstnameInput").value,
      lastname: byId("lastnameInput").value,
      birthday: byId("birthdateInput").value,
      street: byId("streetInput").value,
      streetnr: +byId("streetnrInput").value,
      zip: byId("zipInput").value,
      phone: byId("phoneInput").value,
      email: byId("emailInput").value,
      password: byId("passwordInput").value,
    };
    const res = await fetch(BACKEND_URL + "/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const { err } = await res.json();
    if (err) return (byId("err").innerHTML = err);
    window.location.href = "index.html";
  });
});
