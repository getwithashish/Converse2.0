import google.generativeai as genai

from utils.decouple_config_util import DecoupleConfigUtil


config = DecoupleConfigUtil.get_env_config()


GOOGLE_API_KEY = config("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY, transport="rest")


def generate_normal_gemini_response(prompt):

    model = genai.GenerativeModel("gemini-pro")

    chat = model.start_chat()
    response = chat.send_message(prompt)
    response = response.candidates[0].content.parts[0]

    return response.text
