# Real-Time Weather Dashboard

[![Python](https://img.shields.io/badge/python-3.11-blue)](https://www.python.org/)
[![Jupyter Notebook](https://img.shields.io/badge/notebook-Jupyter-orange?logo=jupyter)](https://jupyter.org/)
[![Plotly](https://img.shields.io/badge/visualization-Plotly-2ecc71?logo=plotly)](https://plotly.com/)
[![Requirements](https://img.shields.io/badge/requirements-requirements.txt-lightgrey)](requirements.txt)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/Majesty0/Real-Time-Weather-Dashboard/HEAD)
[![Voila](https://img.shields.io/badge/launch-voila-blueviolet.svg)](https://mybinder.org/v2/gh/Majesty0/Real-Time-Weather-Dashboard/HEAD?urlpath=voila%2Frender%2FAPI%20Weather%20DAta%20Modeling.ipynb)

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

## Interactive Rendering

The dashboard uses Plotly for interactive charts. To ensure charts render interactively inside your notebook, you can:

- Set the Plotly renderer at runtime in Python (the notebook already sets a sensible default):

```python
import plotly.io as pio
pio.renderers.default = 'notebook_connected'  # or 'jupyterlab' when using JupyterLab
```

- Override the default by exporting the `PLOTLY_RENDERER` environment variable before launching Jupyter:

```powershell
$env:PLOTLY_RENDERER = 'notebook_connected'
jupyter notebook
```

- If inline rendering fails, the notebook will fall back to embedding an interactive HTML version of the chart. You can also manually embed a figure as HTML:

```python
from IPython.display import HTML
HTML(fig.to_html(include_plotlyjs='cdn'))
```

## Running as a Dashboard (Voila)

You can serve the notebook as a standalone interactive dashboard using `voila` (no notebook UI shown). Install `voila` and run:

```bash
pip install -r requirements.txt
voila "API Weather DAta Modeling.ipynb"
```

For JupyterLab users, `jupyterlab` is already in `requirements.txt` — open the notebook in JupyterLab for an improved interactive experience.

## Troubleshooting

- If Plotly charts do not appear, ensure `plotly` and `ipywidgets` are installed and enabled for your Jupyter environment.
- If map tiles appear blank, try setting a Mapbox token:

```python
import os
os.environ['MAPBOX_TOKEN'] = 'your_mapbox_token'
```


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

> **Note:** Power BI Dashboard Link: To be updated when license is renewed.

<div style="border-left:4px solid #2563eb; padding:12px; background:#eff6ff; border-radius:6px; margin-top:12px;">
	<strong>Note:</strong> This project demonstrates live weather visualization using the OpenWeatherMap API and Jupyter notebooks. You can run it locally or on a binder-like service if you provide a working API key.
</div>

<div style="border-left:4px solid #059669; padding:12px; background:#ecfdf5; border-radius:6px; margin-top:12px;">
	<strong>Important:</strong> Do not commit your OpenWeatherMap API key to the repository. Use the `OPENWEATHERMAP_API_KEY` environment variable or enter it into the notebook's secure input field.
</div>

<div style="border-left:4px solid #d97706; padding:12px; background:#fff7ed; border-radius:6px; margin-top:12px;">
	<strong>Warning:</strong> The OpenWeatherMap free tier has rate limits. Avoid rapid automated polling to prevent temporary blocking of your API key.
</div>

## License

No license has been added yet. Add one if you plan to share or reuse the project publicly.

## Example Notebooks

- [Quick Start Guide](notebooks/quick-start.ipynb)
- [Data Fetch Demo (OpenWeatherMap)](notebooks/data-fetch-demo.ipynb)
- [Visualization Examples (Plotly)](notebooks/visualization-examples.ipynb)

  > <img width="1610" height="649" alt="image" src="https://github.com/user-attachments/assets/852250f0-2c3f-4e12-a55b-cbdbab3db66b" />
  > <img width="612" height="848" alt="image" src="https://github.com/user-attachments/assets/5804c987-bee3-430b-a8c0-f4def5893726" />


