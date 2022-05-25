from flask import Flask, render_template, redirect, request, session, url_for
from flask_session import Session
import backend.db.users_manager as db_manager
import backend.exceptions as exceptions

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
    return render_template("my_gangs.html")


@app.route('/problems')
def problems_page():
    return render_template("problems.html")


@app.route('/change_field', methods=["POST"])
def change_field():
    req = request.get_json()
    username = session['username']
    password = session['password']
    field = req["field"]
    new_val = req["new_val"]
    try:
        db_manager.change_field(username, password, field, new_val)
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
            db_manager.add_user(username, password, email, auto_share)
            session['username'] = username
            session['password'] = password
            return "OK", HTTP_OK
        except exceptions.UserExists as e:
            return str(e), HTTP_DUPLICATE
        except Exception as o:
            return str(o), HTTP_DUPLICATE
    else:
        return render_template("/sign_up.html")


@app.route('/sign_in', methods=["POST", "GET"])
def sign_in():
    if request.method == "POST":
        req = request.get_json()
        username = req['username']
        password = req['password']
        if type(username) != str or type(password) != str:
            return "all types should be strings", HTTP_BAD
        if db_manager.is_user_ok(username, password):
            session['username'] = username
            session['password'] = password
            return "OK", HTTP_OK
        return "שם המשתמש או סיסמא לא נכונים", HTTP_BAD

    # GET request
    return render_template("/sign_in.html")


@app.route('/delete_user', methods=["POST"])
def delete_user():
    try:
        db_manager.delete_user(session['username'], session['password'])
    except exceptions.UserNotFound as e:
        return str(e), HTTP_BAD
    except Exception as o:
        return str(o), HTTP_BAD


if __name__ == '__main__':
    app.run()
