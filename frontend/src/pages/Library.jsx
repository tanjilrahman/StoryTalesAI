import React, { useEffect, useState } from "react";
import StoryCard from "../components/StoryCard";
import api from "../api";

function Library() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    getStories();
  }, []);

  const getStories = () => {
    api
      .get("/api/story/")
      .then((res) => res.data)
      .then((data) => {
        setStories(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteStory = (id) => {
    api
      .delete(`/api/stories/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Story deleted!");
        else alert("Failed to delete story.");
        getStories();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>
        <h2>Stories</h2>
        {stories.map((story) => (
          <StoryCard story={story} onDelete={deleteStory} key={story.id} />
        ))}
      </div>
    </div>
  );
}

export default Library;
