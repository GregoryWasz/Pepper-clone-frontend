import { Card, makeStyles, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import axios from "../service/axios";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  search: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
    padding: "0.5rem",
    textAlign: "center",
  },
  searchInput: {
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
  },
  searchResult: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
    padding: "0.5rem",
  },
  searchLabel: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
    padding: "0.5rem",
    backgroundColor: "#34383b",
    color: "white",
  },
  typo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "Black",
  },
  avatar: {
    width: "25px",
    height: "25px",
    fontSize: "9px",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "#ff7900",
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
        <Card variant="outlined" className={classes.searchLabel}>
          Search:
        </Card>
        <TextField
          className={classes.searchInput}
          label="Find users and posts!"
          variant="outlined"
          onChange={getPostsAndUsers}
        />

        {users.length > 0 && (
          <Card variant="outlined" className={classes.searchLabel}>
            Finded users:
          </Card>
        )}
        {users.map((user) => {
          return (
            <Card
              className={classes.searchResult}
              variant="outlined"
              key={user.userId}
            >
              <Typography
                className={classes.typo}
                component={Link}
                to={"/profile/" + user.userId}
              >
                <Avatar className={classes.avatar}>
                  {user.username[0]}
                  {user.username[1]}
                </Avatar>
                &nbsp; {user.username}
              </Typography>
            </Card>
          );
        })}

        {posts.length > 0 && (
          <Card variant="outlined" className={classes.searchLabel}>
            Finded posts:
          </Card>
        )}
        {posts.map((post) => {
          return (
            <Card
              variant="outlined"
              className={classes.searchResult}
              key={post.postId}
            >
              <Typography
                className={classes.typo}
                component={Link}
                to={"/posts/" + post.postId}
              >
                <AssignmentIcon />
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
