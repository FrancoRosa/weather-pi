# Weather Pi
> Weather and forecast monitor. 
The purpose of this project is to retrive weather alerts from OpenWeather and Weather.gov, then make this data easily available from other applications.

It was designed with RPi on mind but it can work on any computer

## How it works?

### Visualization Only

1. Go to https://weather-rpi.web.app/ then go to the location tab and select the location you want to see the weather, forecast and alerts.

### Make data available for other applications or scripts

1. Install a redis server on your device (PC or RPi) https://redis.io/, if you are using a RPi, you only neet to run the following commands
```bash
sudo apt-get update
sudo apt-get install redis
```
2. You need to install a flask server to listen from https://weather-rpi.web.app/ and save data on your local redis. Copy the ```rpi/flask_server.py``` file from this repo to ```/home/pi/flask_server.py```, since this script will run on background install the required modules with sudo privilegies.
```bash
sudo pip install flask-cors redis
```
3. Start the server from boot, for this task, you need to open the /etc/rc.local file with the command shown bellow.
```bash
sudo nano /etc/rc.local
```
there, before the ```exit 0``` instruction, add the following 
```bash
# Start flask_server once the system has started
python /home/pi/flask_server.py &
```
Now press `Ctrl+o` to save and `Ctrl+x` to exit. From now your server file will start automatically from the next boot.
4. If the flask_server is working correctly the raspberry icon on the botom rigth of the weather-rpi.web.app will turn from red to green.
5. If you want to see the data saved on the RPi, use the following commands
 ```bash
redis-cli     #to open the redis client on terminal
KEYS *        #to see available data
GET location  #to get location related data
GET current   #to get current conditions related data
```
### Control the GPIO based on a weather alert
You can use your prefered library (maybe this: https://gpiozero.readthedocs.io/) to control the GPIO based on alerts, for instance if there is a 'Watch' or 'Warning' on the alert headline, you can directly use the 'gpio' value saved on redis to change the state of outputs, like this:

```python
from gpiozero import LED
from time import sleep
import redis
import json

watch_led = LED(17)    # declare GPIO17 as output
warning_led = LED(27)  # declare GPIO27 as output

r = redis.Redis(host='localhost', port=6379, db=0) # connect to redis
while True:
  status_text = r.get('gpio')                                 #get data saved on gpio
  status = json.loads(status)                                 #make a dictionary from saved text
  watch_led.on() if status['watchio'] else watch_led.off()       #Turn led on or off based on the watchio key status
  warning_led.on() if status['warningio'] else warning_led.off() #Turn led on or off based on the watchio key status
  sleep(1)                                                       # Wait a while to avoid overloading the RPi
```

You can save this script then make it run as a service, adding ```python /home/pi/script.py``` to the ```/etc/rc.local``` similary as we did to run our flask server from boot.


