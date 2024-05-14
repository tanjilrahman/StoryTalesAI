import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function StoryCard({ story, onDelete }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const formattedDate = new Date(story.created_at).toLocaleDateString("en-US");

  useEffect(() => {
    const data = JSON.parse(story.content);
    setTitle(data.title);
    setImage(JSON.parse(story.image)[0]);
  }, [story]);

  return (
    <div>
      <Link to={`/story/${story.id}`}>
        <h3>{title}</h3>
      </Link>

      <img alt={story.title} src={image} />

      <p>{formattedDate}</p>
    </div>
  );
}

export default StoryCard;
