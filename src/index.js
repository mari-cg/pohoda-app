function refreshWeather(response) {
  let tempValue = document.querySelector(".temp-value");
  //let temperature = response.data.temperature.current;
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
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = `${month} ${dates}, ${hours}:${minutes}`;
  todayElement.innerHTML = day;
  descriptionElement.innerHTML = capitalizedDescriptionElement;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  tempValue.innerHTML = Math.round(response.data.temperature.current);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`;

  getForecast(response.data.city);
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

function getForecast(city) {
  let apiKey = "23f637abfo873tabebce0c6ec924c841";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let days = [`Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="forecast-row">
          <span class="weather-forecast-date">${day}</span>
          <span class="forecast-right">
            <span class="weather-forecast-icon">🌧️</span>
            <span class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature">
                <strong>22°</strong>
              </span>
              /
              <span class="weather-forecast-temperature">15°</span>
            </span>
          </span>
        </div>
`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Amsterdam");
