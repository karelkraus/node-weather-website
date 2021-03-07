console.log("Client side javascript file is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector(".search-weather");
const forecastMsg = document.querySelector(".forecast-msg");
const errorMsg = document.querySelector(".error-msg");

weatherForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const location = search.value;
  forecastMsg.textContent = "Loading...";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response
        .json()
        .then((data) =>
          data.error
            ? (errorMsg.textContent = data.error)
            : (forecastMsg.textContent = `${data.location}: ${data.forecast}`)
        );
    }
  );
  search.value = "";
});
