document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);

  const parkingnr = byId("parkingnr");
  const dateFromInput = byId("datefromInput");
  const dateToInput = byId("datetoInput");
  const timeFromInput = byId("timeFromInput");
  const timeToInput = byId("timeToInput");
  const sendButton = byId("send");
  const messageDisplay = byId("message");

  sendButton.addEventListener("click", async () => {
    const garageNumber = +parkingnr.value;
    const dateFrom = dateFromInput.value;
    const dateTo = dateToInput.value;
    const timeFrom = timeFromInput.value;
    const timeTo = timeToInput.value;

    if (garageNumber > 10) {
      messageDisplay.innerText = "The parking number must not be greater than 10.";
      return;
    }
    const token = sessionStorage.getItem("token");
    if (!token) {
      messageDisplay.innerText = "Authentication token is missing.";
      return;
    }

    const reservationData = { token, parkingnr: garageNumber, dateFrom, dateTo, timeFrom, timeTo };

    try {
      const response = await fetch(BACKEND_URL + "/parkings/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (!response.ok) {
        messageDisplay.innerText = data.message || "Reservation failed due to an error.";
        return;
      }

      alert("Reservation successful!");
    } catch (error) {
      console.error("An error occurred:", error);
      messageDisplay.innerText = "An error occurred during the reservation process.";
    }
  });
});
