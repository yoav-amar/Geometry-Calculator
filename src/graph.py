import re
import loc


class Graph:
    def __init__(self, graph):
        self.graph = graph

    def get_basic_locs(self):
        loc_id = 0
        locs = [loc.Loc(loc_id, None, 'general')]
        for circle in self.graph['circles']:
            loc_id += 1
            locs.append(loc.Loc(loc_id, circle, 'circle'))

        return locs

    def get_line_from_string(self, string):
        dots_ids = set()

        for dot in self.graph['dots']:
            if dot['name'] == string[0] or dot['name'] == string[1]:
                dots_ids.add(dot['id'])

        for line in self.graph['lines']:
            if len(dots_ids.intersection(line['dots'])) == 2:
                return line

        return None

    def get_related_lines(self, data):
        lines = []
        for field in data.fields:
            string = field + field[0]
            regex = '(?=([A-Z][A-Z]))'
            matches = re.findall(regex, string)

            for match in matches:
                lines += self.get_line_from_string(match)

        return lines

    def is_intersect(self, loc, data):
        if loc.name_type == "general":
            return True

        lines = self.get_related_lines(data)

        for line in lines:
            if len(set(loc.boundaries.dots).intersection(line['dots'])) > 0:
                return True

        return False
