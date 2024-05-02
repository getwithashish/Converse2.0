from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash


db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

    documents = db.relationship("UploadedDocuments", back_populates="user")

    def __repr__(self):
        return "<User %r>" % self.username

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def save(self):
        db.session.add(self)
        db.session.commit()


class UploadedDocuments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    document_name = db.Column(db.String(80), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    user = db.relationship("User", back_populates="documents")

    def __repr__(self):
        return "<UploadedDocuments %r>" % self.document_name

    def save(self):
        db.session.add(self)
        db.session.commit()

    def bulk_save(self, document_objects):
        db.session.bulk_save_objects(document_objects)
        db.session.commit()

    def delete_all(self, documents):
        for doc in documents:
            db.session.delete(doc)

        db.session.commit()


class NormalChatHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chat_history = db.Column(db.JSON)
    started_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    def __repr__(self):
        return "<NormalChatHistory %r>" % self.id + "-" + self.user_id

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete_all(self, chat_history):
        for chat in chat_history:
            db.session.delete(chat)
        db.session.commit()
