import { useEffect, useState } from "react";
import api from "../api";
import Story from "../components/Story";

function Home() {
  const [stories, setStories] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    getStories();
  }, []);

  const getStories = () => {
    api
      .get("/api/story/")
      .then((res) => res.data)
      .then((data) => {
        setStories(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteStory = (id) => {
    api
      .delete(`/api/stories/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Story deleted!");
        else alert("Failed to delete story.");
        getStories();
      })
      .catch((error) => console.log(error));
  };

  const createStory = (e) => {
    e.preventDefault();
    api
      .post("/api/story/", { title })
      .then((res) => {
        if (res.status === 201) alert("Story created!");
        else alert("Failed to create story.");
        getStories();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>
        <h2>Stories</h2>
        {stories.map((story) => (
          <Story story={story} onDelete={deleteStory} key={story.id} />
        ))}
      </div>
      <h2>Create a story</h2>
      <form onSubmit={createStory}>
        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default Home;
