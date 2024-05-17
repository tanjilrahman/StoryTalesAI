import Heading from "./Heading";
import Section from "./Section";
import { useEffect, useState } from "react";
import StoryCard from "./StoryCard";
import Button from "./Button";
import { Link } from "react-router-dom";
import axios from "axios";

const Benefits = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    getStories();
  }, []);

  const getStories = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/all-stories/?n=6")
      .then((res) => res.data)
      .then((data) => {
        setStories(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Section id="libary">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-xl"
          title="Our open library has +100 stories"
        />

        <div className="grid grid-cols-1 gap-10 mb-10 md:grid-cols-2 xl:grid-cols-3">
          {stories.map((story) => (
            <StoryCard story={story} key={story.id} />
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
        <Link to="/discover">
          <Button white className="w-48">
            View More +
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default Benefits;
