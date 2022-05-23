class DataManager:

    def __init__(self):
        self.data = []
        self.new_data = []
        self.proofed_data = []
        self.to_proof_data = []

    def add_new_data(self, data):
        self.new_data.append(data)

    def add_proof_data(self, data):
        self.to_proof_data.append(data)

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
    next_id = None
    graph = None

    def __init__(self, data_type, fields, data_needed=[]):
        self.data_id = Data.next_id
        Data.next_id += 1

        self.data_needed = data_needed
        self.data_type = data_type
        self.fields = fields
        self.locs = []

    # basic implementation can be batter:
    def __eq__(self, other):
        if isinstance(other, Data):
            if self.data_type != other.data_type:
                return False

            if self.data_type == "זוויות שוות":

                return (self.graph.is_angles_equal(self.fields[0], other.fields[0]) and
                        self.graph.is_angles_equal(self.fields[1], other.fields[1])) or\
                       (self.graph.is_angles_equal(self.fields[1], other.fields[0]) and
                        self.graph.is_angles_equal(self.fields[0], other.fields[1]))
            else:
                return set(self.fields) == set(other.fields)
        return False
