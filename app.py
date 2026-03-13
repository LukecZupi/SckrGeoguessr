from flask import Flask, render_template, request
from qrcodegen import createQR
import json
import os
import random

if os.path.exists("static/images/qr.png"):
    os.remove("static/images/qr.png")

current_classroom = None
createQR()

app = Flask(__name__)


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
    correct_classroom = request.args.get("correctClassroom")

    guessed = request.args.get("guessedClassrooms")
    guessed_classrooms = json.loads(guessed)

    return render_template(
        "finish.html",
        guesses=guesses,
        time=time,
        result=result,
        guessedClassrooms=guessed_classrooms,
        correctClassroom=correct_classroom
    )


@app.route("/random-classroom")
def get_random_classroom():

    classrooms = [
        "246","275","284","278","262","knjižnica","263","fablab","274",
        "269","264","266","268","253","240","242","244","245",
        "259","267","282","241","289","261"
    ]

    random_classroom = random.choice(classrooms)
    return random_classroom


@app.route("/set-classroom", methods=["POST", "GET"])
def set_classroom():

    global current_classroom
    current_classroom = request.form.get("value")

    print("SET CLASSROOM:", current_classroom)

    return current_classroom


@app.route("/get-classroom", methods=["POST", "GET"])
def get_classroom():

    global current_classroom
    print("RETURN CLASSROOM:", current_classroom)

    return current_classroom


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)