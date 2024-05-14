import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import NotFound from "./NotFound";
function Story() {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [paragraphs, setParagraphs] = useState([]);
  const [images, setImages] = useState([]);
  const [formattedDate, setFormattedDate] = useState();
  const [notFound, setNotFound] = useState(false);

  const getStory = () => {
    api
      .get(`/api/story/${params.storyId}/`)
      .then((res) => res.data)
      .then((data) => {
        const story = JSON.parse(data.content);
        setTitle(story.title);
        setParagraphs(story.story);
        setImages(JSON.parse(data.image));
        setFormattedDate(
          new Date(story.created_at).toLocaleDateString("en-US")
        );
      })
      .catch((err) => err.response.status === 404 && setNotFound(true));
  };

  useEffect(() => {
    getStory();
  }, []);

  const middle = (length) => {
    return Math.round(length / 2) - 1;
  };

  if (notFound) return <NotFound />;
  return (
    <div>
      <h3>{title}</h3>

      {paragraphs.map((paragraph, i) => (
        <div key={i}>
          <p>{paragraph}</p>
          {i === 0 && <img alt={title} src={images[0]} />}
          {i === middle(paragraphs.length) - 2 && (
            <img alt={title} src={images[1]} />
          )}
          {/* {i === paragraphs.length - 2 && (
            <img alt={title} src={images[2]} />
          )} */}
          {i === paragraphs.length - 3 && <img alt={title} src={images[2]} />}
        </div>
      ))}

      <p>{formattedDate}</p>
      <button onClick={() => onDelete(story.id)}>Delete</button>
    </div>
  );
}

export default Story;
