from data import Data


class SentenceManager:
    def __init__(self, graph):
        self.graph = graph
        self.sentences = {}
        for sentence in all_sentences:
            if sentence['loc_type'] not in self.sentences:
                self.sentences[sentence['loc_type']] = []

            self.sentences[sentence['loc_type']].append(Sentence(sentence))
        pass

    def get_sentences_for_loc(self, loc):
        sentences_to_apply = []

        if loc.name_type in self.sentences:
            for sentence in self.sentences[loc.name_type]:
                for new_data in loc.new_data:
                    if new_data.data_type == sentence.input_data_type:
                        sentences_to_apply.append(SentenceToApply(sentence, new_data, self.graph))

        return sentences_to_apply


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
            data_class = Data("זוויות שוות", [angle_1_1, angle_2_1], [input_data.data_id])
            out_data.append(data_class)
        if angle_1_2 is not None and angle_2_2 is not None:
            out_data.append(Data("זוויות שוות", [angle_1_2, angle_2_2], [input_data.data_id]))

        angle_3_1, angle_3_2 = graph.get_angle_between_lines(line, line_1, False)
        angle_4_1, angle_4_2 = graph.get_angle_between_lines(line, line_2, False)
        if angle_3_1 is not None and angle_4_1 is not None:
            out_data.append(Data("זוויות שוות", [angle_3_1, angle_4_1], [input_data.data_id]))
        if angle_3_2 is not None and angle_4_2 is not None:
            out_data.append(Data("זוויות שוות", [angle_3_2, angle_4_2], [input_data.data_id]))

    return out_data


all_sentences = [{
    'sentence_id': '25_1',
    'loc_type': 'general',
    'representation': "זוויות מתאימות בין ישרים מקבילים הן שוות",
    'input_data_type': "ישרים מקבילים",
    'apply_func': sentence_25_1
}]
