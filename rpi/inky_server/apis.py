from datetime import datetime
from time import sleep, time
import requests
import json

LATITUDE = 38.73121
LONGITUDE = -96.74154
API_KEY_OPENWEATHER = '37fe7dced1adaf904d0ca7f5e66ff95b'
UNSPLASH_KEY = 'RLzN7LjpiPzG6SPW0QW5IMjZMsoBlOP_7K_uXtpZ75A'
UNSPLASH_SECRET = 'ICrB54iYe3LHbd2_6LfMlOhcrRUvXbEtuoY4TZYOW3A'

current = {}
forecast = {}
alerts = {}
now = datetime.now()

def get_current_conditions(latitude, longitude, api_key):
  open_weather_url = 'https://api.openweathermap.org/data/2.5/onecall?'
  url_params = 'lat=%d&lon=%d&exclude=daily,hourly,minutely&appid=%s&units=imperial'%(latitude, longitude, api_key)
  final_url = open_weather_url + url_params
  response = requests.get(final_url)
  json_response = response.json()
  return json_response

def get_forecast_url_and_county_code(latitude, longitude):
  weather_gov_url = 'https://api.weather.gov/points/%s,%s'%(latitude, longitude)
  response = requests.get(weather_gov_url)
  json_response = response.json()
  forecast_url = json_response['properties']['forecast']
  county_code = json_response['properties']['county'].split('/')[-1]
  return [forecast_url, county_code]

def get_forecast(forecast_url):
  response = requests.get(forecast_url)
  json_response = response.json()
  return json_response

def get_alerts(county_code):
  alerts_url = 'https://api.weather.gov/alerts/active/zone/%s'%county_code
  response = requests.get(alerts_url)
  json_response = response.json()
  return json_response

[forecast_url, county_code] = get_forecast_url_and_county_code(LATITUDE, LONGITUDE)
print('.. url and county', forecast_url, county_code)

def get_data_from_apis():
  global current, forecast, alerts, now
  while True:
    sleep(1)
    now = datetime.now()
    if now.second == 0:
      try:
        print('...fetching api data')
        current = get_current_conditions(LATITUDE, LONGITUDE, API_KEY_OPENWEATHER)
        forecast = get_forecast(forecast_url)
        alerts = get_alerts(county_code)
      except:
        pass