import React, { useEffect, useState } from "react";
import StoryCard from "../components/StoryCard";
import api from "../api";

function Discover() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    getStories();
  }, []);

  const getStories = () => {
    api
      .get("/api/all-stories/")
      .then((res) => res.data)
      .then((data) => {
        setStories(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div>
        <h2>Stories</h2>
        {stories.map((story) => (
          <StoryCard story={story} key={story.id} />
        ))}
      </div>
    </div>
  );
}

export default Discover;
