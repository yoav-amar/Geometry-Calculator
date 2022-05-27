import data


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
            self.sentences_apply_on_start.append(SentenceToApply(Sentence(sentence), None, self.graph))

    def get_sentences_for_loc(self, loc):
        sentences_to_apply = []

        if loc.name_type in self.sentences:
            for sentence in self.sentences[loc.name_type]:
                for new_data in loc.new_data:
                    if new_data.data_type in sentence.input_data_type:
                        sentences_to_apply.append(SentenceToApply(sentence, new_data, self.graph))

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
            out_data.append(data.Data("זוויות שוות", [angle_1_1, angle_2_1], [input_data.data_id], '25_1'))
        if angle_1_2 is not None and angle_2_2 is not None:
            out_data.append(data.Data("זוויות שוות", [angle_1_2, angle_2_2], [input_data.data_id], '25_1'))

        angle_3_1, angle_3_2 = graph.get_angle_between_lines(line, line_1, False)
        angle_4_1, angle_4_2 = graph.get_angle_between_lines(line, line_2, False)
        if angle_3_1 is not None and angle_4_1 is not None:
            out_data.append(data.Data("זוויות שוות", [angle_3_1, angle_4_1], [input_data.data_id], '25_1'))
        if angle_3_2 is not None and angle_4_2 is not None:
            out_data.append(data.Data("זוויות שוות", [angle_3_2, angle_4_2], [input_data.data_id], '25_1'))

    return out_data


def sentence_105(graph, input_data):
    print('105')
    return graph.angle_manager.apply_transition_rule('105', input_data)


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


def sentence_106(graph, input_data):
    print('106')
    out_data = []
    angle = input_data.fields[1]
    line = input_data.fields[0]

    dot_new_angles = line[0]
    if angle[1] == line[0]:
        dot_new_angles = line[1]

    out_data.append(data.Data("זוויות שוות", [angle[0] + angle[1] + dot_new_angles, dot_new_angles + angle[1] + angle[2]],
                         [input_data.data_id], '106'))

    angle_size, data_id = graph.get_angle_size(angle)

    if angle_size is not None:
        out_data.append(data.Data("גודל זווית", [str(angle_size / 2), angle[0] + angle[1] + dot_new_angles],
                             [input_data.data_id, data_id], '106'))

        out_data.append(data.Data("גודל זווית", [str(angle_size / 2), dot_new_angles + angle[1] + angle[2]],
                             [input_data.data_id, data_id], '106'))

    return out_data


def sentence_22(graph, input_data):
    print('22')

    out_data = []

    angle_1 = input_data.fields[0]
    angle_2 = input_data.fields[1]

    lines_1 = [graph.get_line_id(angle_1[0] + angle_1[1]), graph.get_line_id(angle_1[1] + angle_1[2])]
    lines_2 = [graph.get_line_id(angle_2[0] + angle_2[1]), graph.get_line_id(angle_2[1] + angle_2[2])]

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
               (inter_line.index(inter_line_2) - inter_line.index(angle_2[angle_2_dot_on_inter_line_index]))

    direct_2 = (line_1_dots.index(inter_line_1) - line_1_dots.index(angle_1[2 - angle_1_dot_on_inter_line_index])) * \
               (line_2_dots.index(inter_line_2) - line_2_dots.index(angle_2[2 - angle_2_dot_on_inter_line_index]))

    if direct_1 > 0 and direct_2 > 0:
        out_data.append(data.Data("ישרים מקבילים", [line_1, line_2], [input_data.data_id], '22'))

    return out_data


all_regular_sentences = [
    {
        'sentence_id': '12',
        'loc_type': 'general',
        'representation': "סכום זוויות במושלש הינו 180°",
        'input_data_type': ["גודל זווית"],
        'apply_func': sentence_12
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
    }
]


def sentence_2(graph, input_data):
    print('2')

    out_data = []

    lines = graph.get_lines()

    for i in range(len(lines) - 1):
        for j in range(i + 1, len(lines)):
            angle_1, angle_2 = graph.get_angle_between_lines(lines[i], lines[j])
            if angle_1 is not None and angle_2 is not None:
                out_data.append(data.Data("זוויות שוות", [angle_1, angle_2], [], '2'))

            angle_1, angle_2 = graph.get_angle_between_lines(lines[i], lines[j], False)
            if angle_1 is not None and angle_2 is not None:
                out_data.append(data.Data("זוויות שוות", [angle_1, angle_2], [], '2'))

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
