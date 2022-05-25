import pymongo
from users_manager import is_user_ok
from src.backend.exceptions import GangExists, GangNotFound, WrongCode, UserExists, UserNotFound
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
    is_user_ok(admin_name, admin_password)
    gangs_db.delete_one({"gang_name": gang_name})


def is_user_in_gang(gang_name, username, password):
    is_user_ok(username, password)
    gang = gangs_db.find_one({"gang_name": gang_name}, {"members": True})
    if not gang:
        raise GangNotFound()
    members = gang["members"]
    return username in members


def remove_member_from_gang(gang_name, admin_name, admin_password, member_name):
    gang = gangs_db.find_one({"gang_name": gang_name}, {"members": True})
    if not gang:
        raise GangNotFound()
    is_user_ok(admin_name, admin_password)
    members = gang["members"]
    if member_name in members.keys():
        members.pop(member_name)
    gangs_db.update_one({"gang_name": gang_name}, {
                        "$set": {"members": members}})


def add_member_to_gang(gang_name, username, password, gang_code):
    gang = gangs_db.find_one({"gang_name": gang_name}, {
                             "members": True, "gang_code": True})
    if not gang:
        raise GangNotFound()
    is_user_ok(username, password)
    if gang["gang_code"] != gang_code:
        raise WrongCode()
    members = gang["members"]
    if username in members.keys():
        raise UserExists()
    members[username] = []
    gangs_db.update_one({"gang_name": gang_name}, {
                        "$set": {"members": members}})


def add_permission(gang_name, admin_name, admin_password, member_name, permission):
    gang = gangs_db.find_one({"gang_name": gang_name}, {"members": True})
    if not gang:
        raise GangNotFound()
    is_user_ok(admin_name, admin_password)
    members = gang["members"]
    if member_name in members.keys():
        permissions = set(members[member_name])
        permissions.add(permission)
        members[member_name] = list(permissions)
        gangs_db.update_one({"gang_name": gang_name}, {
                            "$set": {"members": members}})
    raise UserNotFound()


def remove_permission(gang_name, admin_name, admin_password, member_name, permission):
    gang = gangs_db.find_one({"gang_name": gang_name}, {"members": True})
    if not gang:
        raise GangNotFound()
    is_user_ok(admin_name, admin_password)
    members = gang["members"]
    if member_name in members.keys():
        permissions = set(members[member_name])
        permissions.discard(permission)
        members[member_name] = list(permissions)
        gangs_db.update_one({"gang_name": gang_name}, {
                            "$set": {"members": members}})
    raise UserNotFound()


def add_problem(gang_name, username, password, problem):
    pass


def add_solution(gang_name, username, password, solution):
    pass


def remove_problem(gang_name, username, password, solution):
    pass


def remove_solution(gang_name, username, password, solution):
    pass
