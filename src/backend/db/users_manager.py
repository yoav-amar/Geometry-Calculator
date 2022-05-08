import random

import pymongo
import hashlib
from ..exceptions import UserNotFound, WrongPassword, UserExists

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
    user_dict = {"username": username, "password": password, "email": email, "auto_share": auto_share, "salt": salt}
    users.insert_one(user_dict)


def delete_user(username: str, password: str):
    if is_user_ok(username, password):
        users.delete_one({"username": username})
        return True
    raise Exception("unknown exception")


def is_user_ok(username: str, password: str):
    query = {"username": username}
    user = users.find_one(query)
    if not user:
        raise UserNotFound()
    password = password + str(user["salt"])
    if hashlib.sha256(password.encode()).hexdigest() == user["password"]:
        return True
    raise WrongPassword()


def change_field(username: str, password: str, field: str, new_value: str):
    if is_user_ok(username, password):
        users.update_one({"username": username}, {"$set": {field: new_value}})
        return True
    raise Exception("unknown exception")
