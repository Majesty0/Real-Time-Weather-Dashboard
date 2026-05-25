# Real-Time Weather Dashboard

An interactive weather analytics dashboard built in Jupyter Notebook with live data from the OpenWeatherMap API.

It visualizes temperature, humidity, and atmospheric pressure in three clear charts, shows a city location map, includes hover tooltips for exact values, and adds a short insight panel to summarize the live weather conditions.

## Features

- Live OpenWeatherMap integration for any city
- Three separate charts for temperature, humidity, and pressure
- Interactive hover tooltips with exact values and timestamps
- Four summary cards for key temperature insights
- City location map pulled from the API response
- Clean dark dashboard interface with an eye-catching header
- Notebook-based workflow that is easy to extend for class work or demos

## Dashboard Preview

The notebook includes:

- a quick insight paragraph that explains the current pattern
- summary cards for highest temperature, lowest temperature, average temperature, and temperature change
- a location map for the selected city
- charts that support line, bar, area, and scatter views

## Tech Stack

- Python
- Pandas
- Requests
- Plotly
- ipywidgets
- Jupyter Notebook

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Majesty0/Real-Time-Weather-Dashboard.git
cd Real-Time-Weather-Dashboard
```

### 2. Install dependencies

If you are using a virtual environment, activate it first, then install the packages:

```bash
pip install -r requirements.txt
```

### 3. Add your OpenWeatherMap API key

The notebook can read the API key from the input field or from an environment variable named `OPENWEATHERMAP_API_KEY`.

Example on Windows PowerShell:

```powershell
$env:OPENWEATHERMAP_API_KEY="your_api_key_here"
```

### 4. Open the notebook

Launch Jupyter and open:

`API Weather DAta Modeling.ipynb`

## How to Use

1. Enter a city name.
2. Paste your OpenWeatherMap API key.
3. Click **Load Weather Data**.
4. Switch between Line, Bar, Area, and Scatter views.

The dashboard will then render the live weather charts, the city map, the summary cards, and the insight section.

## Files

- `API Weather DAta Modeling.ipynb` - main interactive dashboard notebook
- `requirements.txt` - Python dependencies for the notebook
- `.gitignore` - ignores notebook and Python cache clutter

## Notes

- The OpenWeatherMap forecast endpoint returns a short forecast window, not full monthly history.
- The dashboard therefore summarizes the returned forecast period and uses the start-to-end temperature change as the temperature movement card.
- If your API key is rejected, verify that it is active in your OpenWeatherMap account.

## License

No license has been added yet. Add one if you plan to share or reuse the project publicly.
