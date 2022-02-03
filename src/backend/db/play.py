import random

import pymongo
import hashlib

SALT_SIZE = 1024

DB_NAME = "geometry-calculator"
CONN_STRING = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=" \
              "true&ssl=false"

client = pymongo.MongoClient(CONN_STRING)
db = client["ry"]
users = db["users"]
ry = db["customers"]
x = ry.find_one({"address": 'Highway 37'})
print(x["name"])


def add_user(username: str, password: str, email: str, auto_share: bool):
    if users.count_documents({"username": username}):
        raise Exception()  # TODO create custom exceptions
    salt = random.randint(SALT_SIZE)
    password = hashlib.sha256((password + str(salt)).encode()).hexdigest()
    user_dict = {"username": username, "password": password, "email": email, "auto_share": auto_share, "salt": salt}
    users.insert_one(user_dict)


def delete_user(username: str, password: str):
    query = {"username": username}
    user = users.find_one(query)
    if not user:
        raise Exception()  # TODO create custom exceptions
    password = password + str(user["salt"])
    if hashlib.sha256(password.encode()).hexdigest() == user["password"]:
        users.delete_one(query)
    raise Exception()  # TODO create custom exceptions


def change_field(username, field, new_value):
    query = {"username": username}
    user = users.find_one(query)
    if not user:
        raise Exception()  # TODO create custom exceptions
    users.update_one(query, {"$set": {field: new_value}})
