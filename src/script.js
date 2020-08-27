// current date/time
function formatDate(now) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = now.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day}, ${hours}:${minutes}`;
}

// unit change buttons
// function convertToFarenheit(event) {
//   event.preventDefault();
//   let currentTemp = document.querySelector("#current-temp");
//   currentTemp.innerHTML = Math((currentTemp * 9) / 5 + 32);
// }

// function convertToCelsius(event) {
//   event.preventDefault();
//   let currentTemp = document.querySelector("#current-temp");
//   currentTemp.innerHTML = 13;
// }

// geolocation & search city
function displayWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = temperature;

  let city = response.data.name;
  let cityHeading = document.querySelector("#location");
  cityHeading.innerHTML = city.toUpperCase();

  let country = response.data.sys.country;
  let countryHeading = document.querySelector("#country");
  countryHeading.innerHTML = country;

  let humidity = response.data.main.humidity;
  let humidityHeading = document.querySelector("#humidity");
  humidityHeading.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed * 2.237);
  let windHeading = document.querySelector("#wind");
  windHeading.innerHTML = `${wind} mph`;

  let description = response.data.weather[0].description;
  let decscriptionHeading = document.querySelector("#weather-description");
  decscriptionHeading.innerHTML = description;
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "f3691b18a7a9f34109b9d2f634be83aa";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  searchCity(city);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "f3691b18a7a9f34109b9d2f634be83aa";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function getGeolocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let dateElement = document.querySelector("#current-time-date");
let now = new Date();
dateElement.innerHTML = formatDate(now);

// let farenheitLink = document.querySelector("#farenheit-link");
// farenheitLink.addEventListener("click", convertToFarenheit);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", convertToCelsius);

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", handleSubmit);

let geoButton = document.querySelector("#location-btn");
geoButton.addEventListener("click", getGeolocation);

searchCity("Glasgow");
