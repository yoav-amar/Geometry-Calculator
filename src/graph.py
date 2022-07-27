import re
import loc
from data import Data


class AngleManager:
    class Angle:
        graph = None

        def __init__(self, angle):
            self.angle = angle
            self.size = None
            self.data_id_for_size = None
            self.equal_angles = []
            self.data_id_for_equal_angles = []

        def set_size_angle(self, size, data):
            if self.size is None:
                self.size = float(size)
                self.data_id_for_size = data.data_id

        def add_equal_angle(self, angle, data):
            if angle not in self.equal_angles:
                self.equal_angles.append(angle)
                self.data_id_for_equal_angles.append(data.data_id)

        def get_data_id(self, equal_angle):
            return self.data_id_for_equal_angles[self.equal_angles.index(equal_angle)]

        def __eq__(self, other):
            if isinstance(other, AngleManager.Angle):
                return self.graph.is_same_angle(self.angle, other.angle)
            return False

    def __init__(self, graph):
        AngleManager.Angle.graph = graph
        self.angles = []

    def update(self, data):
        if data.data_type == "גודל זווית":
            angle = AngleManager.Angle(data.fields[1])
            if angle in self.angles:
                self.angles[self.angles.index(angle)].set_size_angle(data.fields[0], data)
            else:
                angle.set_size_angle(data.fields[0], data)
                self.angles.append(angle)

        if data.data_type == "זוויות שוות":
            angle_1 = AngleManager.Angle(data.fields[0])
            angle_2 = AngleManager.Angle(data.fields[1])

            if angle_1 in self.angles:
                self.angles[self.angles.index(angle_1)].add_equal_angle(angle_2, data)

            else:
                angle_1.add_equal_angle(angle_2, data)
                self.angles.append(angle_1)

            if angle_2 in self.angles:
                self.angles[self.angles.index(angle_2)].add_equal_angle(angle_1, data)
            else:
                angle_2.add_equal_angle(angle_1, data)
                self.angles.append(angle_2)

    def apply_transition_rule(self, sentence_id, input_data):
        out_data = []

        if input_data.data_type == "גודל זווית":
            angle = self.angles[self.angles.index(AngleManager.Angle(input_data.fields[1]))]

            for other_angle in self.angles:
                if other_angle.size is not None and other_angle.size == angle.size:
                    if angle not in other_angle.equal_angles:
                        out_data.append(Data("זוויות שוות", [angle.angle, other_angle.angle],
                                             [input_data.data_id, other_angle.data_id_for_size], sentence_id))

            for equal_angle in angle.equal_angles:
                if equal_angle.size is None:
                    out_data.append(Data("גודל זווית", [angle.size, equal_angle.angle],
                                         [input_data.data_id, angle.get_data_id(equal_angle)], sentence_id))

        if input_data.data_type == "זוויות שוות":
            angle_1 = self.angles[self.angles.index(AngleManager.Angle(input_data.fields[0]))]
            angle_2 = self.angles[self.angles.index(AngleManager.Angle(input_data.fields[1]))]

            for _ in range(2):
                for equal_angle in angle_1.equal_angles:
                    if equal_angle.size is None and angle_1.size is not None:
                        out_data.append(Data("גודל זווית", [angle_1.size, equal_angle.angle],
                                             [input_data.data_id, angle_1.data_id_for_size], sentence_id))

                    if equal_angle not in angle_2.equal_angles and not equal_angle == angle_2:
                        out_data.append(Data("זוויות שוות", [angle_2.angle, equal_angle.angle],
                                             [input_data.data_id, angle_1.get_data_id(equal_angle)], sentence_id))

                switch_angle = angle_1
                angle_1 = angle_2
                angle_2 = switch_angle

        return out_data


class LineManager:
    class Line:
        graph = None

        def __init__(self, line):
            self.line = line
            self.size = None
            self.data_id_for_size = None
            self.equal_lines = []
            self.data_id_for_equal_lines = []

        def set_size_line(self, size, data):
            if self.size is None:
                self.size = float(size)
                self.data_id_for_size = data.data_id

        def add_equal_line(self, line, data):
            if line not in self.equal_lines:
                self.equal_lines.append(line)
                self.data_id_for_equal_lines.append(data.data_id)

        def get_data_id(self, equal_line):
            return self.data_id_for_equal_lines[self.equal_lines.index(equal_line)]

        def __eq__(self, other):
            if isinstance(other, LineManager.Line):
                return self.graph.is_same_line(self.line, other.line)
            return False

    def __init__(self, graph):
        LineManager.Line.graph = graph
        self.lines = []

    def update(self, data):
        if data.data_type == "אורך קטע":
            line = LineManager.Line(data.fields[1])
            if line in self.lines:
                self.lines[self.lines.index(line)].set_size_line(data.fields[0], data)
            else:
                line.set_size_line(data.fields[0], data)
                self.lines.append(line)

        if data.data_type == "קטעים שווים":
            line_1 = LineManager.Line(data.fields[0])
            line_2 = LineManager.Line(data.fields[1])

            if line_1 in self.lines:
                self.lines[self.lines.index(line_1)].add_equal_line(line_2, data)
            else:
                line_1.add_equal_line(line_2, data)
                self.lines.append(line_1)

            if line_2 in self.lines:
                self.lines[self.lines.index(line_2)].add_equal_line(line_1, data)
            else:
                line_2.add_equal_line(line_1, data)
                self.lines.append(line_2)

    def apply_transition_rule(self, sentence_id, input_data):
        out_data = []

        if input_data.data_type == "אורך קטע":
            line = self.lines[self.lines.index(LineManager.Line(input_data.fields[1]))]

            for other_line in self.lines:
                if other_line.size is not None and other_line.size == line.size:
                    if line not in other_line.equal_lines:
                        out_data.append(Data("קטעים שווים", [line.line, other_line.line],
                                             [input_data.data_id, other_line.data_id_for_size], sentence_id))

            for equal_line in line.equal_lines:
                if equal_line.size is None:
                    out_data.append(Data("אורך קטע", [line.size, equal_line.line],
                                         [input_data.data_id, line.get_data_id(equal_line)], sentence_id))

        if input_data.data_type == "קטעים שווים":
            line_1 = self.lines[self.lines.index(LineManager.Line(input_data.fields[0]))]
            line_2 = self.lines[self.lines.index(LineManager.Line(input_data.fields[1]))]

            for _ in range(2):
                for equal_line in line_1.equal_lines:
                    if equal_line.size is None and line_1.size is not None:
                        out_data.append(Data("אורך קטע", [line_1.size, equal_line.line],
                                             [input_data.data_id, line_1.data_id_for_size], sentence_id))

                    if equal_line not in line_2.equal_lines and not equal_line == line_2:
                        out_data.append(Data("קטעים שווים", [line_2.line, equal_line.line],
                                             [input_data.data_id, line_1.get_data_id(equal_line)], sentence_id))

                switch_line = line_1
                line_1 = line_2
                line_2 = switch_line

        return out_data


class Graph:
    def __init__(self, graph):
        self.angle_manager = AngleManager(self)
        self.line_manager = LineManager(self)
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

    def get_lines_intersection_id(self, line_1: str, line_2: str):
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

    def get_line_id(self, line_str: str):
        line = self.get_line_from_string(line_str)
        if line is None:
            return None

        return line['id']

    def get_line_from_id(self, line_id: str):
        line = None
        for line_iter in self.graph['lines']:
            if line_iter['id'] == line_id:
                line = line_iter

        if line is None:
            return None

        return self.get_line_str(line)

    def get_related_lines(self, data):
        lines = []
        for field in data.fields:
            if not isinstance(field, str):
                continue

            string = field + field[0]
            regex = '(?=([A-Z][A-Z]))'
            matches = re.findall(regex, string)

            for match in matches:
                line = self.get_line_from_string(match)
                if line is not None:
                    lines.append(line)

        return lines

    def is_intersect(self, loc, data):
        if loc.name_type == "general":
            return True

        lines = self.get_related_lines(data)

        for line in lines:
            if len(set(loc.boundaries['dots']).intersection(line['dots'])) > 0:
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

        inter_dot_id = self.get_lines_intersection_id(line_from, line_to)
        if inter_dot_id is None:
            return None, None

        inter_dot = self.get_dot_name_from_id(inter_dot_id)

        if inter_dot is None:
            return None, None

        line_1_dots_names = self.get_dots_names(line_1['dots'])
        line_2_dots_names = self.get_dots_names(line_2['dots'])

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
                if self.get_lines_intersection_id(line_to_intersect_str, line_str) is None:
                    is_intersect_all = False

            if is_intersect_all:
                intersecting_lines.append(line_str)

        return intersecting_lines

    def is_same_angle(self, angle_1: str, angle_2: str):

        if angle_1[1] != angle_2[1]:
            return False

        line_1 = self.get_line_from_string(angle_1[0] + angle_1[1])
        line_2 = self.get_line_from_string(angle_1[1] + angle_1[2])

        if line_1 is None or line_2 is None:
            return False

        line_1_dots = self.get_dots_names(line_1['dots'])
        line_2_dots = self.get_dots_names(line_2['dots'])

        line_1_inter_index = line_1_dots.index(angle_1[1])
        line_2_inter_index = line_2_dots.index(angle_1[1])

        angle_1_0_index = line_1_dots.index(angle_1[0])
        angle_1_2_index = line_2_dots.index(angle_1[2])

        direct_1 = None
        direct_2 = None

        if angle_2[0] in line_1_dots:
            direct_1 = (line_1_inter_index - angle_1_0_index) * (line_1_inter_index - line_1_dots.index(angle_2[0]))
        elif angle_2[0] in line_2_dots:
            direct_2 = (line_2_inter_index - angle_1_2_index) * (line_2_inter_index - line_2_dots.index(angle_2[0]))

        if angle_2[2] in line_1_dots:
            direct_1 = (line_1_inter_index - angle_1_0_index) * (line_1_inter_index - line_1_dots.index(angle_2[2]))
        elif angle_2[2] in line_2_dots:
            direct_2 = (line_2_inter_index - angle_1_2_index) * (line_2_inter_index - line_2_dots.index(angle_2[2]))

        if direct_1 is None or direct_2 is None:
            return False

        return (direct_1 > 0) and (direct_2 > 0)

    def is_same_line(self, line_1: str, line_2: str):
        if self.get_line_id(line_1) is None or self.get_line_id(line_2) is None:
            return False

        if line_1 == line_2:
            return True

        return line_1[0] == line_2[1] and line_1[1] == line_2[0]

    def get_lines(self):
        lines = []
        for line in self.graph['lines']:
            line_str = self.get_line_str(line)
            if line_str is None:
                continue

            lines.append(line_str)

        return lines

    def get_dots_name_on_line(self, line: str):
        return self.get_dots_names(self.get_line_from_string(line)['dots'])

    def get_all_triangles_from_angle(self, angle: str):
        line_1_str = angle[0] + angle[1]
        line_2_str = angle[1] + angle[2]

        line_1_dots = self.get_dots_name_on_line(line_1_str)
        line_2_dots = self.get_dots_name_on_line(line_2_str)

        inter_dot = angle[1]

        line_1_index_inter_dot = line_1_dots.index(inter_dot)
        line_2_index_inter_dot = line_2_dots.index(inter_dot)

        if line_1_dots.index(angle[0]) > line_1_index_inter_dot:
            range_1 = [*range(line_1_index_inter_dot + 1, len(line_1_dots))]
        else:
            range_1 = [*range(line_1_index_inter_dot)]

        if line_2_dots.index(angle[2]) > line_2_index_inter_dot:
            range_2 = [*range(line_2_index_inter_dot + 1, len(line_2_dots))]
        else:
            range_2 = [*range(line_2_index_inter_dot)]

        triangles = []
        for i in range_1:
            for j in range_2:
                if self.get_line_from_string(line_1_dots[i] + line_2_dots[j]) is not None:
                    triangles.append(line_1_dots[i] + inter_dot + line_2_dots[j])

        return triangles

    def get_all_triangles_from_line(self, line: str):
        triangles = []
        for dot in self.graph['dots']:
            dot_name = dot['name']
            if len(dot_name) != 1:
                continue

            if self.get_line_id(line[0] + dot_name) is not None and self.get_line_id(line[1] + dot_name) is not None:
                triangles.append(line[0] + dot_name + line[1])

        return triangles

    def get_angle_size(self, angle_name: str):
        angle = AngleManager.Angle(angle_name)
        if angle in self.angle_manager.angles:
            angle = self.angle_manager.angles[self.angle_manager.angles.index(angle)]
            return angle.size, angle.data_id_for_size

        return None, None

    def are_angles_equal(self, angle_1: str, angle_2: str):
        if self.is_same_angle(angle_1, angle_2):
            return True, []

        angle_1 = AngleManager.Angle(angle_1)
        angle_2 = AngleManager.Angle(angle_2)
        if angle_1 in self.angle_manager.angles:
            angle_1 = self.angle_manager.angles[self.angle_manager.angles.index(angle_1)]
            if angle_2 in angle_1.equal_angles:
                return True, [angle_1.get_data_id(angle_2)]

        return False, None

    def get_line_size(self, line_name: str):
        line = LineManager.Line(line_name)
        if line in self.line_manager.lines:
            line = self.line_manager.lines[self.line_manager.lines.index(line)]
            return line.size, line.data_id_for_size

        return None, None

    def are_lines_equal(self, line_1: str, line_2: str):
        if self.is_same_line(line_1, line_2):
            return True, []

        line_1 = LineManager.Line(line_1)
        line_2 = LineManager.Line(line_2)
        if line_1 in self.line_manager.lines:
            line_1 = self.line_manager.lines[self.line_manager.lines.index(line_1)]
            if line_2 in line_1.equal_lines:
                return True, [line_1.get_data_id(line_2)]

        return False, None

    def get_angles_data_in_triangle(self, triangle):
        angles_names = [triangle, triangle[1] + triangle[2] + triangle[0], triangle[2] + triangle[0] + triangle[1]]

        angles = []

        for angle_name in angles_names:
            angle_size, angle_data_id_for_size = self.get_angle_size(angle_name)
            angles.append({'name': angle_name, 'size': angle_size, 'data_id': angle_data_id_for_size})
        return angles
