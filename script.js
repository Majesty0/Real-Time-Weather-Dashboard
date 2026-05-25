const elements = {
  apiKey: document.getElementById("apiKey"),
  city: document.getElementById("city"),
  searchBtn: document.getElementById("searchBtn"),
  status: document.getElementById("status"),
  temperatureValue: document.getElementById("temperatureValue"),
  pressureValue: document.getElementById("pressureValue"),
  humidityValue: document.getElementById("humidityValue"),
  avgTemp: document.getElementById("avgTemp"),
  maxTemp: document.getElementById("maxTemp"),
  tempIncrease: document.getElementById("tempIncrease"),
  tempChart: document.getElementById("tempChart"),
  pressureChart: document.getElementById("pressureChart"),
  humidityChart: document.getElementById("humidityChart")
};

let map = null;
let marker = null;

if (window.L) {
  map = L.map("map").setView([20, 0], 2);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);
  marker = L.marker([20, 0]).addTo(map);
} else {
  setStatus("Map library could not be loaded in this environment.", true);
}

function setStatus(message, isError = false) {
  elements.status.textContent = message;
  elements.status.style.color = isError ? "#fca5a5" : "#93c5fd";
}

function drawLineChart(canvas, labels, values, color) {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  if (!values.length) return;

  const padding = 26;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  ctx.strokeStyle = "#334155";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  const divisor = Math.max(values.length - 1, 1);

  values.forEach((value, i) => {
    const x = padding + (i / divisor) * (width - padding * 2);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  ctx.fillStyle = "#94a3b8";
  ctx.font = "11px sans-serif";
  ctx.fillText(labels[0] || "", padding, height - 8);
  ctx.fillText(labels[labels.length - 1] || "", width - padding - 38, height - 8);
}

function computeMetrics(forecastList) {
  const temps = forecastList.map((entry) => entry.main.temp);
  if (!temps.length) {
    return { average: 0, highest: 0, delta: 0 };
  }

  const average = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
  const highest = Math.max(...temps);
  const delta = temps[temps.length - 1] - temps[0];

  return { average, highest, delta };
}

async function fetchJson(url) {
  const response = await fetch(url);
  const raw = await response.text();
  let data = null;
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || "Unable to fetch weather data.");
  }

  return data;
}

async function loadWeather() {
  const apiKey = elements.apiKey.value.trim();
  const city = elements.city.value.trim();

  if (!apiKey || !city) {
    setStatus("Please provide both API key and city name.", true);
    return;
  }

  setStatus("Loading weather data...");

  try {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
      city
    )}&limit=1&appid=${apiKey}`;
    const geo = await fetchJson(geoUrl);

    if (!geo.length) {
      throw new Error("City not found.");
    }

    const { lat, lon, name, country } = geo[0];
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    const [weather, forecast] = await Promise.all([fetchJson(weatherUrl), fetchJson(forecastUrl)]);

    elements.temperatureValue.textContent = `${weather.main.temp.toFixed(1)} °C`;
    elements.pressureValue.textContent = `${weather.main.pressure} hPa`;
    elements.humidityValue.textContent = `${weather.main.humidity} %`;

    const forecastList = Array.isArray(forecast.list) ? forecast.list : [];
    const metrics = computeMetrics(forecastList);
    elements.avgTemp.textContent = `${metrics.average.toFixed(1)} °C`;
    elements.maxTemp.textContent = `${metrics.highest.toFixed(1)} °C`;
    elements.tempIncrease.textContent = `${metrics.delta >= 0 ? "+" : ""}${metrics.delta.toFixed(1)} °C`;

    const labels = forecastList.map((item) =>
      new Date(item.dt * 1000).toLocaleDateString(undefined, { month: "short", day: "numeric" })
    );

    drawLineChart(
      elements.tempChart,
      labels,
      forecastList.map((item) => item.main.temp),
      "#f97316"
    );
    drawLineChart(
      elements.pressureChart,
      labels,
      forecastList.map((item) => item.main.pressure),
      "#60a5fa"
    );
    drawLineChart(
      elements.humidityChart,
      labels,
      forecastList.map((item) => item.main.humidity),
      "#34d399"
    );

    if (marker && map) {
      marker.setLatLng([lat, lon]).bindPopup(`${name}, ${country}`).openPopup();
      map.setView([lat, lon], 9);
    }

    setStatus(`Showing latest weather for ${name}, ${country}.`);
  } catch (error) {
    setStatus(error.message, true);
  }
}

elements.searchBtn.addEventListener("click", loadWeather);
elements.city.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    loadWeather();
  }
});
