// current date/time
function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
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

  return `Updated on ${day}, ${hours}:${minutes}`;
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
function formatImage(icon) {
  let clear = "images/01d.png";
  let clearNight = "images/01n.png";
  let fewClouds = "images/02d.png";
  let fewCloudsNight = "images/02n.png";
  let clouds = "images/03d.png";
  let showerRain = "images/09d.png";
  let rain = "images/10d.png";
  let rainNight = "images/10n.png";
  let thunderstorm = "images/11d.png";
  let snow = "images/13d.png";
  let mist = "images/50d.png";

  if (icon === "01d") {
    return clear;
  } else if (icon === "01n") {
    return clearNight;
  } else if (icon === "02d") {
    return fewClouds;
  } else if (icon === "02n") {
    return fewCloudsNight;
  } else if (
    icon === "03d" ||
    icon === "04d" ||
    icon === "03n" ||
    icon === "04n"
  ) {
    return clouds;
  } else if (icon === "09d" || icon === "09n") {
    return showerRain;
  } else if (icon === "10d") {
    return rain;
  } else if (icon === "10n") {
    return rainNight;
  } else if (icon === "11d" || icon === "11n") {
    return thunderstorm;
  } else if (icon === "13d" || icon === "13n") {
    return snow;
  } else if (icon === "50d" || icon === "50n") {
    return mist;
  }
}
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

  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#today-img");
  iconElement.setAttribute("src", formatImage(response.data.weather[0].icon));
  iconElement.setAttribute("alt", response.data.weather[0].description);
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

let dateElement = document.querySelector("#date-element");

// let farenheitLink = document.querySelector("#farenheit-link");
// farenheitLink.addEventListener("click", convertToFarenheit);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", convertToCelsius);

let searchForm = document.querySelector("#city-search-form");
searchForm.addEventListener("submit", handleSubmit);

let geoButton = document.querySelector("#location-btn");
geoButton.addEventListener("click", getGeolocation);

searchCity("Glasgow");
