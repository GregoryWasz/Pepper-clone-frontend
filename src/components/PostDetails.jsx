import React, { useState, useEffect, useContext } from "react";
import axios from "../service/axios";
import { useParams } from "react-router-dom";
import { Button, FormControl, TextField } from "@material-ui/core";
import { UserContext } from "./UserContext";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const { isLoggedIn } = useContext(UserContext);

  async function handleAddComment(e) {
    e.preventDefault();
    const postId = id;
    const commentDto = { content, postId };
    console.log(commentDto);
    await axios
      .post("/comments", commentDto)
      .then(async () => {
        const newcomments = await axios.get("comments/" + id);
        setComments(newcomments.data);
      })
      .catch((error) => {
        console.log("Bad Kitty!" + error);
      });
  }

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
          return (
            <li key={comment.commentId}>
              {comment.content} by {comment.userId}
            </li>
          );
        })}
        {isLoggedIn ? (
          <ul>
            <h3>Add comment:</h3>
            <FormControl>
              <TextField
                variant="outlined"
                onChange={(e) => setContent(e.target.value)}
              ></TextField>
              <Button onClick={handleAddComment}>Add comment!</Button>
            </FormControl>
          </ul>
        ) : (
          <h3>Login to add comment.</h3>
        )}
      </ul>
    </div>
  );
}
