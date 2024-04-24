from flask import jsonify
from flask_jwt_extended import jwt_required

from services.database_sql_talk_gemini import generate_gemini_response


@jwt_required()
def chatWithDb():
    response = generate_gemini_response("How many car models are there?")
    return jsonify({"ai_response": response}), 200
