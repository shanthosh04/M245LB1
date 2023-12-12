document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);

  const parkingnr = byId("parkingnr");
  const dateFromInput = byId("dateInput");
  const timeFromInput = byId("timeFromInput");
  const timeToInput = byId("timeToInput");
  const sendButton = byId("send");
  const messageDisplay = byId("message");

  sendButton.addEventListener("click", async () => {
    const garageNumber = +parkingnr.value;
    const dateFrom = dateFromInput.value;
    const timeFrom = timeFromInput.value;
    const timeTo = timeToInput.value;

    const token = sessionStorage.getItem("token");

    const reservationData = {
      token,
      parkingnr: garageNumber,
      dateFrom,
      timeFrom,
      timeTo,
    };

    try {
      const response = await fetch(BACKEND_URL + "/parkings/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      alert("Reservation successful!");
    } catch (error) {
      console.error("An error occurred:", error);
      messageDisplay.innerText =
        "An error occurred during the reservation process.";
    }
  });
});
