import { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { curve } from "../assets";
import { useRef } from "react";
import { Progress } from "../components/ui/progress";

function Generate() {
  const parallaxRef = useRef(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [lang, setLang] = useState("english");

  const [filled, setFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    if (filled < 95 && isRunning) {
      setTimeout(() => setFilled((prev) => (prev += 0.1)), 60);
    }
  }, [filled, isRunning]);

  useEffect(() => {
    console.log(lang);
  }, [lang]);

  const createStory = () => {
    setIsRunning(true);
    api
      .post("/api/story/", { title, lang })
      .then((res) => {
        if (res.status === 201) navigate(`/story/${res.data.id}`);
        else alert("Failed to create story.");
      })
      .catch((error) => console.log(error));
  };

  const generateTitle = () => {
    api
      .post("/api/title/", { lang })
      .then((res) => res.data)
      .then((data) => {
        setTitle(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  return (
    <>
      <div className="flex min-h-screen">
        {/* <MySidebar /> */}
        <div className="flex-1 pt-[12rem] -mt-[5.25rem]">
          <div className="container relative" ref={parallaxRef}>
            <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
              <h1 className="mb-6 text-5xl">
                Create a{" "}
                <span className="relative inline-block">
                  new story{" "}
                  <img
                    src={curve}
                    className="absolute left-0 w-full top-full xl:-mt-2"
                    width={624}
                    height={28}
                    alt="Curve"
                  />
                </span>
              </h1>
              <p className="max-w-3xl mx-auto mb-6 body-1 text-n-2 lg:mb-8">
                Every good story starts with a good idea
              </p>
              <textarea
                className="w-full p-4 mb-2 border-none rounded-md"
                placeholder="Enter your story prompt..."
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="flex justify-between">
                <select
                  className="w-full max-w-xs select select-primary"
                  onChange={(e) => setLang(e.target.value)}
                >
                  <option value="english">English</option>
                  <option value="bangla">Bangla</option>
                </select>
                <div>
                  <Button onClick={generateTitle}>Generate Plot</Button>
                  <Button white onClick={createStory}>
                    Create
                  </Button>
                </div>
              </div>
              {isRunning && (
                <div className="flex flex-col max-w-xl mx-auto mt-10">
                  <p className="max-w-lg pt-10 mx-auto mb-6 body-1 text-n-2 lg:mb-8">
                    Please wait while your beautiful story is generating...
                  </p>
                  <Progress value={filled} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Generate;
