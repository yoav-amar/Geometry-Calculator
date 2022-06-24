from flask import Flask, render_template, redirect, request, session, url_for, jsonify
from solving_algorithm import solve
from flask_session import Session
import backend.db.users_manager as users_manager
import backend.exceptions as exceptions
import backend.db.gang_manager as gang_manager
import json

HTTP_OK = 200
HTTP_BAD = 400
HTTP_DUPLICATE = 409
question_pool_code = 0

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.route('/')
def home_page():
    username = session.get("username")
    password = session.get("password")

    if not username or not password:
        return redirect(url_for("sign_in"))

    return render_template("index.html")


@app.route('/calculator')
def calculator_page():
    return render_template("calculator.html")


@app.route('/calculator', methods=['POST'])
def calculator_page_with_problem_to_load():
    return render_template("calculator.html", problem=request.form['problem'])


@app.route('/present_problem/<gang_id>', methods=['POST'])
def present_problem(gang_id):
    return render_template("present_problem.html", problem=request.form['problem'], is_admin=request.form['is_admin'],
                           gang_id=gang_id, problem_name=request.form['problem_name'])


@app.route('/calculator/<gang_id>', methods=['POST'])
def calculator_page_for_gang_problem(gang_id):
    print(request.form.get('problem'))
    return render_template("calculator.html", problem=request.form.get('problem'), gang_id=gang_id)


@app.route('/calculator/<gang_id>', methods=['GET'])
def calculator_page_for_gang_problem_get(gang_id):
    return render_template("calculator.html", gang_id=gang_id)


@app.route('/my_history')
def my_history_page():
    username = session.get("username")
    password = session.get("password")
    if not username or not password:
        return "not found", HTTP_BAD
    history_code = users_manager.get_history(username, password)
    return problems_page(history_code)


@app.route('/solution', methods=['POST'])
def solution_page():
    print(request.form)
    solution = request.form['solution']
    drawing = request.form['drawing']
    return render_template("solution.html", solution=solution, drawing=drawing)


def list_str_to_list_json(list_str):
    for i in range(0, len(list_str)):
        list_str[i] = json.loads(list_str[i])


@app.route('/calculator/solve', methods=['POST'])
def calculator_solve():
    problem = request.get_json()['problem']

    list_str_to_list_json(problem['data']['givenData'])
    list_str_to_list_json(problem['data']['proofData'])
    print(problem)
    return jsonify(solve(problem))


@app.route('/calculator/save', methods=['POST'])
def calculator_save():
    try:
        username = session.get("username")
        password = session.get("password")
        if not username or not password:
            return "not found", HTTP_BAD
        req = request.get_json()
        problem = req['problem']
        problem_name = req["problem_name"]
        print(problem)
        # list_str_to_list_json(problem['data']['givenData'])
        # list_str_to_list_json(problem['data']['proofData'])
        gang_code = req.get("gang_code")
        if not gang_code or gang_code == "" or gang_code == "0":
            gang_code = users_manager.get_history(username, password)
        gang_manager.add_problem(gang_code, username, password, problem_name, problem)
        if users_manager.is_auto_share(username, password):
            gang_manager.add_problem(question_pool_code, username, password, problem_name, problem)
        return 'הבעיה נשמרה', HTTP_OK
    except Exception as e:
        return str(e), HTTP_BAD


@app.route('/settings', methods=["GET"])
def setting_page():
    try:
        if not session['username'] or not session['password']:
            return redirect(url_for("sign_in"))
        return render_template("settings.html")
    except KeyError:
        return redirect(url_for("sign_in"))


@app.route('/my_gangs')
def my_gangs_page():
    username = session.get("username")
    password = session.get("password")
    if not username or not password:
        return redirect(url_for("sign_in"))
    return render_template("my_gangs.html")


@app.route('/problems/<gang_code>', methods=["GET"])
def problems_page(gang_code):
    username = session.get("username")
    password = session.get("password")
    try:
        if username and password and gang_manager.is_user_in_gang(gang_code, username, password):
            # check if user in gang
            # need to send gang as parameter
            is_admin, gang_name = gang_manager.get_gang_name(username, password, gang_code)
            return render_template("problems.html", gang_name=gang_name, gang_code=gang_code,
                                   is_admin=json.dumps(is_admin))
        return "not found", HTTP_BAD
    except Exception as e:
        return str(e), HTTP_BAD


@app.route('/change_field', methods=["POST"])
def change_field():
    req = request.get_json()
    username = session['username']
    password = session['password']
    field = req["field"]
    new_val = req["new_val"]
    try:
        users_manager.change_field(username, password, field, new_val)
    except Exception as e:
        return str(e), HTTP_BAD
    return "OK", HTTP_OK


@app.route('/logout')
def logout():
    session['username'] = None
    session['password'] = None

    return redirect(url_for("sign_in"))


@app.route('/sign_up', methods=["POST", "GET"])
def sign_up():
    if request.method == "POST":
        req = request.get_json()
        username = req['username']
        password = req['password']
        email = req['email']
        auto_share = req['auto_share']
        if type(username) != str or type(password) != str or type(email) != str or type(auto_share) != bool:
            return "all types should be strings", HTTP_BAD
        try:
            users_manager.add_user(username, password, email, auto_share)
            session['username'] = username
            session['password'] = password
            history_name = "ההיסטוריה של: " + username
            gang_code = gang_manager.add_gang(history_name, username, password)
            users_manager.add_history(username, password, gang_code)
            users_manager.add_gang(username, password, gang_code, history_name)
            users_manager.add_gang(username, password, question_pool_code, "מאגר שאלות עולמי")
            gang_manager.add_member_to_gang(question_pool_code, username, password)
            return "OK", HTTP_OK
        except exceptions.UserExists as e:
            return str(e), HTTP_DUPLICATE
        except Exception as o:
            return str(o), HTTP_DUPLICATE
    else:  # get request
        username = session.get("username")
        password = session.get("password")
        if username or password:  # already connected
            return redirect('/')
        return render_template("/sign_up.html")


@app.route('/sign_in', methods=["POST", "GET"])
def sign_in():
    if request.method == "POST":
        req = request.get_json()
        username = req["username"]
        password = req["password"]
        if type(username) != str or type(password) != str:
            return "all types should be strings", HTTP_BAD
        try:
            users_manager.is_user_ok(username, password)
            session['username'] = username
            session['password'] = password
            return "OK", HTTP_OK
        except Exception:
            return "שם המשתמש או סיסמא לא נכונים", HTTP_BAD

    # GET request
    username = session.get("username")
    password = session.get("password")
    if username or password:  # already connected
        return redirect('/')
    return render_template("/sign_in.html")


@app.route('/delete_user', methods=["DELETE"])
def delete_user():
    try:
        username = session['username']
        password = session['password']
        users_manager.delete_user(username, password)
        logout()
        return "OK", HTTP_OK
    except exceptions.UserNotFound as e:
        return str(e), HTTP_BAD
    except Exception as o:
        return str(o), HTTP_BAD


@app.route('/get_gangs', methods=["GET"])
def get_gangs():
    username = session.get("username")
    password = session.get("password")
    if not password or not username:
        return "חייבים להיות מחוברים לפני", HTTP_BAD
    try:
        gangs_codes = users_manager.get_gangs(username, password)
        return jsonify(gangs_codes), HTTP_OK
    except Exception as e:
        return str(e), HTTP_BAD


@app.route('/join_gang', methods=["POST"])
def join_gangs():
    username = session.get("username")
    password = session.get("password")
    req = request.get_json()
    gang_code = req["gang_code"]
    if not username or not password:
        return "חייבים להיות מחוברים לפני", HTTP_BAD
    try:
        gang_name = gang_manager.add_member_to_gang(gang_code, username, password)
        users_manager.add_gang(username, password, gang_code, gang_name)
        return "OK", HTTP_OK
    except Exception as e:
        return str(e), HTTP_BAD


@app.route('/create_gang', methods=["POST"])
def create_gang():
    username = session.get("username")
    password = session.get("password")
    if not password or not username:
        return "חייבים להיות מחוברים לפני", HTTP_BAD
    try:
        req = request.get_json()
        gang_name = req["gang_name"]
        gang_code = gang_manager.add_gang(gang_name, username, password)
        users_manager.add_gang(username, password, gang_code, gang_name)
        return "OK", HTTP_OK
    except Exception as e:
        return str(e), HTTP_BAD


@app.route('/get_problem', methods=["GET"])
def get_problem():
    username = session.get("username")
    password = session.get("password")
    gang_code = request.args.get("gang_code")
    problem_name = request.args.get("problem_name")
    try:
        if username and password and gang_manager.is_user_in_gang(gang_code, username, password):
            problem, solutions = gang_manager.get_problem(gang_code, problem_name, username, password)
            return json.dumps(problem), HTTP_OK
        return "not found", HTTP_BAD
    except Exception as e:
        return str(e), HTTP_BAD


@app.route('/problem', methods=["POST"])
def get_problem_page():
    gang_code = request.form["gang_code"]
    problem_name = request.form["problem_name"]
    username = session.get("username")
    password = session.get("password")
    try:
        if username and password and gang_manager.is_user_in_gang(gang_code, username, password):
            problem, solutions = gang_manager.get_problem(gang_code, problem_name, username, password)
            is_admin, gang_name = gang_manager.get_gang_name(username, password, gang_code)
            return render_template("/problem.html",
                                   gang_code=gang_code, problem_name=problem_name, is_admin=json.dumps(is_admin),
                                   solutions_names=json.dumps(list(solutions)))
        return "not found", HTTP_BAD
    except Exception as e:
        return str(e), HTTP_BAD


@app.route('/problems_names')
def get_problems_names():
    username = session.get("username")
    password = session.get("password")
    gang_code = request.args.get("gang_code")
    try:
        if username and password and gang_manager.is_user_in_gang(gang_code, username, password):
            names = list(gang_manager.get_problems_names(gang_code, username, password))
            return jsonify(names), HTTP_OK
        return "not found", HTTP_BAD
    except Exception as e:
        return str(e), HTTP_BAD


@app.route("/get_solution", methods=["GET"])
def get_solution():
    username = session.get("username")
    password = session.get("password")
    gang_code = request.args.get("gang_code")
    problem_name = request.args.get("problem_name")
    solution_name = request.args.get("solution_name")
    try:
        if username and password and gang_manager.is_user_in_gang(gang_code, username, password):
            solution = gang_manager.get_solution(gang_code, username, password, problem_name, solution_name)
            return solution, HTTP_OK
        return "not found", HTTP_BAD
    except Exception as e:
        return str(e), HTTP_BAD


@app.route("/add_solution", methods=["POST"])
def add_solution():
    req = request.get_json()
    username = session.get("username")
    password = session.get("password")
    gang_code = req.get("gang_code")
    problem_name = req.get("problem_name")
    solution_name = req.get("solution_name")
    solution = req.get("solution")
    try:
        if username and password and gang_code and problem_name and solution_name and solution \
                and gang_manager.is_user_in_gang(gang_code, username, password):
            gang_manager.add_solution(gang_code, username, password, problem_name, solution_name, solution)
            return "OK", HTTP_OK
        return "not found", HTTP_BAD
    except Exception as e:
        return str(e), HTTP_BAD


@app.route("/delete_problem", methods=["DELETE"])
def delete_problem():
    username = session.get("username")
    password = session.get("password")
    req = request.get_json()
    gang_code = req.get("gang_code")
    problem_name = req.get("problem_name")
    try:
        if username and password and gang_code and problem_name and gang_manager.is_user_in_gang(gang_code, username,
                                                                                                 password):
            gang_manager.remove_problem(gang_code, username, password, problem_name)
            return "OK", HTTP_OK
        return "not found", HTTP_BAD
    except Exception as e:
        return str(e), HTTP_BAD


@app.route("/delete_solution", methods=["DELETE"])
def delete_solution():
    username = session.get("username")
    password = session.get("password")
    req = request.get_json()
    gang_code = req.get("gang_code")
    problem_name = req.get("problem_name")
    solution_name = req.get("solution_name")
    try:
        if username and password and gang_code and problem_name and gang_manager.is_user_in_gang(gang_code, username,
                                                                                                 password):
            gang_manager.remove_solution(gang_code, username, password, problem_name, solution_name)
            return "OK", HTTP_OK
        return "not found", HTTP_BAD
    except Exception as e:
        return str(e), HTTP_BAD


@app.route("/remove_user_from_gang", methods=["DELETE"])
def remove_user_from_gang():
    username = session.get("username")
    password = session.get("password")
    req = request.get_json()
    gang_code = req.get("gang_code")
    try:
        if username and password and gang_code and gang_manager.is_user_in_gang(gang_code, username,
                                                                                password):
            gang_manager.remove_member_from_gang(gang_code, username, password)
            users_manager.remove_gang(username, password, gang_code)
            return "OK", HTTP_OK
        return "not found", HTTP_BAD
    except Exception as e:
        return str(e), HTTP_BAD


if __name__ == '__main__':
    with open("backend/db/one_time_config.json", "r") as file:
        config = json.load(file)
        password = config["password"]
        username = config["username"]
        email = config["email"]
        auto_share = config["auto_share"]
    try:
        users_manager.add_user(username, password, email, auto_share)
        question_pool_code = gang_manager.add_gang("מאגר שאלות עולמי", username, password)
        users_manager.add_gang(username, password, question_pool_code, "מאגר שאלות עולמי")
    except Exception:
        pool_gangs = users_manager.get_gangs(username, password)
        question_pool_code = list(pool_gangs.keys()).pop()

    app.run()
