from threading import Thread
from flask import render_template, Flask
import apis

app = Flask(__name__)
app.config["DEBUG"] = True

user = {'username': 'Miguel'}

@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
def index():
  print(apis.current)
  print(apis.forecast)
  print(apis.alerts)
  return render_template('index.html', current=apis.current, forecast=apis.forecast, alerts=apis.alerts)

Thread(target=apis.get_data_from_apis, args=()).start()

app.run(port = 9000)