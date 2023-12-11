document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);

  const roomNameInput = byId("roomNameInput");
  const dateFromInput = byId("datefromInput");
  const dateToInput = byId("datetoInput");
  const timeFromInput = byId("timeFromInput");
  const timeToInput = byId("timeToInput");
  const sendButton = byId("send");
  const messageDisplay = byId("message");

  document.getElementById('add').addEventListener('click', function() {
    window.location.href = "addroom.html";
  });

  const isTimeInvalid = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours >= 18;
  };

  sendButton.addEventListener("click", async () => {
    const roomName = roomNameInput.value;
    const dateFrom = dateFromInput.value;
    const dateTo = dateToInput.value;
    const timeFrom = timeFromInput.value;
    const timeTo = timeToInput.value;

    if (!roomName || !dateFrom || !dateTo || !timeFrom || !timeTo) {
      messageDisplay.innerText = "Please fill in all fields.";
      return;
    }

    if (isTimeInvalid(timeFrom) || isTimeInvalid(timeTo)) {
      messageDisplay.innerText = "Reservations cannot be made after 6:00 PM.";
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      messageDisplay.innerText = "Authentication token is missing.";
      return;
    }

    const reservationData = { token, roomName, dateFrom, dateTo, timeFrom, timeTo };

    try {
      const response = await fetch(BACKEND_URL + "/rooms/reserve", {
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
