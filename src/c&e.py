from flask import Flask, render_template, jsonify,  request

app = Flask(__name__)


# @app.route('/')
# def home_page():
#     return render_template("index.html")
#
#
# @app.route('/calculator')
@app.route('/')
def calculator_page():
    return render_template("calculator.html")


@app.route('/calculator/solve', methods=['POST'])
def calculator_solve():
    problem = request.get_json()['problem']
    print(problem)
    return 'Problem Received'


@app.route('/calculator/save', methods=['POST'])
def calculator_save():
    problem = request.get_json()['problem']
    print(problem)
    return 'Problem Saved'


@app.route('/my_gangs')
def my_gangs_page():
    return render_template("my_gangs.html")


@app.route('/my_history')
def my_history_page():
    return render_template("my_history.html")


@app.route('/settings')
def settings_page():
    return render_template("settings.html")


if __name__ == '__main__':
    app.run()
