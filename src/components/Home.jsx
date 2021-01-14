import {
  Button,
  Card,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../service/axios";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  row: { display: "flex" },
  column: { width: "50%", wordWrap: "break-word" },
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
  author: {
    fontSize: "13px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "30px",
    height: "30px",
    fontSize: "13px",
    textTransform: "uppercase",
    color: "white",
    backgroundColor: "#ff7900",
  },
});

const Home = () => {
  const [posts, setPosts] = useState([]);
  const classes = useStyles();

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
              <div className={classes.row}>
                <div style={{ width: "70%" }}>
                  <Typography
                    className={classes.title}
                    to={`/posts/${postId}`}
                    component={Link}
                    variant="h4"
                  >
                    {title}
                  </Typography>
                </div>
                <div
                  style={{
                    width: "30%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography className={classes.postDate}>
                    <ScheduleIcon size="small" />
                    {postDate.split("T")[0]}
                  </Typography>
                </div>
              </div>
              <Typography className={classes.content} variant="h5">
                {content}
              </Typography>
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
              {/* <Typography className={classes.votes}>Votes: {votes}</Typography> */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ width: "50%" }}>
                  <Typography className={classes.author}>
                    <Avatar className={classes.avatar}>
                      {username[0]}
                      {username[1]}
                    </Avatar>{" "}
                    &nbsp;
                    {username}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "50%",
                  }}
                >
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
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default Home;
