import pymongo

DB_NAME = "geometry-calculator"
CONN_STRING = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=" \
              "true&ssl=false"

client = pymongo.MongoClient(CONN_STRING)
db = client["ry"]
sentences_db = db["sentences"]


def add_sentence(sentence: str, group_name: str) -> None:
    sentences_group = sentences_db.find_one({"group_name": group_name}, {"sentences": True})
    if not sentences_group:
        sentences_db.insert_one({"group_name": group_name, "sentences": [sentence]})
        return
    sentences_list = sentences_group["sentences"]
    if sentence in set(sentences_list):
        return
    sentences_list.append(sentence)
    sentences_db.update_one({"group_name": group_name}, {"$set": {"sentences": sentences_list}})


def get_sentences(group_name: str) -> list:
    sentences_group = sentences_db.find_one({"group_name": group_name}, {"sentences": True})
    if not sentences_group:
        return []
    return sentences_group["sentences"]


if __name__ == '__main__':
    print(get_sentences("yoav"))
    print(get_sentences("square"))
    print(get_sentences("ppp"))
