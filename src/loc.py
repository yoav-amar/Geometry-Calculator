class LocsManager:

    def __init__(self, graph):
        self.locs = graph.get_basic_locs()
        self.graph = graph

    def get_locs(self):
        return self.locs

    def classify_data(self, data):
        data_locs = []
        for loc in self.locs:
            if self.graph.is_intersect(loc, data):
                loc.add_data(data)
                data_locs.append(loc)

        data.locs = data_locs


class Loc:
    def __init__(self, loc_id, boundaries, name_type):
        self.loc_id = loc_id
        self.boundaries = boundaries
        self.name_type = name_type
        self.data = []
        self.new_data = []

    def add_data(self, data):
        self.new_data.append(data)

    def end_cycle(self):
        self.data.extend(self.new_data)
        self.new_data = []