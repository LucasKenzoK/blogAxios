import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import blogFetch from "../axios/config";
import blogFetchs from "../axios/config";
import "./NewPost.css";

const NewPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const CreatePost = async (e) => {
    e.preventDefault();

    const post = { title, body, userId: 1 };

    await blogFetch.post("/posts", {
      body: post,
    });
    navigate("/");
  };

  return (
    <div className="newPost">
      <h2>Inserir novo Post</h2>
      <form onSubmit={(e) => CreatePost(e)}>
        <div className="formControl">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            name="title"
            placeholder="digite um Título"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="body">Counteúdo:</label>
          <textarea
            name="body"
            id="body"
            placeholder="Digite o Conteudo"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <input type="submit" value="Criar Post" className="btn" />
      </form>
    </div>
  );
};

export default NewPost;
