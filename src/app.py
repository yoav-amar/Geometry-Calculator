from flask import Flask, render_template, redirect, request, session, url_for, jsonify
from flask_session import Session
import backend.db.users_manager as users_manager
import backend.exceptions as exceptions
import backend.db.gang_manager as gang_manager
import json

HTTP_OK = 200
HTTP_BAD = 400
HTTP_DUPLICATE = 409

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


@app.route('/')
def home_page():
    return render_template("index.html")


@app.route('/calculator')
def calculator_page():
    return render_template("calculator.html")


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


@app.route('/problems/<gang_name>', methods=["GET"])
def problems_page(gang_name):
    username = session.get("username")
    password = session.get("password")
    try:
        if username and password and gang_manager.is_user_in_gang(gang_name, username, password):
            # check if user in gang
            # need to send gang as parameter
            gang_code = gang_manager.get_gang_code(username, password, gang_name)
            return render_template("problems.html", gang_name=gang_name, gang_code=gang_code)
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
        gangs = users_manager.get_gangs(username, password)
        print(gangs)
        return jsonify(gangs), HTTP_OK
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
        gang_name = gang_manager.add_member_to_gang(
            gang_code, username, password)
        users_manager.add_gang(username, password, gang_name)
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
        gang_manager.add_gang(gang_name, username, password)
        users_manager.add_gang(username, password, gang_name)
        return "OK", HTTP_OK
    except Exception as e:
        return str(e), HTTP_BAD


@app.route('/get_problems', methods=["GET"])
def get_problems():
    username = session.get("username")
    password = session.get("password")
    gang_name = request.args.get("gang_name")
    problem_name = request.args.get("problem_name")
    try:
        if username and password and gang_manager.is_user_in_gang(gang_name, username, password):
            problem = gang_manager.get_problem(
                gang_name, problem_name, username, password)
            return problem, HTTP_OK
        return "not found", HTTP_BAD
    except Exception as e:
        return str(e), HTTP_BAD


@app.route('/problems_names', methods=["GET"])
def get_problems_names():
    username = session.get("username")
    password = session.get("password")
    gang_name = request.args.get("gang_name")
    try:
        if username and password and gang_manager.is_user_in_gang(gang_name, username, password):
            names = list(gang_manager.get_problems_names(
                gang_name, username, password))
            return jsonify(names), HTTP_OK
        return "not found", HTTP_BAD
    except Exception as e:
        return str(e), HTTP_BAD


@app.route('/problems/<gang_name>/<problem_name>')
def get_problem(gang_name, problem_name):
    username = session.get("username")
    password = session.get("password")
    try:
        if username and password and gang_manager.is_user_in_gang(gang_name, username, password):
            problem, solutions = gang_manager.get_problem(gang_name, problem_name, username, password)
            return render_template("/problem.html",
                                   gang_name=gang_name, problem_name=problem_name,
                                   solutions_names=json.dumps(list(solutions)))
        return "not found", HTTP_BAD
    except Exception as e:
        return str(e), HTTP_BAD


@app.route("/get_solution", methods=["GET"])
def get_solution():
    username = session.get("username")
    password = session.get("password")
    gang_name = request.args.get("gang_name")
    problem_name = request.args.get("problem_name")
    solution_name = request.args.get("solution_name")
    try:
        if username and password and gang_manager.is_user_in_gang(gang_name, username, password):
            solution = gang_manager.get_solution(gang_name, username, password, problem_name, solution_name)
            return solution, HTTP_OK
        return "not found", HTTP_BAD
    except Exception as e:
        return str(e), HTTP_BAD


if __name__ == '__main__':
    app.run()
