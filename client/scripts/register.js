document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);
  const registerButton = byId("send");

  registerButton.addEventListener("click", async () => {
    const data = {
      firstname: byId("firstnameInput").value,
      lastname: byId("lastnameInput").value,
      birthdate: byId("birthdateInput").value,
      street: byId("streetInput").value,
      streetnr: +byId("streetnrInput").value,
      zip: byId("zipInput").value,
      phone: byId("phoneInput").value,
      email: byId("emailInput").value,
      password: byId("passwordInput").value,
    };
    console.log(data);
  });
});
