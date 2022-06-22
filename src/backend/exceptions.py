class UserNotFound(Exception):
    def __init__(self, message="user not found"):
        super().__init__()
        self.args += (message,)


class UserExists(Exception):
    def __init__(self, message="השם משתמש כבר קיים"):
        super().__init__()
        self.args += (message,)


class UserInGang(Exception):
    def __init__(self, message="המשתמש כבר בקבוצה"):
        super().__init__()
        self.args += (message,)


class MemberInGang(Exception):
    def __init__(self, message="את\ה כבר בקבוצה"):
        super().__init__()
        self.args += (message,)


class WrongPassword(Exception):
    def __init__(self, message="wrong password"):
        super().__init__()
        self.args += (message,)


class GangExists(Exception):
    def __init__(self, message="there is another gang with this name"):
        super().__init__()
        self.args += (message,)


class ProblemExists(Exception):
    def __init__(self, message="יש כבר בעייה עם אותו השם"):
        super().__init__()
        self.args += (message,)


class GangNotFound(Exception):
    def __init__(self, message="הגיאו-מטריקה לא נמצאה"):
        super().__init__()
        self.args += (message,)


class WrongCode(Exception):
    def __init__(self, message="gang code is wrong"):
        super().__init__()
        self.args += (message,)


class ProblemNotFound(Exception):
    def __init__(self, message="הבעיה לא נמצאה"):
        super().__init__()
        self.args += (message,)


class SolutionExists(Exception):
    def __init__(self, message="יש כבר פתרון עם אותו השם"):
        super().__init__()
        self.args += (message,)


class SolutionNotFound(Exception):
    def __init__(self, message="הפתרון לא נמצא"):
        super().__init__()
        self.args += (message,)
