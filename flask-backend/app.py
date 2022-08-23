from email.policy import default
from flask import Flask, request, make_response, jsonify, json
from flask_cors import CORS
import spacy
from model.EntitiesResponse import EntitiesResponse

app = Flask(__name__)
ors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"
nlp = spacy.load("en_core_web_lg")

@app.route("/", methods=['POST'])
def ner():
    rawText = request.json['rawtext']
    if not rawText:
        return make_response("No text is present", 400)
    doc = nlp(rawText)
    parsedHtml = spacy.displacy.render(doc, style="ent", minify=True)
    return make_response(json.dumps(EntitiesResponse(parsedHtml), default=vars), 200)