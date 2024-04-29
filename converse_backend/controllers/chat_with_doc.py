import io
from flask import jsonify, request
from flask_jwt_extended import get_jwt, jwt_required
import shutil

from models.models import UploadedDocuments
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
    # file = request.files["file"]
    files = request.files.getlist("file")

    pdf_stream_list = []
    filename_list = []
    for file in files:
        pdf_data = file.read()
        pdf_stream = io.BytesIO(pdf_data)  # Create a stream to read the PDF data
        pdf_stream_list.append(pdf_stream)
        filename_list.append(file.filename)

    create_faiss_index(pdf_stream_list, user_id)

    document_objects = []
    for filename in filename_list:
        document = UploadedDocuments(document_name=filename, user_id=user_id)
        document_objects.append(document)

    uploaded_documents = UploadedDocuments()
    uploaded_documents.bulk_save(document_objects)

    return jsonify({"message": "Index created successfully"}), 200


@jwt_required()
def getUploadedDocsList():
    user_id = get_jwt().get("user_id", None)
    documents = UploadedDocuments.query.filter_by(user_id=user_id).all()
    document_list = [
        {"id": doc.id, "document_name": doc.document_name} for doc in documents
    ]

    return jsonify({"uploaded_documents": document_list}), 200


@jwt_required()
def deleteUploadedDocs():
    user_id = get_jwt().get("user_id", None)

    index_path = f"faiss_indices/{user_id}-faiss_index"
    try:
        shutil.rmtree(index_path)
    except Exception as e:
        print(str(e))
        return (
            jsonify({"message": "Deletion Unsuccessful", "deleted_documents": []}),
            400,
        )

    documents = UploadedDocuments.query.filter_by(user_id=user_id).all()
    uploaded_documents = UploadedDocuments()
    uploaded_documents.delete_all(documents)

    document_list = [
        {"id": doc.id, "document_name": doc.document_name} for doc in documents
    ]

    return (
        jsonify(
            {"message": "Successfully Deleted", "deleted_documents": document_list}
        ),
        200,
    )
