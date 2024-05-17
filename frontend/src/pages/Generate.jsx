import { useEffect, useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { Button as Bt } from "../components/ui/button";
import Button from "../components/Button";
import { curve } from "../assets";
import { useRef } from "react";
import { Progress } from "../components/ui/progress";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Generate() {
  const parallaxRef = useRef(null);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [lang, setLang] = useState("bangla");

  const [filled, setFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [plotGenerating, setPlotGenerating] = useState(false);
  useEffect(() => {
    if (filled <= 100 && isRunning) {
      setTimeout(() => setFilled((prev) => (prev += 0.1)), 40);
    }
  }, [filled, isRunning]);

  useEffect(() => {
    console.log(lang);
  }, [lang]);

  const createStory = () => {
    if (isRunning || title === "") return;
    setIsRunning(true);
    api
      .post("/api/story/", { title, lang })
      .then((res) => {
        if (res.status === 201) navigate(`/story/${res.data.id}`);
        else alert("Failed to create story.");
      })
      .catch((error) => alert(error))
      .finally(() => setIsRunning(false));
  };

  const generateTitle = () => {
    setPlotGenerating(true);
    api
      .post("/api/title/", { lang })
      .then((res) => res.data)
      .then((data) => {
        setTitle(data);
        console.log(data);
      })
      .catch((err) => alert(err))
      .finally(() => setPlotGenerating(false));
  };

  return (
    <>
      <div className="flex min-h-screen">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="md:hidden">
          <Header />
        </div>
        <div className="flex-1 pt-[12rem] -mt-[2rem] md:-mt-[5.25rem]">
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
                className="w-full p-4 mb-2 border-2 border-indigo-500 shadow-lg outline-none shadow-indigo-500/40 bg-n-7 rounded-xl "
                placeholder="Enter your story plot..."
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <select
                  className="px-2 text-gray-400 bg-transparent outline-none max-w-30 rounded-xl"
                  onChange={(e) => setLang(e.target.value)}
                >
                  <option value="bangla">Bangla</option>
                  <option value="english">English</option>
                </select>
                <div>
                  <Bt
                    variant="link"
                    className="mr-3 font-bold text-gray-300"
                    onClick={generateTitle}
                    disabled={isRunning || plotGenerating}
                  >
                    Generate Plot
                  </Bt>
                  <Button onClick={createStory} disabled={isRunning}>
                    Create
                  </Button>
                </div>
              </div>
              {isRunning && (
                <div className="flex flex-col max-w-xl mx-auto mt-12 md:mt-28">
                  <p className="max-w-lg mx-auto mb-3 md:mb-4 body-1 text-n-2 lg:mb-6">
                    {filled < 40 &&
                      "Please wait while we generate your story..."}
                    {filled >= 40 &&
                      filled < 99 &&
                      "Generating story images..."}
                    {filled >= 99 && "Finishing up..."}
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
