class DataManager:
    data = []
    new_data = []
    proofed_data = []
    to_proof_data = []

    def add_new_data(self, data_type, fields, locs):
        class_data = Data(data_type, fields, locs)
        self.new_data.append(class_data)
        return class_data

    def add_proof_data(self, data_type, fields, locs):
        self.to_proof_data.append(Data(data_type, fields, locs))

    def is_data_was_proven(self):

        for iter_data in self.new_data:
            if iter_data in self.to_proof_data:  # compares data classes
                self.to_proof_data.remove(iter_data)  # compares data classes
                self.proofed_data.append(iter_data)

        self.data.extend(self.new_data)
        self.new_data = []

        if self.to_proof_data: # if list no empty need to proof data ...
            return False

        return True


class Data:

    def __init__(self, data_type, representation, fields):
        self.data_type = data_type
        self.representation = representation
        self.fields = fields
        self.locs = []

    # basic implementation can be batter:
    def __eq__(self, other):
        if isinstance(other, Data):
            return self.representation == other.representation
        return False
