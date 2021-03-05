from threading import Thread
from flask import render_template, Flask
from json import dumps
import apis

app = Flask(__name__)
app.config["DEBUG"] = True

user = {'username': 'Miguel'}

@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
def index():
  # print(apis.current)
  print(dumps(apis.forecast, indent=4))
  # print(apis.alerts)
  return render_template(
    'index.html',
    current=apis.current,
    forecast=apis.forecast,
    alerts=apis.alerts,
    now=apis.now
  )

Thread(target=apis.get_data_from_apis, args=()).start()

app.run(port = 9000)