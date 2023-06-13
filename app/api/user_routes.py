from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/about', methods=['POST'])
@login_required
def add_user_about(id):
    """
    Add the 'about' column to an existing user who doesn't have one
    """
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    if user.about:
        return jsonify({'message': 'User already has an about column'}), 400

    about = request.json.get('about')
    if not about:
        return jsonify({'message': 'About content is required'}), 400

    user.about = about
    db.session.commit()

    return jsonify({'message': 'About added to user successfully'})

@user_routes.route('about/<int:user_id>/update', methods=['PUT'])
@login_required
def update_user_about(user_id):
    """
    Update the 'about' column of a user
    """
    user = User.query.get(user_id)
    data = request.get_json()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    user.about = data.get('updateAbout')
    db.session.commit()

    return jsonify({'message': 'User about updated successfully'})

@user_routes.route('/<int:id>/about', methods=['DELETE'])
@login_required
def delete_user_about(id):
    """
    Delete the 'about' column of a user
    """
    user = User.query.get(id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    user.about = ''
    db.session.commit()

    return jsonify({'message': 'User about deleted successfully'})
