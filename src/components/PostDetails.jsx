import React, { useState, useEffect } from "react";
import axios from "../service/axios";
import { useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getPost() {
      const post = await axios.get("posts/" + id);
      setPost(post.data);
    }
    async function getComments() {
      const comments = await axios.get("comments/" + id);
      setComments(comments.data);
    }
    getPost();
    getComments();
  }, [id]);

  return (
    <div>
      <ul>
        <h3>Post:</h3>
        <li>Link ID = {id}</li>
        <li>Post ID = {post.postId}</li>
        <li>Post Title = {post.title}</li>
        <li>Post content = {post.content}</li>
        <li>Post data = {post.postDate}</li>
      </ul>
      <ul>
        <h3>Comments:</h3>
        {comments.map((comment) => {
          return <li>{comment.content}</li>;
        })}
      </ul>
    </div>
  );
}
