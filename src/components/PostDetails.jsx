import React, { useState, useEffect } from "react";
import axios from "../service/axios";
import { useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    async function getPost() {
      const post = await axios.get("posts/" + id);
      setPost(post.data);
    }
    getPost();
  }, [id]);

  return (
    <ul>
      <li>Link ID = {id}</li>
      <li>Post ID = {post.postId}</li>
      <li>Post Title = {post.title}</li>
      <li>Post content = {post.content}</li>
      <li>Post data = {post.postDate}</li>
    </ul>
  );
}
