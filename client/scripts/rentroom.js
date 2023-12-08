document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);

  const roomNameInput = byId("roomNameInput");
  const dateFromInput = byId("datefromInput");
  const dateToInput = byId("datetoInput");
  const sendButton = byId("send");
  const messageDisplay = byId("message");

  sendButton.addEventListener("click", async () => {
    const roomName = roomNameInput.value;
    const dateFrom = dateFromInput.value;
    const dateTo = dateToInput.value;

    if (!roomName || !dateFrom || !dateTo) {
      messageDisplay.innerText = "Please fill in all fields.";
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!token)
      return (messageDisplay.innerText = "Authentication token is missing.");

    const reservationData = { token, roomName, dateFrom, dateTo };

    try {
      const response = await fetch("http://localhost:3000/rooms/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });
      alert("Reservation successful!");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
});
