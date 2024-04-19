from flask import Flask
from flask_jwt_extended import JWTManager

from controllers.chat_with_db import chatWithDb
from models.models import db
from controllers.register import register
from controllers.login import login


app = Flask(__name__)
app.secret_key = 'this_is_my_secret_key'

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:password@localhost:5432/postgres"
app.config['JWT_SECRET_KEY'] = 'this_is_my_secret_jwt_secret_key'  # Change this to a secure random key

db.init_app(app)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()


app.route('/register', methods=['POST'])(register)
app.route('/login', methods=['POST'])(login)
app.route('/chat_with_db', methods=['POST'])(chatWithDb)


if __name__ == "__main__":
    app.run(debug=True)
