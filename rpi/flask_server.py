import flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
from redis import Redis
import json

r = Redis(host='localhost', port=6379, db=0)
app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
  return "<h1>Server & Redis Works!</h1>"

@app.route('/api/v1/', methods=['POST'])
def api_save_data():
  content = request.get_json()
  print(content)
  key = content['key']
  if r.set(key, json.dumps(content)):
    return jsonify({'message': True})
  return jsonify({'message': False})

app.run(port = 9999);