import * as ELEMENTS from "./elements.js";
import { Http } from "./http.js";
import { Weather, handlerProxy } from "./weather.js";
const API_KEY = "dd29990a202b7d6bbb7d0674f86adbf8";
ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener("click", searchWeather);

function searchWeather() {
  const NAME_CITY = ELEMENTS.ELEMENT_SEARCH_CITY.value;
  if (NAME_CITY.length == 0)
    ELEMENTS.ELEMENT_SEARCH_CITY.classList.add("valid");
  else {
    ELEMENTS.ELEMENT_SEARCH_CITY.classList.remove("valid");
    ELEMENTS.ELEMENT_SEARCH_LOADING.style.display = "block";
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = "none";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${NAME_CITY}&units=metric&appid=${API_KEY}`;
    Http.request(URL)
      .then(data => {
        const weatherData = new Weather(
          NAME_CITY,
          data.weather[0].description.toUpperCase()
        );
        const weatherProxy = new Proxy(weatherData, handlerProxy);
        weatherProxy.temperature = data.main.temp;
        updateWeahter(weatherProxy);
        ELEMENTS.ELEMENT_SEARCH_LOADING.style.display = "none";
      })
      .catch(error => {
        console.log(error);
      });
  }
}

function updateWeahter(weatherData) {
  ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.nameCity.toUpperCase();
  ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
  ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent =
    weatherData.temperature + "C";
  console.log(ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent);
  ELEMENTS.ELEMENT_WEATHER_BOX.style.display = "flex";
}
