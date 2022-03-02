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
