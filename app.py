from flask import Flask, render_template, request
from qrcodegen import createQR
import json
import os

if os.path.exists("static/images/qr.png"):
  os.remove("static/images/qr.png")
else:
  pass

createQR()

app = Flask(__name__)

#split /game route into 2: display and control
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/display")
def display():
    return render_template("display.html")

@app.route("/control")
def control():
    return render_template("control.html")

@app.route("/finish")
def finish():
    guesses = request.args.get("guesses")
    time = request.args.get("time")
    result = request.args.get("result")
    correctClassroom = request.args.get("correctClassroom")
    guessed = request.args.get("guessedClassrooms")
    guessedClassrooms = []
    guessedClassrooms = json.loads(guessed)

    return render_template("finish.html", 
        guesses=guesses, 
        time=time, 
        result=result, 
        guessedClassrooms=guessedClassrooms, 
        correctClassroom=correctClassroom)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
