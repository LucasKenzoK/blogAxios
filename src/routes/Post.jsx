import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import blogFetch from "../axios/config";
import "./Post.css";
const Post = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();

  const getPost = async () => {
    try {
      const response = await blogFetch.get(`/posts/${id}`);
      const data = response.data;

      setPost(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="postConteiner">
      {!post.title ? (
        <p>Carregando</p>
      ) : (
        <div className="post">
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      )}
    </div>
  );
};

export default Post;
