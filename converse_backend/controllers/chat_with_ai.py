from flask import jsonify, request
from flask_jwt_extended import get_jwt, jwt_required
import jsonpickle

from models.models import NormalChatHistory
from services.normal_chat_gemini import generate_normal_gemini_response


@jwt_required()
def chatWithAi():
    prompt = request.json.get("input_message", None)
    chat_id = request.json.get("chat_id", None)
    if prompt:
        response, chat_id = generate_normal_gemini_response(prompt, chat_id)
        status = 200
    else:
        response = "Provide Valid Input Message"
        status = 400
    return jsonify({"ai_response": response, "chat_id": chat_id}), status


@jwt_required()
def getNormalChatHistoryList():
    user_id = get_jwt().get("user_id", None)

    normal_chat_history = NormalChatHistory.query.filter_by(user_id=user_id).all()
    chat_list = [
        {"chat_id": chat.id, "chat_name": chat.started_at}
        for chat in normal_chat_history
    ]

    return jsonify({"chat_history_list": chat_list}), 200


@jwt_required()
def getNormalChatHistory():
    user_id = get_jwt().get("user_id", None)

    chat_id = request.args.get("chat_id", None)

    print("Got Here 40")

    normal_chat_history = (
        NormalChatHistory.query.filter_by(user_id=user_id).filter_by(id=chat_id).first()
    )

    if normal_chat_history:
        chat_history = jsonpickle.decode(normal_chat_history.chat_history)
        chat_history_data = [
            {"text": chat.parts[0].text, "role": chat.role} for chat in chat_history
        ]

        return (
            jsonify(
                {
                    "chat_id": normal_chat_history.id,
                    "chat_history": chat_history_data,
                }
            ),
            200,
        )
    else:
        return jsonify({"message": "No History"}), 404


@jwt_required()
def deleteNormalChatHistory():
    user_id = get_jwt().get("user_id", None)

    chat_id = request.args.get("chat_id", None)

    if chat_id:
        normal_chat_history = (
            NormalChatHistory.query.filter_by(user_id=user_id)
            .filter_by(id=chat_id)
            .all()
        )
    else:
        normal_chat_history = NormalChatHistory.query.filter_by(user_id=user_id).all()

    normal_chat_history_delete = NormalChatHistory()
    normal_chat_history_delete.delete_all(normal_chat_history)

    return jsonify({"message": "Successfully deleted the chats"}), 200
