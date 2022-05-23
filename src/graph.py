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

    def get_line_from_string(self, string: str):
        dots_ids = set()

        for dot in self.graph['dots']:
            if dot['name'] == string[0] or dot['name'] == string[1]:
                dots_ids.add(dot['id'])

        for line in self.graph['lines']:
            if len(dots_ids.intersection(line['dots'])) == 2:
                return line

        return None

    def get_dot_name_from_id(self, dot_id: str):

        for dot in self.graph['dots']:
            if dot['id'] == dot_id:
                if len(dot['name']) == 1:
                    return dot['name']

        return None

    def get_line_intersection_id(self, line_1: str, line_2: str):
        line_1 = self.get_line_from_string(line_1)
        line_2 = self.get_line_from_string(line_2)

        if line_1 is None or line_2 is None:
            return None

        inter_set = set(line_1['dots']).intersection(line_2['dots'])

        if len(inter_set) == 0:
            return None

        return next(iter(inter_set))

    def get_dots_names(self, dots):
        dots_names = []

        for dot in dots:
            dot_name = self.get_dot_name_from_id(dot)
            if dot_name is None:
                continue

            dots_names.append(dot_name)

        return dots_names

    def get_line_str(self, line):
        dots_names = self.get_dots_names(line['dots'])

        if len(dots_names) >= 2:
            return dots_names[0] + dots_names[-1]

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

    # return the angles from line_from to line_to:
    # is_right_right=True => angles : right, inter, right & left, inter, left
    # is_right_right=False => angles : right, inter, left & left, inter, right
    def get_angle_between_lines(self, line_from: str, line_to: str, is_right_right=True):
        line_1 = self.get_line_from_string(line_from)
        line_2 = self.get_line_from_string(line_to)

        if line_1 is None or line_2 is None:
            return None, None

        inter_dot = self.get_dot_name_from_id(self.get_line_intersection_id(line_from, line_to))

        if inter_dot is None:
            return None, None

        line_1_dots_names = self.get_dots_names(line_1['dots'])
        line_2_dots_names = self.get_dots_names(line_2['dots'])
        print(line_1_dots_names, line_2_dots_names)

        iter_index_line_1 = line_1_dots_names.index(inter_dot)
        iter_index_line_2 = line_2_dots_names.index(inter_dot)

        direction = -1
        if is_right_right:
            direction = 1

        upper_angle = None
        if (iter_index_line_1 + 1) in range(0, len(line_1_dots_names)) and \
                (iter_index_line_2 + direction) in range(0, len(line_2_dots_names)):
            upper_angle = line_1_dots_names[iter_index_line_1 + 1] + inter_dot + \
                          line_2_dots_names[iter_index_line_2 + direction]

        lower_angle = None
        if (iter_index_line_1 - 1) in range(0, len(line_1_dots_names)) and \
                (iter_index_line_2 - direction) in range(0, len(line_2_dots_names)):
            lower_angle = line_1_dots_names[iter_index_line_1 - 1] + inter_dot + \
                          line_2_dots_names[iter_index_line_2 - direction]

        return upper_angle, lower_angle

    def get_lines_intersect_with_lines(self, lines_to_intersect_with_str):
        intersecting_lines = []

        for line in self.graph['lines']:
            line_str = self.get_line_str(line)
            if line_str is None:
                continue

            is_intersect_all = True
            for line_to_intersect_str in lines_to_intersect_with_str:
                if self.get_line_intersection_id(line_to_intersect_str, line_str) is None:
                    is_intersect_all = False

            if is_intersect_all:
                intersecting_lines.append(line_str)

        return intersecting_lines

    def is_angles_equal(self, angle_1: str, angle_2: str):
        set_1 = set([self.get_line_from_string(angle_1[0] + angle_1[1])['id'],
                     self.get_line_from_string(angle_1[1] + angle_1[2])['id']])
        set_2 = set([self.get_line_from_string(angle_2[0] + angle_2[1])['id'],
                     self.get_line_from_string(angle_2[1] + angle_2[2])['id']])

        return set_1 == set_2
