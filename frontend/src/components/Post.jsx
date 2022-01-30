import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { faHeart as Liked } from "@fortawesome/free-solid-svg-icons";
import { faHeart as Unliked } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

function Post({ title, text, user, createdAt, likesCount }) {
  const [liked, setLiked] = useState(false);

  return (
    <Card className="post bg_red mt-5">
      <Card.Body>
        <Card.Title className="post__title ">{title}</Card.Title>
        <p className="post__text">{text}</p>
        <Card.Footer className="post__meta">
          <div className="post__meta__user">{user}</div>
          <div className="post__meta__created-at">{formatDate(createdAt)}</div>
        </Card.Footer>
        {/* <FontAwesomeIcon size={'2x'} icon={Liked} /> */}
        <FontAwesomeIcon
          onMouseEnter={() => setLiked(true)}
          onMouseLeave={() => setLiked(false)}
          size={"2x"}
          icon={liked ? Liked : Unliked}
        />
        <span>{likesCount}</span>
      </Card.Body>
    </Card>
  );
}

export default Post;
