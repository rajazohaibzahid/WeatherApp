const container = document.querySelector(".container");
const searchButton = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

searchButton.addEventListener("click", () => {
  const APIKey = "61c20b051c1042a339bffbcbc889c40f";
  const cityInput = document.querySelector(".search-box input");
  const city = cityInput.value.trim();

  if (city === "") return;

  fetchWeatherData(APIKey, city)
    .then((data) => handleWeatherData(data))
    .catch((error) => handleWeatherError(error));
});

async function fetchWeatherData(APIKey, city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
  );
  return response.json();
}

function handleWeatherData(data) {
  if (data.cod === "404") {
    showError();
    return;
  }

  hideError();
  updateWeatherUI(data);
}

function handleWeatherError(error) {
  console.error("Error fetching weather data:", error);
  // Handle other types of errors (e.g., network issues) here
}

function showError() {
  container.style.height = "400px";
  weatherBox.style.display = "none";
  weatherDetails.style.display = "none";
  error404.style.display = "block";
  error404.classList.add("fadeIn");
}

function hideError() {
  error404.style.display = "none";
  error404.classList.remove("fadeIn");
}

function updateWeatherUI(data) {
  const image = document.querySelector(".weather-box img");
  const temperature = document.querySelector(".weather-box .temperature");
  const description = document.querySelector(".weather-box .description");
  const humidity = document.querySelector(".weather-details .humidity span");
  const wind = document.querySelector(".weather-details .wind span");

  switch (data.weather[0].main.toLowerCase()) {
    case "clear":
      image.src = "images/clear.png";
      break;

    case "rain":
      image.src = "images/rain.png";
      break;

    case "snow":
      image.src = "images/snow.png";
      break;

    case "clouds":
      image.src = "images/cloud.png";
      break;

    case "haze":
      image.src = "images/mist.png";
      break;

    default:
      image.src = "";
  }

  // Update other UI elements with data properties
  temperature.textContent = `${(data.main.temp - 273.15).toFixed(1)} °C`; // Convert from Kelvin to Celsius
  description.textContent = data.weather[0].description;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed} m/s`;

  weatherBox.style.display = "";
  weatherDetails.style.display = "";
  container.style.height = "590px";
  weatherBox.classList.add("fadeIn");
  weatherDetails.classList.add("fadeIn");
}
