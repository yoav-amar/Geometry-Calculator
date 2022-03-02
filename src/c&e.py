from flask import Flask, render_template, redirect, request, session, url_for
from flask_session import Session
import backend.db.db_manager as db_manager
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


@app.route('/settings')
def setting_page():
    return render_template("settings.html")


@app.route('/change_field', methods=["POST"])
def change_field():
    req = request.get_json()
    username = session['username']
    password = session['password']
    field = req["field"]
    new_val = req["new value"]
    try:
        db_manager.change_field(username, password, field, new_val)
    except Exception as e:
        pass  # TODO fill


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
    # GET request
    return render_template("/sign_in.html")


if __name__ == '__main__':
    app.run()
