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

/* Temperature Count-Up */
function animateTemperature(element, finalValue) {
  let start = 0;
  const duration = 800;
  const increment = finalValue / (duration / 16);

  const counter = setInterval(() => {
    start += increment;

    if (start >= finalValue) {
      element.textContent = finalValue.toFixed(1);
      clearInterval(counter);
    } else {
      element.textContent = start.toFixed(1);
    }
  }, 16);
}

/* Function displayWeather */
function displayWeather(data) {
  if (!data) {
    errorMessage.textContent = "Something went wrong, please try again later.";
    errorMessage.classList.remove("hidden");
    return;
  }

  const weatherType = data.weather?.[0]?.main?.toLowerCase();

  // Reset card
  weatherContainer.className = "weather-card";

  if (weatherType) {
    weatherContainer.classList.add(weatherType);
  } else {
    weatherContainer.classList.add("default");
  }

  // Show card
  weatherContainer.classList.remove("hidden");

  document.getElementById("location").textContent = data.name || "N/A";
  document.getElementById("weather-main").textContent =
    data.weather?.[0]?.main || "N/A";

  document.getElementById("weather-icon").src = data.weather?.[0]?.icon || "";

  const tempElement = document.getElementById("main-temperature");

  if (typeof data.main?.temp === "number") {
    animateTemperature(tempElement, data.main.temp);
  } else {
    tempElement.textContent = "N/A";
  }

  document.getElementById("feels-like").textContent =
    data.main?.feels_like ?? "N/A";
  document.getElementById("humidity").textContent =
    data.main?.humidity ?? "N/A";
  document.getElementById("wind").textContent = data.wind?.speed ?? "N/A";
  document.getElementById("wind-gust").textContent = data.wind?.gust ?? "N/A";
}

/* async showWeather function */
async function showWeather(city) {
  // Reset UI state
  errorMessage.classList.add("hidden");
  weatherContainer.classList.add("hidden");

  weatherContainer.className = "weather-card hidden";

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

  displayWeather(data);

  const weatherType = data.weather?.[0]?.main?.toLowerCase();

  weatherContainer.className = "weather-card"; // reset base class

  if (weatherType) {
    weatherContainer.classList.add(weatherType);
  } else {
    weatherContainer.classList.add("default");
  }

  // Show card
  weatherContainer.classList.remove("hidden");

  document.getElementById("location").textContent = data.name || "N/A";
  document.getElementById("weather-main").textContent =
    data.weather?.[0]?.main || "N/A";

  document.getElementById("weather-icon").src = data.weather?.[0]?.icon || "";

  // Temperature Count-Up
  const tempElement = document.getElementById("main-temperature");

  if (typeof data.main?.temp === "number") {
    animateTemperature(tempElement, data.main.temp);
  } else {
    tempElement.textContent = "N/A";
  }

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

//Use my Location
const myLocationBtn = document.getElementById("my-location-btn");

myLocationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  // Disable buttons while fetching
  button.disabled = true;
  myLocationBtn.disabled = true;
  loading.classList.remove("hidden");
  errorMessage.classList.add("hidden");
  weatherContainer.classList.add("hidden");

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`,
        );

        if (!response.ok) throw new Error("Network error");

        const data = await response.json();

        displayWeather(data); // New helper function
      } catch (err) {
        console.error(err);
        errorMessage.textContent =
          "Something went wrong, please try again later.";
        errorMessage.classList.remove("hidden");
      } finally {
        loading.classList.add("hidden");
        button.disabled = false;
        myLocationBtn.disabled = false;
      }
    },
    (err) => {
      alert("Unable to retrieve your location.");
      button.disabled = false;
      myLocationBtn.disabled = false;
      loading.classList.add("hidden");
    },
  );
});
