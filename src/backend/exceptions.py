class UserNotFound(Exception):
    def __init__(self, message="user not found"):
        super().__init__()
        self.args += (message,)


class UserExists(Exception):
    def __init__(self, message="השם משתמש כבר קיים"):
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


class GangNotFound(Exception):
    def __init__(self, message="הגיאו-מטריקה לא נמצאה"):
        super().__init__()
        self.args += (message,)


class WrongCode(Exception):
    def __init__(self, message="gang code is wrong"):
        super().__init__()
        self.args += (message,)
