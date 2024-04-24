from flask import jsonify, request
from flask_jwt_extended import jwt_required

from services.normal_chat_gemini import generate_normal_gemini_response


@jwt_required()
def chatWithAi():
    prompt = request.json.get("input_message", None)
    if prompt:
        response = generate_normal_gemini_response(prompt)
        status = 200
    else:
        response = "Provide Valid Input Message"
        status = 400
    return jsonify({"ai_response": response}), status
