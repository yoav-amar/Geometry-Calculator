from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def home_page():
    return render_template("index.html")


@app.route('/calculator')
def calculator_page():
    return render_template("calculator.html")


@app.route('/settings')
def setting_page():
    return render_template("settings.html")


if __name__ == '__main__':
    app.run()
