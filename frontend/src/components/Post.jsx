import React, { useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { faHeart as Liked } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Unliked } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const formatDate = (date) => {
  const event = new Date(date);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return event.toLocaleDateString(undefined, options);
};

function Post({ postData, user }) {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(postData.users_liked.includes(user.id));
  const [likesCount, setLikesCount] = useState(postData.likes);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  const likePost = async () => {
    await axios.post(
      `http://localhost:8000/api/posts/${postData.id}/like/`,
      {},
      config
    );
    setLiked(true);
    setLikesCount(likesCount + 1);
  };

  const unlikePost = async () => {
    await axios.post(
      `http://localhost:8000/api/posts/${postData.id}/unlike/`,
      {},
      config
    );
    setLiked(false);
    setLikesCount(likesCount - 1);
  };

  return (
    <Card className="post bg_red mt-5">
      <Card.Body>
        <Card.Title className="post__title ">{postData.title}</Card.Title>
        <p className="post__text">{postData.text}</p>
        <Card.Footer className="post__meta">
          <div className="post__meta__user">{postData.author.first_name}</div>
          <div className="post__meta__created-at">
            {formatDate(postData.created_at)}
          </div>
        </Card.Footer>
        {/* <FontAwesomeIcon size={'2x'} icon={Liked} /> */}
        <FontAwesomeIcon
          onClick={() => {
            if (user.id) {
              liked ? unlikePost() : likePost();
            } else {
              navigate("/login");
            }
          }}
          size={"2x"}
          icon={liked ? Liked : Unliked}
        />
        <span>{likesCount}</span>
      </Card.Body>
    </Card>
  );
}

export default Post;
