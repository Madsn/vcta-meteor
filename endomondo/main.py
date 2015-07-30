from endomondo import Endomondo
import json
from flask import Flask, request

app = Flask(__name__)

@app.route('/', methods = ['POST'])
def getWorkouts():
  password = request.form['password']
  username = request.form['username']
  print username
  print password
  endomondo = Endomondo(username, password)
  workouts = endomondo.workout_list()
  ret = []
  for w in workouts:
    if 'distance_km' in w.data and 'start_time' in w.data:
      ret.append({'id': w.data['id'],
                  'start_time': w.data['start_time'],
                  'distance_km': w.data['distance_km']})
    else:
      print 'no distance_km attribute'
  retJson = json.dumps(ret)
  print retJson
  if len(ret) == 0:
    return ret, 204 # 204 - No content
  else:
    return retJson, 200

if __name__ == '__main__':
  app.run(debug=True)
