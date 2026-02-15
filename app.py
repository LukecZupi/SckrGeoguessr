from flask import Flask, render_template
import os
app = Flask(__name__)
print(os.getcwd())

@app.route("/")
def start():
    return render_template("index.html")

@app.route("/game")
def game():
    return render_template("game.html")

if __name__ == "__main__":
    app.run(debug=True)