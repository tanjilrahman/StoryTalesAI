import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import benefitCard1 from "/card-1.svg";
import benefitCard2 from "/card-2.svg";
import benefitCard3 from "/card-3.svg";
import benefitCard4 from "/card-4.svg";
import benefitCard5 from "/card-5.svg";
import benefitCard6 from "/card-6.svg";
import ClipPath from "../assets/svg/ClipPath";

function StoryCard({ story, onDelete }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const data = JSON.parse(story.content);
    setTitle(data.title);
    setImage(JSON.parse(story.image)[0]);
  }, [story]);

  const backgrounds = [
    benefitCard1,
    benefitCard2,
    benefitCard3,
    benefitCard4,
    benefitCard5,
    benefitCard6,
  ];

  // Generate a random index to select a background image
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  const selectedBackground = backgrounds[randomIndex];

  return (
    <div>
      <Link to={`/story/${story.id}`}>
        <div
          className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] hover:scale-110 transition duration-300 ease-in-out"
          style={{
            backgroundImage: `url(${selectedBackground})`,
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
      <ClipPath />
    </div>
  );
}

export default StoryCard;
