import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import NotFound from "./NotFound";
import Sidebar from "../components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "../components/Button";
import Header from "../components/Header";
import SkeletonStory from "../components/SkeletonStory";
import Moment from "react-moment";
import axios from "axios";

function Story() {
  const navigate = useNavigate();
  const params = useParams();
  const [authUser, setAuthUser] = useState(localStorage.getItem("username"));
  const [username, setUsername] = useState("Anonymous");
  const [title, setTitle] = useState("");
  const [paragraphs, setParagraphs] = useState([]);
  const [images, setImages] = useState([]);
  const [formattedDate, setFormattedDate] = useState();
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const getStory = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/story/${params.storyId}/`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        const story = JSON.parse(data.content);
        if (data.author_first === "" || data.author_last === "") {
          setUsername("Anonymous");
        } else {
          setUsername(data.author_first + " " + data.author_last);
        }
        setTitle(story.title);
        setParagraphs(story.story);
        setImages(JSON.parse(data.image));
        setFormattedDate(data.created_at);
        setLoading(false);
      })
      .catch((err) => err.response.status === 404 && setNotFound(true));
  };

  const deleteStory = (id) => {
    api
      .delete(`/api/stories/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) navigate("/discover");
        else alert("Failed to delete story.");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getStory();
  }, []);

  const middle = (length) => {
    return Math.round(length / 2) - 1;
  };

  if (notFound) return <NotFound />;
  return (
    <>
      <div className="flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="md:hidden">
          <Header />
        </div>
        <div className="w-full max-w-4xl mx-auto">
          {loading ? (
            <SkeletonStory />
          ) : (
            <div className="max-w-4xl p-6 mx-auto mt-20 md:mt-0">
              <div className="flex items-center justify-between mt-8 mb-10">
                <div className="flex space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="">
                    <p className="font-bold ">{username}</p>
                    <p>
                      Published at{" "}
                      <Moment
                        className="font-light"
                        date={formattedDate}
                        format="MMMM Do YYYY"
                      />
                    </p>
                  </div>
                </div>
                <div>
                  {authUser === "decoy" && (
                    <Button
                      onClick={() => deleteStory(params.storyId)}
                      className="hover:text-red-500"
                    >
                      Delete
                    </Button>
                  )}

                  <Button white className="ml-auto">
                    Share
                  </Button>
                </div>
              </div>
              <h3 className="my-6 h1">{title}</h3>
              <div>
                {paragraphs.map((paragraph, i) => (
                  <div key={i}>
                    <p className="mx-auto mb-6 body-1 text-n-2 lg:mb-8">
                      {paragraph}
                    </p>
                    {i === 0 && (
                      <img
                        alt={title}
                        src={images[0]}
                        className="pt-4 pb-10 rounded-lg"
                      />
                    )}
                    {i === middle(paragraphs.length) - 1 && (
                      <img alt={title} src={images[1]} className="pt-4 pb-10" />
                    )}
                    {/* {i === paragraphs.length - 2 && (
            <img alt={title} src={images[2]} />
          )} */}
                    {i === paragraphs.length - 3 && (
                      <img alt={title} src={images[2]} className="pt-4 pb-10" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Story;
