from flask import jsonify
from flask_jwt_extended import jwt_required

from services.database_sql_talk_gemini import generate_gemini_response


@jwt_required()
def chatWithDoc():
    return jsonify({"ai_response": "Not Implemented Yet"}), 200
