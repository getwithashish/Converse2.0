from flask_jwt_extended import get_jwt
import google.generativeai as genai
import jsonpickle

from models.models import NormalChatHistory
from utils.decouple_config_util import DecoupleConfigUtil


config = DecoupleConfigUtil.get_env_config()


GOOGLE_API_KEY = config("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY, transport="rest")


def generate_normal_gemini_response(prompt, chat_id):
    user_id = get_jwt().get("user_id", None)

    model = genai.GenerativeModel("gemini-pro")

    if chat_id:
        normal_chat_history = NormalChatHistory.query.filter_by(
            user_id=user_id
        ).filter_by(id=chat_id).first()
        chat_history = jsonpickle.decode(normal_chat_history.chat_history)
    else:
        chat_history = []
        normal_chat_history = NormalChatHistory(
            chat_history=chat_history, user_id=user_id
        )
        normal_chat_history.save()

    chat = model.start_chat(history=chat_history)
    response = chat.send_message(prompt)

    chat_history = chat.history
    chat_history_json_string = jsonpickle.encode(chat_history)

    normal_chat_history.chat_history = chat_history_json_string
    normal_chat_history.save()

    response = response.candidates[0].content.parts[0]

    return response.text, normal_chat_history.id
