from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Post, User, Comment, liked_posts, db

post_routes = Blueprint('posts', __name__)


@post_routes.route('/feed')
def get_posts():
    """
    Query for all posts
    """
    posts = Post.query.all()

    if posts:
        posts_with_users = []
        for post in posts:
            post_data = post.to_dict()
            user_data = post.user.to_dict()
            post_with_users = {'post': post_data, 'user': user_data}
            posts_with_users.append(post_with_users)

        return {'posts': posts_with_users}
    else:
        return {'post': []}



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


@post_routes.route('/feed/comments')
def get_post_comments():

    comments = Comment.query.all()

    if comments:
        comments_with_users = []
        for comment in comments:
            comment_data = comment.to_dict()
            user_data = comment.user.to_dict()
            comment_with_user = {'comment': comment_data, 'user': user_data}
            comments_with_users.append(comment_with_user)
        return {'comments': comments_with_users}
    else:
        return {'comments': []}


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

    comment.comment = data.get('updateComment', comment.comment)

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
    

@post_routes.route('/feed/likedPosts/<int:user_id>')
def get_liked_posts(user_id):
    """
    GET all of user liked post 
    """

    user = User.query.get(user_id)
    if not user:
        return {'error': 'User not found'}, 404

    liked_posts_query = db.session.query(Post).join(liked_posts).filter_by(owner_id=user_id).all()

    return {'likedPosts': [post.to_dict() for post in liked_posts_query]}

@post_routes.route('/feed/unlikePost/<int:post_id>/<int:user_id>', methods=['PUT'])
@login_required
def update_liked_posts(post_id, user_id):
    """
    Query to remove like from a posts
    """

    def filter_likes(post):
        if post.id != post_id:
            return True
        return False

    user = User.query.get(user_id)
    user.likes = list(filter(filter_likes, user.likes))
    db.session.commit()

    return {'message': 'Liked post successfully removed', 'status': 200}

@post_routes.route('/feed/likePost/<int:post_id>/<int:user_id>', methods=['POST'])
@login_required
def add_liked_post(post_id, user_id):
    post = Post.query.get(post_id)

    if not post:
        return jsonify(message='Post not found'), 404

    current_user.likes.append(post)
    db.session.commit()

    return jsonify(message='Post added to liked posts')
