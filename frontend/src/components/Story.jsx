import React from "react";
function Story({ story, onDelete }) {
  const formattedDate = new Date(story.created_at).toLocaleDateString("en-US");
  return (
    <div>
      <p>{story.title}</p>
      <img alt={story.title} src={story.image} />
      <p>{story.content}</p>
      <p>{formattedDate}</p>
      <button onClick={() => onDelete(story.id)}>Delete</button>
    </div>
  );
}

export default Story;
