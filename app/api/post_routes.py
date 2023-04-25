from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Post, User, Comment, db

post_routes = Blueprint('posts', __name__)


@post_routes.route('/feed')
def get_posts():
    """
    Query for all posts
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
    post = Post.query.get(post_id)
    data = request.get_json()

    if post:
        post.post = data.get('updatePost')
        db.session.commit()
        return {'post': post.to_dict()}
    else:
        return {'error': 'Post not found', 'status': 404}


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


@post_routes.route('/feed/<int:post_id>/comments')
def get_post_comments(post_id):

    comments = Comment.query.filter_by(comment_id=post_id).all()

    if not comments:
        return {'message': 'There are no comments for this post'}, 404

    return {'comments': [comment.to_dict() for comment in comments]}


@post_routes.route('/feed/<int:post_id>/newComment/<int:user_id>', methods=['POST'])
def create_comment(post_id, user_id):
    """
    Create a Comment
    """
    data = request.form

    comment = Comment(
        comment=data.get('comment'),
        owner_id=user_id,
        comment_id=post_id
    )

    db.session.add(comment)
    db.session.commit()

    return {'comment': comment.to_dict()}


@post_routes.route('/feed/updateComment/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    """
    Update a Comment
    """
    comment = Comment.query.get(comment_id)

    if not comment:
        return {'error': 'Comment not found', 'status': 404}

    data = request.get_json()

    comment.comment = data.get('comment', comment.comment)

    db.session.commit()

    return {'comment': comment.to_dict()}


@post_routes.route('/feed/deleteComment/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    """
    Delete a Comment
    """
    comment = Comment.query.get(comment_id)

    if comment:
        db.session.delete(comment)
        db.session.commit()
        return {'message': 'Comment deleted successfully', 'status': 200}
    else:
        return {'error': 'Comment not found', 'status': 404}
