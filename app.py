from flask import Flask, render_template, request
import json

app = Flask(__name__)

@app.route("/")
def start():
    return render_template("index.html")

@app.route("/game")
def game():
    return render_template("game.html")

@app.route("/finish")
def finish():
    guesses = request.args.get("guesses")
    time = request.args.get("time")
    result = request.args.get("result")
    correctClassroom = request.args.get("correctClassroom")
    guessed_raw = request.args.get("guessedClassrooms")
    guessedClassrooms = []
    if guessed_raw:
        try:
            guessedClassrooms = json.loads(guessed_raw)
        except Exception:   
            # fallback: comma-separated list
            guessedClassrooms = guessed_raw.split(',') if guessed_raw else []

    return render_template("finish.html", guesses=guesses, time=time, result=result, guessedClassrooms=guessedClassrooms, correctClassroom=correctClassroom)


if __name__ == "__main__":
    app.run(debug=True)
