function refreshWeather(response) {
  let tempValue = document.querySelector(".temp-value");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let todayElement = document.querySelector("#today");
  let date = new Date(response.data.time * 1000);
  const { day, month, dates, hours, minutes } = formatDate(date);
  let rawDescriptionElement = response.data.condition.description;
  let capitalizedDescriptionElement =
    rawDescriptionElement.charAt(0).toUpperCase() +
    rawDescriptionElement.slice(1);

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = `${month} ${dates}, ${hours}:${minutes}`;
  todayElement.innerHTML = day;
  descriptionElement.innerHTML = capitalizedDescriptionElement;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  tempValue.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let dates = date.getDate();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];
  const month = months[date.getMonth()];

  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;
  return { day, month, dates, hours, minutes };
}

function searchCity(city) {
  let apiKey = "23f637abfo873tabebce0c6ec924c841";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Amsterdam");
