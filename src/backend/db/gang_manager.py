import pymongo
from users_manager import is_user_ok
from src.backend.exceptions import GangExists, GangNotFound, WrongPassword
from random import randint

DB_NAME = "geometry-calculator"
CONN_STRING = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=" \
              "true&ssl=false"

client = pymongo.MongoClient(CONN_STRING)
db = client["ry"]
gangs_db = db["gangs"]
users = db["users"]
NUMBER_OF_CODE_DIGITS = 6
CODES = "gangs_codes"


def random_with_n_digits(n):
    range_start = 10 ** (n - 1)
    range_end = (10 ** n) - 1
    return randint(range_start, range_end)


def add_gang(gang_name, admin_name, admin_password):
    is_user_ok(admin_name, admin_password)
    if gang_name == CODES or gangs_db.find_one({"gang_name": gang_name}):
        raise GangExists()
    gang_code = random_with_n_digits(NUMBER_OF_CODE_DIGITS)
    gang_codes = gangs_db.find_one({"gang_name": CODES})
    if not gang_codes:
        gangs_db.insert_one({"gang_name": CODES, "codes": []})
        gang_codes = []
    else:
        gang_codes = gang_codes["codes"]
    while gang_code in set(gang_codes):
        gang_code = random_with_n_digits(NUMBER_OF_CODE_DIGITS)
    gangs_db.insert_one(
        {"gang_name": gang_name, "admin": admin_name, "gang_code": gang_code, "problems": [],
         "members": {"member_name:": admin_name, "permissions": "all"}})


def delete_gang(gang_name, admin_name, admin_password):
    if not is_user_ok(admin_name, admin_password):
        raise Exception("unknown exception")
    gangs_db.delete_one({"gang_name": gang_name})


def remove_member_from_gang(gang_name, admin_name, admin_password, member_name):
    gang = gangs_db.find_one({"gang_name": gang_name}, {"members": True})
    if not gang:
        raise GangNotFound()
    is_user_ok(admin_name, admin_password)
    members = gang["members"]
    for member in members:
        if member["member_name"] == member_name:
            members.remove(member)
            break
    gangs_db.update_one({"gang_name": gang_name}, {"$set": {"members": members}})


def add_member_to_gang(gang_name, username, password, gang_code):
    pass


def add_permission(gang_name, admin_name, admin_password):
    pass


def remove_permission():
    pass


def add_problem(gang_name, username, password, solution):
    pass


def add_solution(gang_name, username, password, solution):
    pass


def remove_problem(gang_name, username, password, solution):
    pass


def remove_solution(gang_name, username, password, solution):
    pass
