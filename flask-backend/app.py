from flask import Flask, request, make_response, json
from flask_cors import CORS
import spacy
from os import environ
from model.EntitiesResponse import EntitiesResponse

app = Flask(__name__)
ors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
model = environ.get("NER_MODEL") or "en_core_web_lg"
nlp = spacy.load(model)

@app.route("/", methods=['POST'])
def ner():
    rawText = request.json['rawtext']
    if not rawText:
        return make_response("No text is present", 400)
    doc = nlp(rawText)
    parsedHtml = spacy.displacy.render(doc, style="ent", minify=True)
    return make_response(json.dumps(EntitiesResponse(parsedHtml), default=vars), 200)