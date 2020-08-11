import React, { useEffect, useState } from 'react';
import "./Post.css";
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase';
import firebase from 'firebase';


function Post({ imageUrl, username, caption, postId, user }) {

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (e) => {
        e.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');

    }

    return (
        <div className="post">
            <div className="post__heading">
                <Avatar src="" alt="Rana" className="post__avatar" />
                <h3 className="username">{username}</h3>
            </div>
            <img className="post__image" src={imageUrl} alt="" />
            <p className="post__text"><strong>{username}</strong>: {caption}</p>
            <div className="post__comments">
                {
                    comments.map((comment) => (
                        <p className="all__comments">
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                    ))
                }

            </div>
            {user && (
                <form className="post__commentBox">
                    <input
                        className="post__comment"
                        type="text"
                        placeholder="Add a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button disabled={!comment} className="comment__button" type="submit" onClick={postComment}>Post</button>
                </form>
            )}
        </div>
    );
};

export default Post;
