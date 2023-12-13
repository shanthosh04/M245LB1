document.addEventListener("DOMContentLoaded", () => {
  const byId = (id) => document.getElementById(id);

  const addroomnameInput = byId("addroomname");
  const pictureupload = byId("picture");
  const floorselection = byId("floor");
  const roomselection = byId("room");
  const addroomInput = byId("addroom");
  const send = byId("send");
  // { token, name, img, floor, roomType, spots }
  send.addEventListener("click,", async () => {
    const addroomname = addroomnameInput.value;
    const picture = pictureupload.value;
    const floor = floorselection.value;
    const room = roomselection.value;
    const addroom = addroomInput.values;

    try {
      const response = await fetch(BACKEND_URL + "/rooms/add", {
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
