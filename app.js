// Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
const apiKey = 'b1834992aaffb2296d4fb86ffa8f0be8';
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weather-icon');

function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const location = data.name;
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;

      locationElement.textContent = location;
      temperatureElement.textContent = `${temperature}°C`;
      descriptionElement.textContent = description;
      weatherIconElement.src = `http://openweathermap.org/img/w/${iconCode}.png`;
    })
    .catch(error => {
      console.log('Error fetching weather data:', error);
    });
}

function handleSearch() {
  const city = cityInput.value.trim();

  if (city !== '') {
    fetchWeatherData(city);
    cityInput.value = '';
  }
}

searchButton.addEventListener('click', handleSearch);
cityInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});
