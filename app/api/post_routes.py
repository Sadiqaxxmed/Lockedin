from flask import Blueprint, request
# from flask_login import login_required
from app.models import Post, db

post_routes = Blueprint('posts', __name__)


@post_routes.route('/feed')
def get_posts():
    """
    Query for all posts and returns them in a list of user dictionaries
    """
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}


@post_routes.route('/feed/newPost/<int:user_id>', methods=['POST'])
def create_posts(user_id):
    """
    Create a post
    """
    data = request.form

    post = Post(
        post=data.get('post'),
        owner_id=user_id
    )

    db.session.add(post)
    db.session.commit()

    return {'Post': post.to_dict()}

@post_routes.route('/feed/updatePost/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    """
    Update a post
    """
    data = request.get_json()

    post = Post.query.get(post_id)
    post.post = data['post']

    db.session.commit()

    return {'Post': post.to_dict()}

@post_routes.route('/feed/deletePost/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    """
    Delete a post
    """
    post = Post.query.get(post_id)

    if not post:
        return {'error': 'Post not found'}

    db.session.delete(post)
    db.session.commit()

    return {'message': 'Post deleted successfully'}
