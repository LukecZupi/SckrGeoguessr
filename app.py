from flask import Flask, render_template, request
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
    return render_template("finish.html", guesses=guesses, time=time, result=result)


if __name__ == "__main__":
    app.run(debug=True)