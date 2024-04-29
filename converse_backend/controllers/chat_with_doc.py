import io
from flask import jsonify, request
from flask_jwt_extended import get_jwt, jwt_required

from services.document_talk_gemini import (
    create_faiss_index,
    generate_document_gemini_response,
)


@jwt_required()
def chatWithDoc():
    # file = request.files['file']
    user_id = get_jwt().get("user_id", None)
    prompt = request.json.get("input_message", None)
    if prompt:
        response = generate_document_gemini_response(prompt, user_id)
        status = 200
    else:
        response = "Provide Valid Input Message"
        status = 400
    return jsonify({"ai_response": response.get("output_text")}), status


@jwt_required()
def uploadDoc():
    user_id = get_jwt().get("user_id", None)
    file = request.files["file"]

    pdf_data = file.read()
    pdf_stream = io.BytesIO(pdf_data)  # Create a stream to read the PDF data
    pdf_stream_list = [pdf_stream]

    create_faiss_index(pdf_stream_list, user_id)

    return jsonify({"message": "Index created successfully"}), 200
