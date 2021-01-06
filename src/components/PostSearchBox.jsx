import { Card, InputBase, makeStyles } from "@material-ui/core";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  search: {
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
    textAlign: "center",
    alignItems: "center",
    padding: "0.5rem",
    minHeight: "17.5rem",
  },
  searchInput: {
    borderRadius: "0.5rem",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
  },
});

function PostSearchBox() {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.search}>
        <div>Find post:</div>
        <InputBase
          className={classes.searchInput}
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
          startAdornment={<SearchIcon fontSize="small" />}
        />
      </Card>
      <Card className={classes.search}>
        <div>Find User</div>
        <InputBase
          className={classes.searchInput}
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
          startAdornment={<SearchIcon fontSize="small" />}
        />
      </Card>
    </>
  );
}

export default PostSearchBox;
