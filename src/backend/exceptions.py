class UserNotFound(Exception):
    def __init__(self, message="user not found"):
        super().__init__()
        self.args += (message,)


class UserExists(Exception):
    def __init__(self, message="there is another user with this username"):
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
    def __init__(self, message="there isn't a gang with this name"):
        super().__init__()
        self.args += (message,)


class WrongCode(Exception):
    def __init__(self, message="gang code is wrong"):
        super().__init__()
        self.args += (message,)
