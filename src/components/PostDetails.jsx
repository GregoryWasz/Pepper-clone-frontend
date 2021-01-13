import React, { useState, useEffect, useContext } from "react";
import axios from "../service/axios";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, FormControl, TextField } from "@material-ui/core";
import { UserContext } from "./UserContext";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const { isLoggedIn, currentUsername, currentUserId } = useContext(
    UserContext
  );
  const [isChangeFormVisible, setIsChangeFormVisible] = useState(false);
  const [currentCommentId, setCurrentCommentId] = useState("");
  const history = useHistory();
  const [content, setContent] = useState("");

  async function handleDeletePost(PostId) {
    await axios
      .delete("/posts/" + PostId)
      .then(async () => {
        history.goBack();
      })
      .catch((error) => {
        console.log("Bad Kitty!" + error);
      });
  }

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
        setContent("");
      })
      .catch((error) => {
        console.log("Bad Kitty!" + error);
      });
  }

  async function handleDeleteComment(commentId) {
    await axios
      .delete("/comments/" + commentId)
      .then(async () => {
        const newcomments = await axios.get("comments/" + id);
        setComments(newcomments.data);
      })
      .catch((error) => {
        console.log("Bad Kitty!" + error);
      });
  }

  async function handleUpdateComment(commentId) {
    await axios
      .put("/comments/" + commentId, { content })
      .then(async () => {
        const newcomments = await axios.get("comments/" + id);
        setIsChangeFormVisible(false);
        setContent("");
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
        <li>Post ID = {post.postId}</li>
        <li>Post Title = {post.title}</li>
        <li>Post content = {post.content}</li>
        <li>Post data = {post.postDate}</li>
        <li>Price before= {post.priceBefore}</li>
        <li>Price after = {post.priceAfter}</li>
        <li>Link = {post.dealLink}</li>
        {post.userId === currentUserId && (
          <li>
            <Button component={Link} to={"/edit/post/" + id}>
              {" "}
              <EditIcon />{" "}
            </Button>
            <Button
              onClick={() => {
                handleDeletePost(post.postId);
              }}
            >
              {" "}
              <DeleteForeverIcon />{" "}
            </Button>
          </li>
        )}
      </ul>
      <ul>
        <h3>Comments:</h3>
        {comments.map((comment) => {
          return (
            <li key={comment.commentId}>
              {comment.content} by {comment.username} at{" "}
              {comment.postDate.split("T")[0]}, {comment.postDate.split("T")[1]}
              {comment.username === currentUsername && (
                <>
                  <Button
                    onClick={() => {
                      setIsChangeFormVisible(true);
                      setCurrentCommentId(comment.commentId);
                    }}
                  >
                    {" "}
                    <EditIcon />{" "}
                  </Button>
                  <Button
                    onClick={() => handleDeleteComment(comment.commentId)}
                  >
                    {" "}
                    <DeleteForeverIcon />{" "}
                  </Button>
                </>
              )}
            </li>
          );
        })}

        {isChangeFormVisible && (
          <>
            <TextField onChange={(e) => setContent(e.target.value)}></TextField>
            <Button onClick={() => handleUpdateComment(currentCommentId)}>
              Edit
            </Button>
          </>
        )}

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
