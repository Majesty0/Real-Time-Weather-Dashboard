# Real-Time-Weather-Dashboard

Real-time weather from OpenWeather visualized under Temperature, Atmospheric Pressure, and Humidity for any city around the world.

## Features

- Search weather by city name
- Real-time current metrics:
  - Temperature
  - Atmospheric Pressure
  - Humidity
- Forecast-based summary cards:
  - Average temperature
  - Highest temperature
  - Temperature increase across forecast window
- Trend visualizations for temperature, pressure, and humidity
- Interactive city map (OpenStreetMap)

## Run locally

Because this is a static dashboard, you can run a simple local server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## OpenWeather setup

1. Create an API key from https://openweathermap.org/api
2. Paste the API key into the dashboard input.
3. Enter any city and click **Load Weather**.
