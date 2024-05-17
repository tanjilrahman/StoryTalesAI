import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function StoryCard({ story, onDelete }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const data = JSON.parse(story.content);
    setTitle(data.title);
    setImage(JSON.parse(story.image)[0]);
  }, [story]);

  const backgorunds = [
    "./src/assets/benefits/card-1.svg",
    "./src/assets/benefits/card-2.svg",
    "./src/assets/benefits/card-3.svg",
    "./src/assets/benefits/card-4.svg",
    "./src/assets/benefits/card-5.svg",
    "./src/assets/benefits/card-6.svg",
  ];

  return (
    <div>
      <Link to={`/story/${story.id}`}>
        <div
          className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] hover:scale-110 transition duration-300 ease-in-out"
          style={{
            backgroundImage: `url(${
              backgorunds[Math.floor(Math.random() * 5)]
            })`,
          }}
        >
          <div
            className="absolute inset-0.5 "
            style={{ clipPath: "url(#benefits)" }}
          >
            <div className="absolute inset-0 transition-opacity cursor-pointer">
              {image && (
                <img
                  src={image}
                  width={512}
                  height={512}
                  alt={title}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="relative top-0 z-20 w-full h-full bg-gradient-to-t from-n-7 to-transparent to-40%" />
          </div>
          <div className="relative z-2 flex flex-col min-h-[30rem] pointer-events-none">
            <div className="relative px-8 mt-auto z-2">
              <h5 className="mb-5 h5">{title}</h5>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default StoryCard;
