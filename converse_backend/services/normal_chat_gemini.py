import google.generativeai as genai
import google.ai.generativelanguage as glm


GOOGLE_API_KEY = "AIzaSyDTzAF3jNsbktskJLC_EIBz0_QKPFdnHds"
genai.configure(api_key=GOOGLE_API_KEY, transport="rest")


def generate_normal_gemini_response(prompt):

    model = genai.GenerativeModel("gemini-pro")

    chat = model.start_chat()
    response = chat.send_message(prompt)
    response = response.candidates[0].content.parts[0]

    return response.text
