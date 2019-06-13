const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const $addressSubmit = document.querySelector("#address-submit");
const $currentLocation = document.querySelector("#current-location");

weatherForm.addEventListener("submit", event => {
  event.preventDefault();
  $addressSubmit.setAttribute("disabled", "disabled");
  $currentLocation.setAttribute("disabled", "disabled");
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  const location = search.value;
  const url = "/weather?address=" + location;
  search.value = "";
  fetch(url).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
      $addressSubmit.removeAttribute("disabled");
      $currentLocation.removeAttribute("disabled");
    });
  });
});

$currentLocation.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Sorry, geolocation not supported by your browser");
  }
  $addressSubmit.setAttribute("disabled", "disabled");
  $currentLocation.setAttribute("disabled", "disabled");
  navigator.geolocation.getCurrentPosition(position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const url =
      "/currentlocation?latitude=" + latitude + "&longitude=" + longitude;
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
        $addressSubmit.removeAttribute("disabled");
        $currentLocation.removeAttribute("disabled");
      });
  });
});
