from sentence import get_sentence_representation


class DataManager:

    def __init__(self, graph):
        self.graph = graph
        self.data = []
        self.new_data = []
        self.proofed_data = []
        self.to_proof_data = []

    def add_new_data(self, data):
        self.graph.angle_manager.update(data)
        self.graph.line_manager.update(data)
        self.new_data.append(data)

    def add_proof_data(self, data):
        self.to_proof_data.append(data)

    def should_stop_solving(self):

        if len(self.new_data) == 0:
            return True

        for iter_data in self.new_data:
            if iter_data in self.to_proof_data:  # compares data classes
                self.to_proof_data.remove(iter_data)  # compares data classes
                self.proofed_data.append(iter_data)

        self.data.extend(self.new_data)
        self.new_data = []

        if self.to_proof_data:  # if list no empty need to proof data ...
            return False

        return True

    def is_new_data(self, check_data):
        return check_data not in self.data

    def is_data_was_proven(self):
        return len(self.to_proof_data) == 0

    def get_data_by_id(self, data_id):
        for next_data in self.data:
            if next_data.data_id == data_id:
                return next_data

        return None

    def proof_data(self, data, solution, data_known, data_moves):
        moves_needed = ''

        for data_needed in data.data_needed:
            if data_needed not in data_known:
                before_data = self.get_data_by_id(data_needed)

                self.proof_data(before_data, solution, data_known, data_moves)

            moves_needed += str(data_moves[data_needed]) + ', '

        moves_needed = moves_needed[:-2]

        data_known.add(data.data_id)

        num_move = len(data_known)
        data_moves[data.data_id] = num_move

        sentence_representation = 'נתון'
        if data.from_sentence is not None:
            sentence_representation = get_sentence_representation(data.from_sentence)

        if moves_needed != '':
            sentence_representation += f' ({moves_needed})'

        solution.append({'numMove': num_move, 'claim': {'dataType': data.data_type, 'fields': data.fields},
                         'explain': sentence_representation})

    def get_proof_solution(self):
        solution = []
        data_used = set()
        data_moves = {}

        for proofed_data in self.proofed_data:
            current_solution = []
            self.proof_data(proofed_data, current_solution, data_used, data_moves)
            solution.extend(current_solution)

        return solution


def is_same_section(section_1: str, section_2: str):
    if section_1 == section_2:
        return True
    return section_1[0] == section_2[1] and section_1[1] == section_2[0]


class Data:
    next_id = None
    graph = None

    def __init__(self, data_type, fields, data_needed=[], from_sentence=None):
        self.data_id = Data.next_id
        Data.next_id += 1

        self.data_needed = data_needed
        self.from_sentence = from_sentence
        self.data_type = data_type
        self.fields = fields
        self.locs = []

    # basic implementation can be batter:
    def __eq__(self, other):
        if isinstance(other, Data):
            if self.data_type != other.data_type:
                return False

            if self.data_type == "זוויות שוות":

                return (self.graph.is_same_angle(self.fields[0], other.fields[0]) and
                        self.graph.is_same_angle(self.fields[1], other.fields[1])) or \
                       (self.graph.is_same_angle(self.fields[1], other.fields[0]) and
                        self.graph.is_same_angle(self.fields[0], other.fields[1]))

            elif self.data_type == "גודל זווית":

                return self.graph.is_same_angle(self.fields[1], other.fields[1]) and \
                       float(self.fields[0]) == float(other.fields[0])

            elif self.data_type == "ישרים מקבילים":

                return {self.graph.get_line_id(self.fields[0]), self.graph.get_line_id(self.fields[1])} == \
                       {self.graph.get_line_id(other.fields[0]), self.graph.get_line_id(other.fields[1])}

            elif self.data_type == "קטעים שווים":
                regular_order = is_same_section(self.fields[0], other.fields[0]) and is_same_section(self.fields[1],
                                                                                                     other.fields[1])
                other_order = is_same_section(self.fields[1], other.fields[0]) and is_same_section(self.fields[0],
                                                                                                   other.fields[1])

                return regular_order or other_order
            elif self.data_type == "גודל קטע":
                return is_same_section(self.fields[1], other.fields[1]) and float(self.fields[0]) == float(
                    other.fields[0])
            else:
                return set(self.fields) == set(other.fields)

        return False
