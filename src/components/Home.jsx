import {
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import axios from "../service/axios";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  banner: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
    textAlign: "center",
    padding: "0.5rem",
  },
  card: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
    padding: "0.5rem",
  },
  title: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "Black",
    "&:hover": {
      backgroundColor: "#fff",
      textDecoration: "underline",
    },
  },
  commentsButton: { color: "#5a5d62" },
  dealButton: {
    color: "white",
    backgroundColor: "#ff7900",
    align: "center",

    marginLeft: "0.5rem",
    "&:hover": {
      backgroundColor: "#ffba7b",
    },
  },
  postDate: {
    color: "#c4c4c4",
    alignItems: "center",
    display: "flex",
  },
  priceBefore: { color: "#c4c4c4", textDecoration: "line-through" },
  priceAfter: {
    fontWeight: "bold",
  },
  author: {},
});

const Home = () => {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();
  const { currentUsername } = useContext(UserContext);

  async function handleDeletePost(PostId) {
    await axios
      .delete("/posts/" + PostId)
      .then(async () => {
        getPosts();
      })
      .catch((error) => {
        console.log("Bad Kitty!" + error);
      });
  }

  async function getPosts() {
    const posts = await axios.get("posts");
    setPosts(posts.data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Card className={classes.banner}>Lastest:</Card>
      {posts.map((post) => {
        const {
          postId,
          title,
          content,
          priceBefore,
          postDate,
          priceAfter,
          // votes,
          //active,
          username,
        } = post;

        return (
          <Card className={classes.card} key={postId}>
            <CardContent>
              <Typography
                className={classes.title}
                to={`/posts/${postId}`}
                component={Link}
              >
                {title}
              </Typography>
              <Typography className={classes.content}>{content}</Typography>
              <Typography
                className={classes.priceAfter}
                style={{ display: "inline-block" }}
                color="secondary"
              >
                {" " + priceAfter} zł&nbsp;
              </Typography>
              <Typography
                className={classes.priceBefore}
                style={{ display: "inline-block" }}
              >
                {priceBefore + "zł "}
              </Typography>
              <Typography className={classes.postDate}>
                <WhatshotIcon size="small" />
                {postDate.split("T")[0]}
              </Typography>
              {/* <Typography className={classes.votes}>Votes: {votes}</Typography> */}
              <Typography className={classes.author}>
                Author: {username}
              </Typography>
              <Button
                to={`/posts/${postId}`}
                component={Link}
                className={classes.commentsButton}
                variant="outlined"
              >
                <ChatBubbleIcon></ChatBubbleIcon>
              </Button>
              <Button href={post.dealLink} className={classes.dealButton}>
                Get Deal! <ExitToAppIcon />
              </Button>
              {username === currentUsername && (
                <>
                  <Button
                    onClick={() => {
                      //setIsChangeFormVisible(true);
                      //setCurrentCommentId(postId);
                    }}
                  >
                    {" "}
                    <EditIcon />{" "}
                  </Button>
                  <Button
                    onClick={() => {
                      handleDeletePost(postId);
                    }}
                  >
                    {" "}
                    <DeleteForeverIcon />{" "}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default Home;
