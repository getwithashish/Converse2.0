from flask import jsonify
from flask_jwt_extended import jwt_required


@jwt_required()
def chatWithDb():
    return jsonify({"ai_response": "Not Implemented Yet"}), 200
