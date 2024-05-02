from flask import jsonify, request
from flask_jwt_extended import jwt_required

from services.populate_db import PopulateDB
from services.database_sql_talk_gemini import generate_gemini_response


@jwt_required()
def chatWithDb():
    prompt = request.json.get("input_message", None)
    if prompt:
        response = generate_gemini_response(prompt)
        status = 200
    else:
        response = "Provide Valid Input Message"
        status = 400
    return jsonify({"ai_response": response}), status


@jwt_required()
def populateDb():
    populateDb = PopulateDB()
    populateDb.create_tables()
    return jsonify({"message": "Successfully Populated"}), 200
