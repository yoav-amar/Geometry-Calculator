class CustomException(Exception):
    def __init__(self, message="error"):
        self.message = message
        super().__init__(self.message)


class UserNotFound(CustomException):
    def __init__(self, message="user not found"):
        super().__init__(message)


class UserExists(CustomException):
    def __init__(self, message="there is another user with this username"):
        super().__init__(message)


class WrongPassword(CustomException):
    def __init__(self, message="wrong password"):
        super().__init__(message)
