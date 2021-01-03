import React, { useState, useEffect } from "react";
import axios from "../service/axios";

const Posts = () => {
  const [posts, setposts] = useState([]);

  async function getPosts() {
    const posts = await axios.get("posts");
    setposts(posts.data);
    return posts;
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => {
        const { postId, title, content } = post;
        return (
          <div key={postId}>
            <h3>Tytuł: {title} </h3>
            <h4>opis: {content} </h4>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
