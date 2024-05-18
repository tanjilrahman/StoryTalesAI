import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api";
import NotFound from "./NotFound";
import Sidebar from "../components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Button from "../components/Button";
import Header from "../components/Header";
import SkeletonStory from "../components/SkeletonStory";
import Moment from "react-moment";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";

function Story() {
  const navigate = useNavigate();
  const params = useParams();
  const [authUser] = useState(localStorage.getItem("username"));
  const [username, setUsername] = useState(null);
  const [author, setAuthor] = useState("Anonymous");
  const [title, setTitle] = useState("");
  const [paragraphs, setParagraphs] = useState([]);
  const [images, setImages] = useState([]);
  const [formattedDate, setFormattedDate] = useState();
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState("Share");

  const getStory = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/story/${params.storyId}/`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        const story = JSON.parse(data.content);
        if (data.author_first === "" || data.author_last === "") {
          setAuthor("Anonymous");
        } else {
          setAuthor(data.author_first + " " + data.author_last);
        }
        setUsername(data.author_username);
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
            <div className="max-w-4xl mx-auto mt-16 md:mt-0">
              <div className="p-6">
                <div className="items-center justify-between mt-8 mb-10 md:flex">
                  <div className="flex space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="">
                      <p className="font-bold ">{author}</p>
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
                  <div className="flex mt-6 space-x-4 md:mt-0">
                    {(authUser === "admin" || username == authUser) && (
                      <Button
                        onClick={() => deleteStory(params.storyId)}
                        className="hover:text-red-500"
                      >
                        Delete
                      </Button>
                    )}

                    <CopyToClipboard
                      text={window.location.href}
                      onCopy={() => setCopyStatus("Copied Link")}
                    >
                      <Button white className="w-full ml-auto md:w-auto">
                        {copyStatus}
                      </Button>
                    </CopyToClipboard>
                  </div>
                </div>
                <h3 className="my-2 md:my-6 h1">{title}</h3>
                <div>
                  {paragraphs.map((paragraph, i) => (
                    <div key={i}>
                      <p className="mx-auto mb-6 text-lg md:text-xl body-1 text-n-2 lg:mb-8">
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
                        <img
                          alt={title}
                          src={images[1]}
                          className="pt-4 pb-10"
                        />
                      )}
                      {/* {i === paragraphs.length - 2 && (
                      <img alt={title} src={images[2]} />
                    )} */}
                      {i === paragraphs.length - 3 && (
                        <img
                          alt={title}
                          src={images[2]}
                          className="pt-4 pb-10"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-2/3 mx-auto border-t border-gray-700" />
              <div className="relative mt-8 ">
                <div className="p-6 space-y-8">
                  <p className="mx-auto body-1 text-n-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ornare aenean euismod.
                  </p>
                  <p className="hidden mx-auto body-1 text-n-2 md:block">
                    Ut sem viverra aliquet eget sit amet tellus cras adipiscing.
                    Varius vel pharetra vel turpis nunc eget. Pharetra et
                    ultrices neque ornare aenean euismod elementum nisi.
                  </p>

                  <div className="w-full h-48 md:h-56 bg-gradient-to-b from-n-2/20" />
                </div>
                <div className="absolute top-0 w-full h-full text-center pt-28 backdrop-blur-md bg-gradient-to-t from-n-8 ">
                  <p className="max-w-3xl mx-auto body-1 text-n-2">
                    Continue your story with Premium
                  </p>
                  <Link
                    to="/pricing"
                    className="inline-block py-3 mt-5 font-bold transition-all duration-300 ease-in-out md:text-lg px-7 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:to-indigo-500"
                  >
                    Upgrade Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Story;
