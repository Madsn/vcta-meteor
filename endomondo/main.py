from endomondo import Endomondo
from flask import Flask, request

app = Flask(__name__)

@app.route("/", methods = ['POST'])
def getWorkouts():
  password = request.form["password"]
  username = request.form["username"]
  print username
  print password
  endomondo = Endomondo(username, password)
  workouts = endomondo.workout_list()
  ret = ""
  for w in workouts:
    print w.data
    if hasattr(w, "distance_km"):
      ret += w.data["distance_km"] + " - " + w.data["start_time"]
    else:
      print "no distance_km attribute"
  print ret
  return ret

if __name__ == "__main__":
  app.run()
