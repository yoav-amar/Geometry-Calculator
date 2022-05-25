from data import Data


class SentenceManager:
    def __init__(self, graph):
        self.graph = graph
        self.sentences = {}
        for sentence in all_sentences:
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
            out_data.append(Data("זוויות שוות", [angle_1_1, angle_2_1], [input_data.data_id], '25_1'))
        if angle_1_2 is not None and angle_2_2 is not None:
            out_data.append(Data("זוויות שוות", [angle_1_2, angle_2_2], [input_data.data_id], '25_1'))

        angle_3_1, angle_3_2 = graph.get_angle_between_lines(line, line_1, False)
        angle_4_1, angle_4_2 = graph.get_angle_between_lines(line, line_2, False)
        if angle_3_1 is not None and angle_4_1 is not None:
            out_data.append(Data("זוויות שוות", [angle_3_1, angle_4_1], [input_data.data_id], '25_1'))
        if angle_3_2 is not None and angle_4_2 is not None:
            out_data.append(Data("זוויות שוות", [angle_3_2, angle_4_2], [input_data.data_id], '25_1'))

    return out_data


def sentence_105(graph, input_data):
    print('105')
    return graph.angle_manager.apply_transition_rule('105', input_data)


all_sentences = [{
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
                out_data.append(Data("זוויות שוות", [angle_1, angle_2], [], '2'))

            angle_1, angle_2 = graph.get_angle_between_lines(lines[i], lines[j], False)
            if angle_1 is not None and angle_2 is not None:
                out_data.append(Data("זוויות שוות", [angle_1, angle_2], [], '2'))

    return out_data


all_sentences_apply_on_start = [{
    'sentence_id': '2',
    'loc_type': 'general',
    'representation': "זוויות קודקודיות שוות זו לזו",
    'input_data_type': [],
    'apply_func': sentence_2
}]
