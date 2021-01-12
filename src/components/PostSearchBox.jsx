import { Card, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import axios from "../service/axios";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  search: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
    textAlign: "center",
    alignItems: "center",
    padding: "0.5rem",
  },
  searchInput: {
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
  },
});

function PostSearchBox() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  function getPostsAndUsers(e) {
    setUsers([]);
    setPosts([]);

    console.log(e.target.value);

    axios
      .get("/posts/search", {
        params: {
          q: e.target.value,
        },
      })
      .then((response) => {
        setPosts(response.data);
        if (e.target.value === "") {
          setPosts([]);
        }
      })
      .catch((error) => {
        console.log("Bad Kitty!");
      });

    axios
      .get("/users/search", {
        params: {
          q: e.target.value,
        },
      })
      .then((response) => {
        setUsers(response.data);
        if (e.target.value === "") {
          setUsers([]);
        }
      })
      .catch((error) => {
        console.log("Bad Kitty!");
      });
  }

  const classes = useStyles();
  return (
    <>
      <Card className={classes.search}>
        <TextField
          className={classes.searchInput}
          label="Search"
          variant="filled"
          onChange={getPostsAndUsers}
        />
        {users.length > 0 && <Typography>Finded users:</Typography>}
        {users.map((user) => {
          return (
            <Card
              variant="outlined"
              className={classes.search}
              key={user.userId}
            >
              <Typography component={Link} to={"/profile/" + user.userId}>
                <PersonIcon />
                {user.username}
              </Typography>
            </Card>
          );
        })}

        {posts.length > 0 && <Typography>Finded posts:</Typography>}
        {posts.map((post) => {
          return (
            <Card
              variant="outlined"
              className={classes.search}
              key={post.postId}
            >
              <Typography component={Link} to={"/posts/" + post.postId}>
                {post.title}
              </Typography>
            </Card>
          );
        })}
      </Card>
    </>
  );
}

export default PostSearchBox;
