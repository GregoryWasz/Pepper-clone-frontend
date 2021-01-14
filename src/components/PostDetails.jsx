import React, { useState, useEffect, useContext } from "react";
import axios from "../service/axios";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { UserContext } from "./UserContext";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ScheduleIcon from "@material-ui/icons/Schedule";

const useStyles = makeStyles({
  paper: {
    padding: "1rem",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
  },
  row: { display: "flex" },
  column: { width: "50%", wordWrap: "break-word" },
  title: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "Black",
  },
  content: { wordWrap: "break-word" },
  postDate: {
    display: "flex",
    alignItems: "center",
    color: "gray",
    justifyContent: "flex-end",
  },
  priceAfter: { display: "inline-block", fontWeight: "bold", color: "#ff7900" },
  priceBefore: {
    display: "inline-block",
    color: "#c4c4c4",
    textDecoration: "line-through",
  },
  dealButton: {
    color: "white",
    width: "30%",
    backgroundColor: "#ff7900",
    "&:hover": {
      backgroundColor: "#ffba7b",
    },
  },
  commentBanner: { color: "white", backgroundColor: "#34383b" },
  comment: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "left",
  },
  edit: {
    backgroundColor: "Blue",
    color: "white",
    margin: "0.25rem",
  },
  delete: { backgroundColor: "Red", color: "white", margin: "0.25rem" },
  commentUsername: {
    fontSize: "10px",
    color: "gray",
    textDecoration: "none",
    "&:hover": {
      color: "black",
    },
  },
  addCommentButton: {
    marginTop: "0.25rem",
    marginBottom: "0.25rem",
    backgroundColor: "#ff7900",
    color: "white",
    fontWeight: "bold",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#ff7900",
    },
  },
  commentContent: {},
});
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
  const classes = useStyles();

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
    <>
      <Paper className={classes.paper}>
        <div className={classes.row}>
          <div className={classes.column}>
            <Typography variant="h4" className={classes.title}>
              {post.title}
            </Typography>
          </div>
          <div className={classes.column} style={{ textAlign: "right" }}>
            <Typography className={classes.postDate}>
              <ScheduleIcon /> &nbsp;
              {post.postDate}
            </Typography>
          </div>
        </div>
        <Typography variant="h5" className={classes.content}>
          {post.content}
        </Typography>
        <div>
          <Typography className={classes.priceAfter}>
            {post.priceAfter} zł &nbsp;
          </Typography>
          <Typography className={classes.priceBefore}>
            {post.priceBefore} zł
          </Typography>
        </div>

        <Button className={classes.dealButton} href={post.dealLink}>
          GET DEAL! <ExitToAppIcon />
        </Button>

        {post.userId === currentUserId && (
          <>
            <Button
              component={Link}
              to={"/edit/post/" + id}
              className={classes.edit}
            >
              {" "}
              <EditIcon />{" "}
            </Button>
            <Button
              className={classes.delete}
              onClick={() => {
                handleDeletePost(post.postId);
              }}
            >
              {" "}
              <DeleteForeverIcon />{" "}
            </Button>
          </>
        )}
      </Paper>
      <Paper className={classes.paper}>
        <Paper
          className={`${classes.commentBanner} ${classes.paper}`}
          variant="outlined"
        >
          <Typography
            variant="h5"
            style={{ justifyContent: "center", display: "flex" }}
          >
            {" "}
            Comments
          </Typography>
        </Paper>
        {comments.map((comment) => {
          return (
            <Paper
              className={`${classes.comment} ${classes.paper}`}
              key={comment.commentId}
              variant="outlined"
            >
              <div style={{ display: "flex" }}>
                <div style={{ width: "60%", wordWrap: "break-word" }}>
                  <Typography
                    component={Link}
                    to={"/profile/" + comment.userId}
                    className={classes.commentUsername}
                  >
                    {comment.username} in {comment.postDate.split("T")[1]}{" "}
                    {comment.postDate.split("T")[0]}
                  </Typography>

                  <Typography className={classes.commentContent}>
                    {comment.content}{" "}
                  </Typography>
                </div>
                <div style={{ width: "40%", textAlign: "right" }}>
                  {comment.username === currentUsername && (
                    <div>
                      <Button
                        className={classes.edit}
                        onClick={() => {
                          setIsChangeFormVisible(true);
                          setCurrentCommentId(comment.commentId);
                        }}
                      >
                        {" "}
                        <EditIcon fontSize="small" />{" "}
                      </Button>
                      <Button
                        className={classes.delete}
                        onClick={() => handleDeleteComment(comment.commentId)}
                      >
                        {" "}
                        <DeleteForeverIcon fontSize="small" />{" "}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Paper>
          );
        })}
        {isChangeFormVisible && (
          <Paper className={classes.paper} variant="outlined">
            <TextField
              variant="outlined"
              multiline={true}
              fullWidth={true}
              label="Edit Comment"
              onChange={(e) => setContent(e.target.value)}
            ></TextField>
            <Button
              className={classes.addCommentButton}
              fullWidth={true}
              size="large"
              onClick={() => {
                handleUpdateComment(currentCommentId);
              }}
            >
              Edit Comment!
            </Button>
          </Paper>
        )}
        <Paper className={classes.paper} variant="outlined">
          {isLoggedIn ? (
            <>
              <TextField
                variant="outlined"
                multiline={true}
                fullWidth={true}
                label="Add Comment"
                onChange={(e) => setContent(e.target.value)}
              ></TextField>
              <Button
                className={classes.addCommentButton}
                fullWidth={true}
                size="large"
                onClick={handleAddComment}
              >
                Add comment!
              </Button>
            </>
          ) : (
            <h3>Login to add comment.</h3>
          )}
        </Paper>
      </Paper>
    </>
  );
}
