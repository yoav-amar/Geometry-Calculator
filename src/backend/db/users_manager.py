import random

import pymongo
import hashlib
from backend.exceptions import UserNotFound, WrongPassword, UserExists, UserInGang, HistoryExists

SALT_SIZE = 1024

DB_NAME = "geometry-calculator"
CONN_STRING = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=" \
              "true&ssl=false"

client = pymongo.MongoClient(CONN_STRING)
db = client["c&e"]
users = db["users"]


def add_user(username: str, password: str, email: str, auto_share: bool):
    if users.count_documents({"username": username}):
        raise UserExists()
    salt = random.randint(0, SALT_SIZE)
    password = hashlib.sha256((password + str(salt)).encode()).hexdigest()
    user_dict = {"username": username, "password": password, "email": email, "auto_share": auto_share, "my_gangs": {},
                 "my_history": "0", "salt": salt}
    users.insert_one(user_dict)


def delete_user(username: str, password: str):
    if is_user_ok(username, password):
        users.delete_one({"username": username})
        return True
    raise Exception("unknown exception")


def add_gang(username, password, gang_code, gang_name):
    is_user_ok(username, password)
    query = {"username": username}
    user = users.find_one(query)
    gangs = user["my_gangs"]
    if gang_code in gangs.keys():
        raise UserInGang()
    gangs[f"{gang_code}"] = gang_name
    users.update_one({"username": username}, {
        "$set": {"my_gangs": gangs}})


def add_history(username, password, history_code):
    is_user_ok(username, password)
    query = {"username": username}
    user = users.find_one(query)
    if user.get("my_history") != '0':
        raise HistoryExists()
    users.update_one({"username": username}, {
        "$set": {"my_history": history_code}})


def get_history(username, password):
    is_user_ok(username, password)
    query = {"username": username}
    user = users.find_one(query)
    return user["my_history"]


def is_user_ok(username: str, password: str):
    query = {"username": username}
    user = users.find_one(query)
    if not user:
        raise UserNotFound()
    password = password + str(user["salt"])
    if hashlib.sha256(password.encode()).hexdigest() == user["password"]:
        return True
    raise WrongPassword()


def get_gangs(username, password):
    is_user_ok(username, password)
    query = {"username": username}
    user = users.find_one(query)
    gangs = user["my_gangs"]
    return gangs


def change_field(username: str, password: str, field: str, new_value: str):
    if is_user_ok(username, password):
        users.update_one({"username": username}, {"$set": {field: new_value}})
        return True
    raise Exception("unknown exception")


def is_auto_share(username, password):
    is_user_ok(username, password)
    user = users.find_one({"username": username}, {"auto_share": True})
    return user["auto_share"]
