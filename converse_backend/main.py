from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from controllers.chat_with_ai import (
    chatWithAi,
    deleteNormalChatHistory,
    getNormalChatHistory,
    getNormalChatHistoryList,
)
from controllers.chat_with_db import chatWithDb, populateDb
from controllers.chat_with_doc import (
    chatWithDoc,
    deleteUploadedDocs,
    getUploadedDocsList,
    uploadDoc,
)
from utils.decouple_config_util import DecoupleConfigUtil
from models.models import db
from controllers.register import register
from controllers.login import login


config = DecoupleConfigUtil.get_env_config()

app = Flask(__name__)
app.secret_key = config("APP_SECRET_KEY")

app.config["SQLALCHEMY_DATABASE_URI"] = config("DATABASE_URI")
app.config["JWT_SECRET_KEY"] = config("JWT_SECRET_KEY")

db.init_app(app)
jwt = JWTManager(app)

CORS(
    app,
    origins=config(
        "CORS_ORIGINS", cast=lambda v: [item.strip() for item in v.split(",")]
    ),
)

with app.app_context():
    db.create_all()


app.route("/register", methods=["POST"])(register)
app.route("/login", methods=["POST"])(login)
app.route("/chat_with_db", methods=["POST"])(chatWithDb)
app.route("/chat_with_doc", methods=["POST"])(chatWithDoc)
app.route("/chat_with_ai", methods=["POST"])(chatWithAi)
app.route("/normal_chat_history_list", methods=["GET"])(getNormalChatHistoryList)
app.route("/normal_chat_history_list", methods=["DELETE"])(deleteNormalChatHistory)
app.route("/normal_chat_history", methods=["GET"])(getNormalChatHistory)
app.route("/upload_doc", methods=["POST"])(uploadDoc)
app.route("/upload_doc", methods=["GET"])(getUploadedDocsList)
app.route("/upload_doc", methods=["DELETE"], endpoint="delete_uploaded_docs")(
    deleteUploadedDocs
)
app.route("/populate_db", methods=["POST"])(populateDb)


if __name__ == "__main__":
    app.run(debug=True, host=config("HOST"), port=config("PORT"))
    # app.run(debug=True)
