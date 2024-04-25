import io
from PyPDF2 import PdfReader
from flask import jsonify, request
from flask_jwt_extended import jwt_required

from services.document_talk_gemini import (
    create_faiss_index,
    generate_document_gemini_response,
)


@jwt_required()
def chatWithDoc():
    # file = request.files['file']
    prompt = request.json.get("input_message", None)
    if prompt:
        response = generate_document_gemini_response(prompt)
        status = 200
    else:
        response = "Provide Valid Input Message"
        status = 400
    return jsonify({"ai_response": response}), status


@jwt_required()
def uploadDoc():
    file = request.files["file"]
    # uploaded_file = file.read()
    # pdf_file = io.BytesIO(uploaded_file)
    # # print(file)
    # create_faiss_index(pdf_file)

    pdf_data = file.read()
    pdf_stream = io.BytesIO(pdf_data)  # Create a stream to read the PDF data
    pdf_stream_list = [pdf_stream]
    # pdf_reader = PdfReader(pdf_stream)

    create_faiss_index(pdf_stream_list)

    # Extract text from the first page
    # first_page = pdf_reader.pages[0]
    # text = first_page.extract_text()
    # print(text)

    return jsonify({"message": "Index created successfully"}), 200
