import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import blogFetch from "../axios/config";

const EditPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const { id } = useParams();

  const getPost = async () => {
    try {
      const response = await blogFetch.get(`/posts/${id}`);
      const data = response.data;

      setTitle(data.title);
      setBody(data.body);
    } catch (err) {
      console.log(err);
    }
  };

  const editPost = async (e) => {
    e.preventDefault();

    const post = { title, body, userId: 1 };

    await blogFetch.put(`/posts/${id}`, {
      body: post,
    });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="newPost">
      <h2>Editando: {title}</h2>
      <form onSubmit={(e) => editPost(e)}>
        <div className="formControl">
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            name="title"
            placeholder="digite um Título"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title || ""}
          />
        </div>
        <div className="formControl">
          <label htmlFor="body">Counteúdo:</label>
          <textarea
            name="body"
            id="body"
            placeholder="Digite o Conteudo"
            onChange={(e) => setBody(e.target.value)}
            value={body || ""}
          ></textarea>
        </div>
        <input type="submit" value="Editar Post" className="btn" />
      </form>
    </div>
  );
};

export default EditPost;
