import React from "react";
import post from "../Images/post.jpg";
import man1 from "../Images/man1.jpg";
import "../App.css";
import Avatar from "@material-ui/core/Avatar";

const Post = ({username, caption, imageUrl}) => {
  return (
    <div className="post">
        
      <div className="post__header">
        <Avatar className="post__avatar" alt="Bill Gates" src={man1} />
        <h3>{username}</h3>
      </div>

      <img className="post__image" src={imageUrl} />
      <h4 className="post__text">
        {" "}
        <strong>{username}:</strong>{caption}
      </h4>
    </div>
  );
};

export default Post;
