import React from "react";
import { Card } from "react-bootstrap";

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

function Post({ title, text }) {
  return (
    <Card className="post bg_red">
      <Card.Body>
        <Card.Title className="post__title ">{title}</Card.Title>
        <p className="post__text">{text}</p>
        <div className="post__meta">
          <div className="post__meta__user"></div>
          <div className="post__meta__created-at"></div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Post;
