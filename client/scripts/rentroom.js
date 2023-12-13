document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);

  const roomNameInput = byId("roomNameInput");
  const dateFromInput = byId("datefromInput");
  const timeFromInput = byId("timeFromInput");
  const timeToInput = byId("timeToInput");
  const sendButton = byId("send");
  const messageDisplay = byId("message");

  document.getElementById("add").addEventListener("click", function () {
    window.location.href = "addroom.html";
  });

  const isTimeInvalid = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours >= 18;
  };

  sendButton.addEventListener("click", async () => {
    const roomName = roomNameInput.value;
    const dateFrom = dateFromInput.value;
    const timeFrom = timeFromInput.value;
    const timeTo = timeToInput.value;

    const token = sessionStorage.getItem("token");

    const reservationData = {
      token,
      roomName,
      dateFrom,
      timeFrom,
      timeTo,
    };

    try {
      const response = await fetch(BACKEND_URL + "/rooms/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      const data = await response.json();

      if (data.err) return (byId("err").innerHTML = data.err);

      alert("Reservation successful!");
    } catch (error) {
      console.error("An error occurred:", error);
      messageDisplay.innerText =
        "An error occurred during the reservation process.";
    }
  });
});
