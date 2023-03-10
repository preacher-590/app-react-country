import React, { useState } from "react";
import axios from "axios";
import DeleteArticle from "../components/DeleteArticle";

const Article = ({ article }) => {
  const [isEditng, setIsEditing] = useState(false);
  const [editedContent, setEditContent] = useState("");

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return newDate;
  };

  const handleEdit = () => {
    const data = {
      author: article.author,
      content: editedContent ? editedContent : article.content,
      date: article.date,
    };
    axios.put(`http://localhost:3003/articles/${article.id}`, data).then(() => {
      setIsEditing(false);
    });
  };

  return (
    <div
      className="article"
      style={{ background: isEditng ? "#f3feff" : "white" }}
    >
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le {dateParser(article.date)}</em>
      </div>
      {isEditng ? (
        <textarea
          onChange={(e) => setEditContent(e.target.value)}
          autoFocus
          defaultValue={editedContent ? editedContent : article.content}
        ></textarea>
      ) : (
        <p>{editedContent ? editedContent : article.content}</p>
      )}

      <div className="btn-container">
        {isEditng ? (
          <button onClick={handleEdit}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <DeleteArticle id={article.id} />
      </div>
    </div>
  );
};

export default Article;
