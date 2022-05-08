class SentenceManager:
    def __init__(self, graph):
        self.graph = graph
        self.sentences = {}

        # TODO: load sentences
        pass

    def get_sentences_for_loc(self, loc):
        if loc.name_type in self.sentences:
            return self.sentences[loc.name_type]

        return []

    def create(self, type_id, fields, locs):
        return Sentence(self.sentences[type_id], fields, locs)


class Sentence:
    def __init__(self, sentece_type, fields, locs):
        self.sentece_type = sentece_type
        self.fields = fields
        self.locs = locs

    def apply(self):
        return self.sentece_type.apply(self.fields, self.locs)




# {
#     'type_id': "זוויות שוות",
#     'representation': `${ts2} = ∢${ts1}⦠`,
#     'apply': (fields)=>{ }
# }