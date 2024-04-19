from flask import request, jsonify

from models.models import User


def register():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    if not username or not password:
        return jsonify({"msg": "Username and password are required"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "Username already exists"}), 400

    new_user = User(username=username)
    new_user.set_password(password)
    new_user.save()

    return jsonify({"msg": "User created successfully"}), 201
