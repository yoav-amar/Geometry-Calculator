import data
from itertools import permutations


class SentenceManager:
    def __init__(self, graph):
        self.graph = graph
        self.sentences = {}
        for sentence in all_regular_sentences:
            if sentence['loc_type'] not in self.sentences:
                self.sentences[sentence['loc_type']] = []

            self.sentences[sentence['loc_type']].append(Sentence(sentence))

        self.sentences_apply_on_start = []
        for sentence in all_sentences_apply_on_start:
            self.sentences_apply_on_start.append(
                SentenceToApply(Sentence(sentence), None, self.graph))

    def get_sentences_for_loc(self, loc):
        sentences_to_apply = []

        if loc.name_type in self.sentences:
            for sentence in self.sentences[loc.name_type]:
                for new_data in loc.new_data:
                    if new_data.data_type in sentence.input_data_type:
                        sentences_to_apply.append(
                            SentenceToApply(sentence, new_data, self.graph))

        return sentences_to_apply

    def get_sentences_apply_on_start(self):
        return self.sentences_apply_on_start


class Sentence:
    def __init__(self, sentence):
        self.sentence_id = sentence['sentence_id']
        self.loc_type = sentence['loc_type']
        self.representation = sentence['representation']
        self.input_data_type = sentence['input_data_type']
        self.apply_func = sentence['apply_func']


class SentenceToApply:
    def __init__(self, sentence, input, graph):
        self.sentence = sentence
        self.input = input
        self.graph = graph

    def apply(self):
        return self.sentence.apply_func(self.graph, self.input)


def sentence_25_1(graph, input_data):
    print('25_1')
    out_data = []

    line_1 = input_data.fields[0]
    line_2 = input_data.fields[1]

    between_lines = graph.get_lines_intersect_with_lines([line_1, line_2])

    for line in between_lines:
        angle_1_1, angle_1_2 = graph.get_angle_between_lines(line_1, line)
        angle_2_1, angle_2_2 = graph.get_angle_between_lines(line_2, line)
        if angle_1_1 is not None and angle_2_1 is not None:
            out_data.append(data.Data("זוויות שוות", [angle_1_1, angle_2_1], [
                input_data.data_id], '25_1'))
        if angle_1_2 is not None and angle_2_2 is not None:
            out_data.append(data.Data("זוויות שוות", [angle_1_2, angle_2_2], [
                input_data.data_id], '25_1'))

        angle_3_1, angle_3_2 = graph.get_angle_between_lines(
            line, line_1, False)
        angle_4_1, angle_4_2 = graph.get_angle_between_lines(
            line, line_2, False)
        if angle_3_1 is not None and angle_4_1 is not None:
            out_data.append(data.Data("זוויות שוות", [angle_3_1, angle_4_1], [
                input_data.data_id], '25_1'))
        if angle_3_2 is not None and angle_4_2 is not None:
            out_data.append(data.Data("זוויות שוות", [angle_3_2, angle_4_2], [
                input_data.data_id], '25_1'))

    return out_data


def sentence_25_2(graph, input_data):
    print('25_2')
    out_data = []

    line_1 = input_data.fields[0]
    line_2 = input_data.fields[1]

    between_lines = graph.get_lines_intersect_with_lines([line_1, line_2])

    for line in between_lines:
        angle_1_1, angle_1_2 = graph.get_angle_between_lines(line_1, line)
        angle_2_1, angle_2_2 = graph.get_angle_between_lines(line_2, line)

        if angle_1_1 is not None and angle_2_2 is not None:
            out_data.append(data.Data("זוויות שוות", [angle_1_1, angle_2_2], [
                input_data.data_id], '25_2'))
        if angle_1_2 is not None and angle_2_1 is not None:
            out_data.append(data.Data("זוויות שוות", [angle_1_2, angle_2_1], [
                input_data.data_id], '25_2'))

        angle_3_1, angle_3_2 = graph.get_angle_between_lines(
            line, line_1, False)
        angle_4_1, angle_4_2 = graph.get_angle_between_lines(
            line, line_2, False)

        if angle_3_1 is not None and angle_4_2 is not None:
            out_data.append(data.Data("זוויות שוות", [angle_3_1, angle_4_2], [
                input_data.data_id], '25_2'))
        if angle_3_2 is not None and angle_4_1 is not None:
            out_data.append(data.Data("זוויות שוות", [angle_3_2, angle_4_1], [
                input_data.data_id], '25_2'))

    return out_data


def sentence_105(graph, input_data):
    print('105')
    x = graph.angle_manager.apply_transition_rule('105', input_data)
    return x


def sentence_3(graph, input_data):
    print('3')
    out_data = []
    angle_1 = input_data.fields[0]
    angle_2 = input_data.fields[1]
    if angle_2[1] == angle_1[1]:
        return out_data
    angle_1_lines = [graph.get_line_id(
        angle_1[0] + angle_1[1]), graph.get_line_id(angle_1[1] + angle_1[2])]
    angle_2_lines = [graph.get_line_id(
        angle_2[0] + angle_2[1]), graph.get_line_id(angle_2[1] + angle_2[2])]
    # check if they are in the same triangle
    commom_line = set(angle_1_lines).intersection(set(angle_2_lines))
    if len(commom_line) == 1:
        commom_line = commom_line.pop()
        if commom_line == angle_1_lines[0]:
            line_1 = angle_1[1] + angle_1[2]
        else:
            line_1 = angle_1[1] + angle_1[0]
        if commom_line == angle_2_lines[0]:
            line_2 = angle_2[1] + angle_2[2]
        else:
            line_2 = angle_2[1] + angle_2[0]
        common_dot = graph.get_lines_intersection_id(line_1, line_2)
        if not common_dot:
            return out_data
        common_dot = graph.get_dot_name_from_id(common_dot)
        if not common_dot:
            return out_data
        line_1 = angle_1[1] + common_dot
        line_2 = angle_2[1] + common_dot
        out_data.append(
            data.Data("קטעים שווים", [line_1, line_2], [input_data.data_id], '3'))
    return out_data


def sentence_4(graph, input_data):
    out_data = []
    print('4')
    line_1 = input_data.fields[0]
    line_2 = input_data.fields[1]
    # check if they are in the same triangle
    common_dot = set(line_1).intersection(set(line_2))
    if len(common_dot) == 1:
        common_dot = common_dot.pop()
        equal_angles = set(line_1).union(set(line_2))
        equal_angles.remove(common_dot)
        equal_angles = list(equal_angles)
        angle_1 = common_dot + equal_angles[0] + equal_angles[1]
        angle_2 = common_dot + equal_angles[1] + equal_angles[0]
        out_data.append(
            data.Data("זוויות שוות", [angle_1, angle_2], [input_data.data_id], '4'))
    return out_data


def sentence_12(graph, input_data):
    print('12')

    out_data = []

    for triangle in graph.get_all_triangles_from_angle(input_data.fields[1]):
        angles = graph.get_angles_data_in_triangle(triangle)

        num_known_angles = 0
        known_angles_sum = 0
        known_angles_data_id = []
        unknown_angle = None
        for angle in angles:
            if angle['size'] is None:
                unknown_angle = angle['name']
            else:
                known_angles_data_id.append(angle['data_id'])
                known_angles_sum += angle['size']
                num_known_angles += 1

        if num_known_angles == 2:
            out_data.append(data.Data("גודל זווית", [str(180 - known_angles_sum), unknown_angle],
                                      known_angles_data_id, '12'))

    return out_data


def sentence_1(graph, input_data):
    print('1')
    out_data = []
    angle_size = input_data.fields[0]
    angle_name = input_data.fields[1]
    line_1 = angle_name[:2]
    line_2 = angle_name[1:]
    angles = list(graph.get_angle_between_lines(line_1, line_2))
    angles.extend(list(graph.get_angle_between_lines(line_1, line_2, False)))
    index = 0
    for angle in angles:
        if angle and graph.is_same_angle(angle_name, angle):
            break
        index += 1
    supplementary_angle = angles[(index + 2 - index % 2) % 4]
    if supplementary_angle:
        out_data.append(
            data.Data("גודל זווית", [str(180 - float(angle_size)), supplementary_angle], [input_data.data_id], '1'))
    supplementary_angle = angles[(index + 3 - index % 2) % 4]
    if supplementary_angle:
        out_data.append(
            data.Data("גודל זווית", [str(180 - float(angle_size)), supplementary_angle], [input_data.data_id], '1'))
    return out_data


def sentence_106(graph, input_data):
    print('106')
    out_data = []
    angle = input_data.fields[1]
    line = input_data.fields[0]

    dot_new_angles = line[0]
    if angle[1] == line[0]:
        dot_new_angles = line[1]

    out_data.append(
        data.Data("זוויות שוות", [angle[0] + angle[1] + dot_new_angles, dot_new_angles + angle[1] + angle[2]],
                  [input_data.data_id], '106'))

    angle_size, data_id = graph.get_angle_size(angle)

    if angle_size is not None:
        out_data.append(data.Data("גודל זווית", [str(angle_size / 2), angle[0] + angle[1] + dot_new_angles],
                                  [input_data.data_id, data_id], '106'))

        out_data.append(data.Data("גודל זווית", [str(angle_size / 2), dot_new_angles + angle[1] + angle[2]],
                                  [input_data.data_id, data_id], '106'))

    return out_data


def sentence_110(graph, input_data):
    print(110)
    parall = input_data.fields[0]
    out_data = []
    line_1 = parall[0] + parall[1]
    line_2 = parall[1] + parall[2]
    line_3 = parall[2] + parall[3]
    line_4 = parall[3] + parall[0]
    out_data.append(data.Data("ישרים מקבילים", [
        line_1, line_3], [input_data.data_id], '110'))
    out_data.append(data.Data("ישרים מקבילים", [
        line_2, line_4], [input_data.data_id], '110'))
    return out_data


def sentence_111(graph, input_data):
    print(111)
    parall = input_data.fields[0]
    out_data = []
    line_1 = parall[0] + parall[1]
    line_2 = parall[1] + parall[2]
    line_3 = parall[2] + parall[3]
    line_4 = parall[3] + parall[0]
    out_data.append(data.Data("קטעים שווים", [line_1, line_3], [
        input_data.data_id], '111'))
    out_data.append(data.Data("קטעים שווים", [line_2, line_4], [
        input_data.data_id], '111'))
    return out_data


def sentence_112(graph, input_data):
    print(112)
    out_data = []
    line_1 = input_data.fields[1]
    line_2 = input_data.fields[2]
    out_data.append(data.Data("קטעים שווים", [line_1, line_2], [
        input_data.data_id], '112'))
    return out_data


def sentence_22(graph, input_data):
    print('22')

    out_data = []

    angle_1 = input_data.fields[0]
    angle_2 = input_data.fields[1]

    lines_1 = [graph.get_line_id(
        angle_1[0] + angle_1[1]), graph.get_line_id(angle_1[1] + angle_1[2])]
    lines_2 = [graph.get_line_id(
        angle_2[0] + angle_2[1]), graph.get_line_id(angle_2[1] + angle_2[2])]

    inter_line = set(lines_1).intersection(lines_2)
    if len(inter_line) != 1:
        return out_data

    inter_line = next(iter(inter_line))
    inter_line_index_1 = lines_1.index(inter_line)
    inter_line_index_2 = lines_2.index(inter_line)
    inter_line = graph.get_line_from_id(inter_line)

    line_1 = graph.get_line_from_id(lines_1[1 - inter_line_index_1])
    line_2 = graph.get_line_from_id(lines_2[1 - inter_line_index_2])

    angle_1_dot_on_inter_line_index = inter_line_index_1 * 2
    angle_2_dot_on_inter_line_index = inter_line_index_2 * 2

    inter_line = graph.get_dots_name_on_line(inter_line)
    line_1_dots = graph.get_dots_name_on_line(line_1)
    line_2_dots = graph.get_dots_name_on_line(line_2)

    inter_line_1 = angle_1[1]
    inter_line_2 = angle_2[1]

    direct_1 = (inter_line.index(inter_line_1) - inter_line.index(angle_1[angle_1_dot_on_inter_line_index])) * \
               (inter_line.index(inter_line_2) -
                inter_line.index(angle_2[angle_2_dot_on_inter_line_index]))

    direct_2 = (line_1_dots.index(inter_line_1) - line_1_dots.index(angle_1[2 - angle_1_dot_on_inter_line_index])) * \
               (line_2_dots.index(inter_line_2) -
                line_2_dots.index(angle_2[2 - angle_2_dot_on_inter_line_index]))

    if direct_1 > 0 and direct_2 > 0:
        out_data.append(data.Data("ישרים מקבילים", [
            line_1, line_2], [input_data.data_id], '22'))

    return out_data


def sentence_27(graph, input_data):
    parall = input_data.fields[0]
    out_data = [data.Data("קטעים שווים", [parall[0] + parall[1], parall[2] + parall[3]], [input_data.data_id], '27'),
                data.Data("קטעים שווים", [parall[0] + parall[3], parall[1] + parall[2]], [input_data.data_id], '27')]
    return out_data


def sentence_37(graph, input_data):
    rec = input_data.fields[0]
    out_data = [data.Data("קטעים שווים", [rec[0] + rec[2],
                                          rec[1] + rec[3]], [input_data.data_id], '37')]
    return out_data


def sentence_107(graph, input_data):
    print('107')
    return graph.line_manager.apply_transition_rule('107', input_data)


def sentence_108(graph, input_data):
    print('108')

    out_data = []

    triangle_1 = input_data.fields[0]
    triangle_2 = input_data.fields[1]

    out_data.append(data.Data("קטעים שווים", [triangle_1[0] + triangle_1[1], triangle_2[0] + triangle_2[1]],
                              [input_data.data_id], '108'))
    out_data.append(data.Data("קטעים שווים", [triangle_1[1] + triangle_1[2], triangle_2[1] + triangle_2[2]],
                              [input_data.data_id], '108'))
    out_data.append(data.Data("קטעים שווים", [triangle_1[0] + triangle_1[2], triangle_2[0] + triangle_2[2]],
                              [input_data.data_id], '108'))

    return out_data


def sentence_109(graph, input_data):
    print('109')

    out_data = []

    triangle_1 = input_data.fields[0]
    triangle_2 = input_data.fields[1]

    out_data.append(data.Data("זוויות שוות", [triangle_1[0] + triangle_1[1] + triangle_1[2],
                                              triangle_2[0] + triangle_2[1] + triangle_2[2]],
                              [input_data.data_id], '109'))
    out_data.append(data.Data("זוויות שוות", [triangle_1[1] + triangle_1[2] + triangle_1[0],
                                              triangle_2[1] + triangle_2[2] + triangle_2[0]],
                              [input_data.data_id], '109'))
    out_data.append(data.Data("זוויות שוות", [triangle_1[2] + triangle_1[0] + triangle_1[1],
                                              triangle_2[2] + triangle_2[0] + triangle_2[1]],
                              [input_data.data_id], '109'))

    return out_data


def sentence_17(graph, input_data):
    print('17')

    def are_ordered_triangles_overlapping(t_1, t_2):
        for _ in range(3):
            are_angles_equal, angle_data_needed = graph.are_angles_equal(
                t_1, t_2)
            are_lines_equal_1, lines_data_needed_1 = graph.are_lines_equal(
                t_1[0] + t_1[1], t_2[0] + t_2[1])
            are_lines_equal_2, lines_data_needed_2 = graph.are_lines_equal(
                t_1[1] + t_1[2], t_2[1] + t_2[2])
            if are_angles_equal and are_lines_equal_1 and are_lines_equal_2:
                return True, [*angle_data_needed, *lines_data_needed_1, *lines_data_needed_2]

            t_1 = t_1[1] + t_1[2] + t_1[0]
            t_2 = t_2[1] + t_2[2] + t_2[0]

        return False, []

    out_data = []

    if input_data.data_type == "זוויות שוות":
        triangles_1 = graph.get_all_triangles_from_angle(input_data.fields[0])
        triangles_2 = graph.get_all_triangles_from_angle(input_data.fields[1])

    if input_data.data_type == "קטעים שווים":
        triangles_1 = graph.get_all_triangles_from_line(input_data.fields[0])
        triangles_2 = graph.get_all_triangles_from_line(input_data.fields[1])

    for triangle_1 in triangles_1:
        for triangle_2 in triangles_2:
            for triangle_2_order in [''.join(p) for p in permutations(triangle_2)]:
                are_overlapping, data_needed = are_ordered_triangles_overlapping(
                    triangle_1, triangle_2_order)
                if are_overlapping:
                    out_data.append(data.Data("משולשים חופפים", [
                        triangle_1, triangle_2_order], data_needed, '17'))

    return out_data


def sentence_18(graph, input_data):
    print('18')

    def are_ordered_triangles_overlapping(t_1, t_2):
        for _ in range(3):
            are_lines_equal, lines_data_needed = graph.are_lines_equal(
                t_1[0] + t_1[1], t_2[0] + t_2[1])
            are_angles_equal_1, angle_data_needed_1 = \
                graph.are_angles_equal(
                    t_1[0] + t_1[1] + t_1[2], t_2[0] + t_2[1] + t_2[2])
            are_angles_equal_2, angle_data_needed_2 = \
                graph.are_angles_equal(
                    t_1[2] + t_1[0] + t_1[1], t_2[2] + t_2[0] + t_2[1])
            if are_lines_equal and are_angles_equal_1 and are_angles_equal_2:
                return True, [*lines_data_needed, *angle_data_needed_1, *angle_data_needed_2]

            t_1 = t_1[1] + t_1[2] + t_1[0]
            t_2 = t_2[1] + t_2[2] + t_2[0]

        return False, []

    out_data = []

    if input_data.data_type == "זוויות שוות":
        triangles_1 = graph.get_all_triangles_from_angle(input_data.fields[0])
        triangles_2 = graph.get_all_triangles_from_angle(input_data.fields[1])

    if input_data.data_type == "קטעים שווים":
        triangles_1 = graph.get_all_triangles_from_line(input_data.fields[0])
        triangles_2 = graph.get_all_triangles_from_line(input_data.fields[1])

    for triangle_1 in triangles_1:
        for triangle_2 in triangles_2:
            for triangle_2_order in [''.join(p) for p in permutations(triangle_2)]:
                are_overlapping, data_needed = are_ordered_triangles_overlapping(
                    triangle_1, triangle_2_order)
                if are_overlapping:
                    out_data.append(data.Data("משולשים חופפים", [
                        triangle_1, triangle_2_order], data_needed, '18'))

    return out_data


def sentence_19(graph, input_data):
    print('19')

    def are_ordered_triangles_overlapping(t_1, t_2):
        are_lines_equal_1, lines_data_needed_1 = graph.are_lines_equal(
            t_1[0] + t_1[1], t_2[0] + t_2[1])
        are_lines_equal_2, lines_data_needed_2 = graph.are_lines_equal(
            t_1[1] + t_1[2], t_2[1] + t_2[2])
        are_lines_equal_3, lines_data_needed_3 = graph.are_lines_equal(
            t_1[2] + t_1[0], t_2[2] + t_2[0])
        if are_lines_equal_1 and are_lines_equal_2 and are_lines_equal_3:
            return True, [*lines_data_needed_1, *lines_data_needed_2, *lines_data_needed_3]

        return False, []

    out_data = []

    triangles_1 = graph.get_all_triangles_from_line(input_data.fields[0])
    triangles_2 = graph.get_all_triangles_from_line(input_data.fields[1])

    for triangle_1 in triangles_1:
        for triangle_2 in triangles_2:
            for triangle_2_order in [''.join(p) for p in permutations(triangle_2)]:
                are_overlapping, data_needed = are_ordered_triangles_overlapping(
                    triangle_1, triangle_2_order)
                if are_overlapping:
                    out_data.append(data.Data("משולשים חופפים", [
                        triangle_1, triangle_2_order], data_needed, '19'))

    return out_data


all_regular_sentences = [

    {
        'sentence_id': '1',
        'loc_type': 'general',
        'representation': "זוויות צמודות משלימות ל180 מעלות",
        'input_data_type': ["גודל זווית"],
        'apply_func': sentence_1
    },
    {
        'sentence_id': '3',
        'loc_type': 'general',
        'representation': "במשולש, מול זוויות שוות צלעות שוות",
        'input_data_type': ["זוויות שוות"],
        'apply_func': sentence_3
    },
    {
        'sentence_id': '4',
        'loc_type': 'general',
        'representation': "במשולש, מול צלעות שוות זוויות שוות",
        'input_data_type': ["קטעים שווים"],
        'apply_func': sentence_4
    },
    {
        'sentence_id': '12',
        'loc_type': 'general',
        'representation': "סכום זוויות במושלש הינו 180°",
        'input_data_type': ["גודל זווית"],
        'apply_func': sentence_12
    },
    {
        'sentence_id': '17',
        'loc_type': 'general',
        'representation': "משפט חפיפה צ.ז.צ",
        'input_data_type': ["זוויות שוות", "קטעים שווים"],
        'apply_func': sentence_17
    },
    {
        'sentence_id': '18',
        'loc_type': 'general',
        'representation': "משפט חפיפה ז.צ.ז",
        'input_data_type': ["זוויות שוות", "קטעים שווים"],
        'apply_func': sentence_18
    },
    {
        'sentence_id': '19',
        'loc_type': 'general',
        'representation': "משפט חפיפה צ.צ.צ",
        'input_data_type': ["קטעים שווים"],
        'apply_func': sentence_19
    },
    {
        'sentence_id': '22',
        'loc_type': 'general',
        'representation': "שני ישרים שיש בינהם זוויות מתאימות שוות הם מקבילים",
        'input_data_type': ["זוויות שוות"],
        'apply_func': sentence_22
    },
    {
        'sentence_id': '25_1',
        'loc_type': 'general',
        'representation': "זוויות מתאימות בין ישרים מקבילים שוות זו לזו",
        'input_data_type': ["ישרים מקבילים"],
        'apply_func': sentence_25_1
    },
    {
        'sentence_id': '25_2',
        'loc_type': 'general',
        'representation': "זוויות מתחלפות בין ישרים מקבילים שוות זו לזו",
        'input_data_type': ["ישרים מקבילים"],
        'apply_func': sentence_25_2
    },
    {
        'sentence_id': '27',
        'loc_type': 'general',
        'representation': "במקבילית כל שתי צלעות נגדיות שוות זו לזו",
        'input_data_type': ["מלבן", "מקבילית", "מעויין", "ריבוע"],
        'apply_func': sentence_27
    },
    {
        'sentence_id': '37',
        'loc_type': 'general',
        'representation': "אלכסוני המלבן שווים זה לזה",
        'input_data_type': ["מלבן"],
        'apply_func': sentence_37
    },
    {
        'sentence_id': '105',
        'loc_type': 'general',
        'representation': "כלל המעבר בין זוויות שהן שוות",
        'input_data_type': ["גודל זווית", "זוויות שוות"],
        'apply_func': sentence_105
    },
    {
        'sentence_id': '106',
        'loc_type': 'general',
        'representation': "חוצה זוויות מחלק את הזווית לשתי זוויות שוות",
        'input_data_type': ["חוצה זווית"],
        'apply_func': sentence_106
    },
    {
        'sentence_id': '107',
        'loc_type': 'general',
        'representation': "כלל המעבר בין קטעים שווים",
        'input_data_type': ["אורך קטע", "קטעים שווים"],
        'apply_func': sentence_107
    },
    {
        'sentence_id': '108',
        'loc_type': 'general',
        'representation': "במשולשים חופפים צלעות מתאימות הן שוות",
        'input_data_type': ["משולשים חופפים"],
        'apply_func': sentence_108
    },
    {
        'sentence_id': '109',
        'loc_type': 'general',
        'representation': "במשולשים חופפים זוויות מתאימות הן שוות",
        'input_data_type': ["משולשים חופפים"],
        'apply_func': sentence_109
    },
    {
        'sentence_id': '110',
        'loc_type': 'general',
        'representation': "במקבילית הצלעות הנגדיות מקבילות אחת לשנייה",
        'input_data_type': ["מלבן", "מקבילית", "מעויין", "ריבוע"],
        'apply_func': sentence_110
    },
    {
        'sentence_id': '111',
        'loc_type': 'general',
        'representation': "במקבילית הצלעות הנגדיות שוות זו לזו",
        'input_data_type': ["מלבן", "מקבילית", "מעויין", "ריבוע"],
        'apply_func': sentence_111
    },
    {
        'sentence_id': '112',
        'loc_type': 'general',
        'representation': "במשולש שווה שוקיים יש זוג צלעות שוות",
        'input_data_type': ["משולש שווה שוקיים"],
        'apply_func': sentence_112
    }

]


def sentence_2(graph, input_data):
    print('2')

    out_data = []

    lines = graph.get_lines()

    for i in range(len(lines) - 1):
        for j in range(i + 1, len(lines)):
            angle_1, angle_2 = graph.get_angle_between_lines(
                lines[i], lines[j])
            if angle_1 is not None and angle_2 is not None:
                out_data.append(
                    data.Data("זוויות שוות", [angle_1, angle_2], [], '2'))

            angle_1, angle_2 = graph.get_angle_between_lines(
                lines[i], lines[j], False)
            if angle_1 is not None and angle_2 is not None:
                out_data.append(
                    data.Data("זוויות שוות", [angle_1, angle_2], [], '2'))

    return out_data


all_sentences_apply_on_start = [{
    'sentence_id': '2',
    'loc_type': 'general',
    'representation': "זוויות קודקודיות שוות זו לזו",
    'input_data_type': [],
    'apply_func': sentence_2
}]

all_sentences = [*all_regular_sentences, *all_sentences_apply_on_start]


def get_sentence_representation(sentence_id):
    for sentence in all_sentences:
        if sentence['sentence_id'] == sentence_id:
            return sentence['representation']

    return None
