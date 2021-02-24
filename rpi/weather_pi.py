from time import sleep
import requests
import json
#Get data from OpenWeather for current values
#Get data from weather.gov forecast
#Get data from weather.gov alerts
LATITUDE = 38.73121
LONGITUDE = -96.74154
API_KEY = '37fe7dced1adaf904d0ca7f5e66ff95b'

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
  print('>>>>>>>>> county:')
  county_code = json_response['properties']['county'].split('/')[-1]
  print(county_code)
  return [forecast_url, county_code]

def get_forecast(forecast_url):
  response = requests.get(forecast_url)
  json_response = response.json()
  return json_response

def get_alerts(forecast_url):
  return 0

print('>>>>>>>')
[forecast_url, county_code] = get_forecast_url_and_county_code(LATITUDE, LONGITUDE)
# get_forecast(forecast_url)
  
# print(json.dumps(json_response, indent=4))
