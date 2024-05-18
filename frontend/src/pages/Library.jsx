import React, { useEffect, useState } from "react";
import StoryCard from "../components/StoryCard";
import api from "../api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { curve } from "../assets";
import SkeletonStoryCard from "../components/SkeletonStoryCard";
import { Skeleton } from "../components/ui/skeleton";
import { Link } from "react-router-dom";
import Button from "../components/Button";

function Library() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStories();
  }, []);

  const getStories = () => {
    setLoading(true);
    api
      .get("/api/story/")
      .then((res) => res.data)
      .then((data) => {
        setStories(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="flex">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="md:hidden">
        <Header />
      </div>
      <div className="w-full p-6 mx-auto mt-20 md:p-10 md:mt-0">
        <div className="my-4 text-center">
          <h1 className="mb-3 md:mb-6 h1">
            The{" "}
            <span className="relative inline-block">
              Bookworm’s
              <img
                src={curve}
                className="absolute left-0 w-full top-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>{" "}
            Nook
          </h1>
          <p className="max-w-3xl mx-auto mb-6 md:text-xl text-n-2 lg:mb-8">
            Find all of your creations
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 mb-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {loading ? (
            [...Array(8)].map((e, i) => (
              <SkeletonStoryCard key={i}></SkeletonStoryCard>
            ))
          ) : stories.length > 0 ? (
            stories.map((story) => <StoryCard story={story} key={story.id} />)
          ) : (
            <div className="items-center w-full mx-auto">
              <p>You don't have any stories</p>
              <Link to={"/story"}>
                <Button white>Create story</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Library;
