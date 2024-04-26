import React from "react";
import blogFetch from "../axios/config";
import "./Admin.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [posts, setPosts] = useState([]);

  const getPost = async () => {
    try {
      const response = await blogFetch.get("/posts");
      const data = response.data;

      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (id) => {
    blogFetch.delete(`posts/${id}`);

    const filtredPost = posts.filter((post) => post.id !== id);

    setPosts(filtredPost);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      {posts.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        posts.map((post) => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <div className="actions">
              <Link to={`/posts/edit/${post.id}`} className="btn editBtn">
                Editar
              </Link>
              <button
                className="btn deleteBtn"
                onClick={() => deletePost(post.id)}
              >
                Deletar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Admin;
