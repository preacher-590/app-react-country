import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import axios from "axios";
import Article from "./Article";

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:3003/articles")
      .then((res) => setNewsData(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length < 140) {
      setError(true);
    } else {
      axios
        .post("http://localhost:3003/articles", {
          author,
          content,
          date: Date.now(),
        })
        .then(() => {
          setError(false);
          setAuthor("");
          setContent("");
          getData();
        });
    }
  };

  return (
    <div className="news-container">
      <Navigation />
      <Logo />
      <h1>News</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => setAuthor(e.target.value)}
          type="text"
          placeholder="Nom"
          value={author}
        />
        <textarea
          style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
          placeholder="Message"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
        {error && <p>Veuillez écrire une minimun de 140 caratères</p>}
        <input type="submit" value="Envoyer" />
      </form>
      <ul>
        {newsData
          .sort((a, b) => b.date - a.date)
          .map((article, id) => (
            <Article key={article.id} article={article} />
          ))}
      </ul>
    </div>
  );
};

export default News;
