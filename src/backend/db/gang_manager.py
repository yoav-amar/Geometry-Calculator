import pymongo
from .users_manager import is_user_ok
from src.backend.exceptions import *
from random import randint

DB_NAME = "geometry-calculator"
CONN_STRING = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=" \
              "true&ssl=false"

client = pymongo.MongoClient(CONN_STRING)
db = client["c&e"]
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
        gangs_db.insert_one({"gang_name": CODES, "codes": [gang_code]})
    else:
        gang_codes = set(gang_codes["codes"])
        while gang_code in gang_codes:
            gang_code = random_with_n_digits(NUMBER_OF_CODE_DIGITS)
        gang_codes.add(gang_code)
        gangs_db.update_one({"gang_name": CODES}, {
            "$set": {"codes": list(gang_codes)}})
    gangs_db.insert_one(
        {"gang_name": gang_name, "admin": admin_name, "gang_code": gang_code, "problems": {},
         "members": {admin_name: []}})


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


def get_gang_code(username, password, gang_name):
    is_user_in_gang(gang_name, username, password)
    gang = gangs_db.find_one({"gang_name": gang_name}, {"gang_code": True})
    return gang["gang_code"]


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


def add_member_to_gang(gang_code, username, password):
    gang = gangs_db.find_one({"gang_code": gang_code})
    if not gang:
        raise GangNotFound()
    is_user_ok(username, password)
    members = gang["members"]
    if username in members.keys():
        raise MemberInGang()
    members[username] = []
    gangs_db.update_one({"gang_code": gang_code}, {
        "$set": {"members": members}})
    return gang["gang_name"]


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
        return True
    raise UserNotFound()


def remove_permission(gang_name, admin_name, admin_password, member_name, permission):
    gang = gangs_db.find_one({"gang_name": gang_name})
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
        return True
    raise UserNotFound()


def add_problem(gang_name, username, password, problem_name, problem):
    is_user_ok(username, password)
    gang = gangs_db.find_one({"gang_name": gang_name})
    if not gang:
        raise GangNotFound()
    problems = gang["problems"]
    if problem_name in problems.keys():
        raise ProblemExists()
    problems[problem_name] = {"problem": problem, "solutions": {}}
    gangs_db.update_one({"gang_name": gang_name}, {
        "$set": {"problems": problems}})


def get_problems_names(gang_name, username, password):
    is_user_in_gang(gang_name, username, password)
    gang = gangs_db.find_one({"gang_name": gang_name})
    if not gang:
        raise GangNotFound()
    problems = gang["problems"]
    return problems.keys()


def get_problem(gang_name, problem_name, username, password):
    is_user_in_gang(gang_name, username, password)
    gang = gangs_db.find_one({"gang_name": gang_name})
    if not gang:
        raise GangNotFound()
    problems = gang["problems"]
    problem = problems.get(problem_name)
    if not problem:
        raise ProblemNotFound
    solutions = problem["solutions"].keys()
    return problem["problem"], solutions


def add_solution(gang_name, username, password, problem_name, solution_name, solution):
    is_user_in_gang(gang_name, username, password)
    gang = gangs_db.find_one({"gang_name": gang_name})
    if not gang:
        raise GangNotFound()
    problems = gang["problems"]
    problem = problems.get(problem_name)
    if not problem:
        raise ProblemNotFound
    solutions = problem["solutions"]
    if solution_name in solutions.keys():
        raise SolutionExists()
    solutions[solution_name] = solution
    problems[problem_name] = problem
    gangs_db.update_one({"gang_name": gang_name}, {
        "$set": {"problems": problems}})


def remove_problem(gang_name, username, password, problem_name):
    gang = gangs_db.find_one({"gang_name": gang_name})
    is_user_in_gang(gang_name, username, password)
    problems = gang["problems"]
    if problem_name in problems.keys():
        problems.pop(problem_name)
    gangs_db.update_one({"gang_name": gang_name}, {
        "$set": {"problems": problems}})


def remove_solution(gang_name, username, password, problem_name, solution_name):
    gang = gangs_db.find_one({"gang_name": gang_name})
    is_user_in_gang(gang_name, username, password)
    problems = gang["problems"]
    problem = problems.get(problem_name)
    if not problem:
        raise ProblemNotFound()
    solutions = problem["solutions"]
    if solution_name in solutions.keys():
        solutions.pop(solution_name)
    gangs_db.update_one({"gang_name": gang_name}, {
        "$set": {"problems": problems}})


def get_solution(gang_name, username, password, problem_name, solution_name):
    gang = gangs_db.find_one({"gang_name": gang_name})
    is_user_in_gang(gang_name, username, password)
    problems = gang["problems"]
    problem = problems.get(problem_name)
    if not problem:
        raise ProblemNotFound()
    solutions = problem["solutions"]


if __name__ == '__main__':
    add_solution("אדוי המלכה", "yoavyoav", "hutc12", "עמוד 32", "פתרון 1", "hrer")
