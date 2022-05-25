import json
from flask import Flask, render_template, jsonify,  request
from solving_algorithm import solve
app = Flask(__name__)


# @app.route('/')
# def home_page():
#     return render_template("index.html")


# @app.route('/calculator')
@app.route('/')
def calculator_page():
    return render_template("calculator.html")


def list_str_to_list_json(list_str):
    for i in range(0, len(list_str)):
        list_str[i] = json.loads(list_str[i])

@app.route('/calculator/solve', methods=['POST'])
def calculator_solve():
    problem = request.get_json()['problem']

    list_str_to_list_json(problem['data']['givenData'])
    list_str_to_list_json(problem['data']['proofData'])

    print(problem)
    return str(solve(problem))


@app.route('/calculator/save', methods=['POST'])
def calculator_save():
    problem = request.get_json()['problem']

    list_str_to_list_json(problem['data']['givenData'])
    list_str_to_list_json(problem['data']['proofData'])

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
