const button = document.getElementById("get-weather-btn");
const citySelect = document.getElementById("city-select");
const weatherContainer = document.getElementById("weather-container");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");

/* async getWeather function */
async function getWeather(city) {
  try {
    const response = await fetch(
      `https://weather-proxy.freecodecamp.rocks/api/city/${city}`,
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/* async showWeather function */
async function showWeather(city) {
  // Reset UI state
  errorMessage.classList.add("hidden");
  weatherContainer.classList.add("hidden");

  // Show loading
  loading.classList.remove("hidden");
  button.disabled = true;

  const data = await getWeather(city);

  // Stop loading
  loading.classList.add("hidden");
  button.disabled = false;

  if (!data) {
    errorMessage.textContent = "Something went wrong, please try again later.";
    errorMessage.classList.remove("hidden");
    return;
  }

  // Show card
  weatherContainer.classList.remove("hidden");

  document.getElementById("location").textContent = data.name || "N/A";
  document.getElementById("weather-main").textContent =
    data.weather?.[0]?.main || "N/A";

  document.getElementById("weather-icon").src = data.weather?.[0]?.icon || "";

  document.getElementById("main-temperature").textContent =
    data.main?.temp ?? "N/A";

  document.getElementById("feels-like").textContent =
    data.main?.feels_like ?? "N/A";

  document.getElementById("humidity").textContent =
    data.main?.humidity ?? "N/A";

  document.getElementById("wind").textContent = data.wind?.speed ?? "N/A";

  document.getElementById("wind-gust").textContent = data.wind?.gust ?? "N/A";
}

// Button Event
button.addEventListener("click", () => {
  const selectedCity = citySelect.value;

  // If no city selected → do nothing
  if (!selectedCity) return;

  showWeather(selectedCity);
});
