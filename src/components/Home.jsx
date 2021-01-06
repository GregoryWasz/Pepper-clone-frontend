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
});

const Home = () => {
  const [posts, setposts] = useState([]);
  const classes = useStyles();

  async function getPosts() {
    const posts = await axios.get("posts");
    setposts(posts.data);
    return posts;
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
          priceAfter,
          votes,
          //active,
          userId,
        } = post;

        return (
          <Card className={classes.card} key={postId}>
            <CardContent>
              <Typography>Title: {title}</Typography>
              <Typography>Content: {content}</Typography>
              <Typography>Price before: {priceBefore}</Typography>
              <Typography>Price Now: {priceAfter}</Typography>
              <Typography>Votes: {votes}</Typography>
              <Typography>Author: {userId}</Typography>
              <Button to={`/posts/${postId}`} component={Link}>
                Post Details
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default Home;
