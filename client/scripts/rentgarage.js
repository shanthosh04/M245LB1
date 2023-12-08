document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);

  const parkingnr = byId("parkingnr");
  const dateFromInput = byId("datefromInput");
  const dateToInput = byId("datetoInput");
  const sendButton = byId("send");

  sendButton.addEventListener("click", async () => {
    const garageNumber = +parkingnr.value;
    const dateFrom = dateFromInput.value;
    const dateTo = dateToInput.value;

    const token = sessionStorage.getItem("token");
    if (!token)
      return (messageDisplay.innerText = "Authentication token is missing.");

    const reservationData = {
      token,
      parkingnr: garageNumber,
      dateFrom,
      dateTo,
    };

    try {
      const response = await fetch("http://localhost:3000/parkings/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });
      alert("Resevation succesful!");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
});
