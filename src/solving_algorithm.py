from graph import Graph
from loc import LocsManager
from data import DataManager, Data
from sentence import SentenceManager


def get_problem_data(all_data, graph):
    locs_manager = LocsManager(graph)
    data_manager = DataManager(graph)

    for data in all_data['givenData']:
        data_class = Data(data['dataType'], data['fields'])
        data_manager.add_new_data(data_class)
        locs_manager.classify_data(data_class)

    for data in all_data['proofData']:
        data_manager.add_proof_data(Data(data['dataType'], data['fields']))

    return locs_manager, data_manager


def solve(problem):
    graph = Graph(problem['drawing'])

    Data.next_id = 0
    Data.graph = graph

    locs_manager, data_manager = get_problem_data(problem['data'], graph)
    sentence_manager = SentenceManager(graph)

    apply_sentences = sentence_manager.get_sentences_apply_on_start()
    for apply_sentence in apply_sentences:
        for new_data in apply_sentence.apply():
            locs_manager.classify_data(new_data)
            data_manager.add_new_data(new_data)

    while not data_manager.should_stop_solving():
        for loc in locs_manager.get_locs():
            apply_sentences = sentence_manager.get_sentences_for_loc(loc)

            loc.end_cycle()

            for apply_sentence in apply_sentences:
                for new_data in apply_sentence.apply():
                    if data_manager.is_new_data(new_data):
                        locs_manager.classify_data(new_data)
                        data_manager.add_new_data(new_data)

    print(f'was data proven? {data_manager.is_data_was_proven()}')
    return data_manager.is_data_was_proven()

#  example 1:
#
# solve({'data': {'givenData': [
#     {"dataType": "ישרים מקבילים", "dataId": 4, "representation": "FD || GE", "fields": ["GE", "FD"],
#      "isNeedProof": False}], 'proofData': [
#     {"dataType": "זוויות שוות", "dataId": 5, "representation": "CAD = ∢ABE⦠", "fields": ["ABE", "CAD"],
#      "isNeedProof": True}]}, 'drawing': {
#     'dots': [{'id': 'ge_1', 'name': 'F'}, {'id': 'ge_2', 'name': 'D'}, {'id': 'ge_4', 'name': 'G'},
#              {'id': 'ge_5', 'name': 'E'}, {'id': 'ge_7', 'name': ''}, {'id': 'ge_8', 'name': 'C'},
#              {'id': 'ge_10', 'name': 'A'}, {'id': 'ge_11', 'name': 'B'}],
#     'lines': [{'id': 'ge_3', 'dots': ['ge_1', 'ge_10', 'ge_2']}, {'id': 'ge_6', 'dots': ['ge_4', 'ge_11', 'ge_5']},
#               {'id': 'ge_9', 'dots': ['ge_7', 'ge_11', 'ge_10', 'ge_8']}], 'circles': []}})
