import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../service/axios";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
  root: {
    padding: "1rem",
    margin: "0.5rem",
  },
  textField: { margin: "0.4rem" },
  button: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "none",
    margin: "0.4rem",
  },
  alert: { margin: "0.5rem" },
});

function AddPost() {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priceBefore, setPriceBefore] = useState("");
  const [priceAfter, setPriceAfter] = useState("");
  const [dealLink, setDealLink] = useState("");
  const [tagId, setTagId] = useState("1");
  const history = useHistory();
  const [isError, setIsError] = useState(false);

  async function handleAddPost() {
    setTagId("1");
    const postDto = {
      title,
      content,
      priceBefore,
      priceAfter,
      dealLink,
      tagId,
    };
    await axios
      .post("/posts/", postDto)
      .then((response) => {
        history.push("/posts/" + response.data.postId);
      })
      .catch(() => {
        setIsError(true);
      });
  }

  return (
    <>
      {isError && (
        <Alert className={classes.alert} severity="error">
          Fill properly all fields!
        </Alert>
      )}
      <Paper className={classes.root}>
        <Typography variant="h4">Create new deal!</Typography>
        <TextField
          className={classes.textField}
          label="Title"
          variant="outlined"
          type="text"
          multiline={true}
          fullWidth={true}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></TextField>
        <TextField
          className={classes.textField}
          label="Description"
          variant="outlined"
          type="text"
          multiline={true}
          fullWidth={true}
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></TextField>
        <TextField
          className={classes.textField}
          label="Old price"
          variant="outlined"
          type="number"
          onChange={(e) => setPriceBefore(e.target.value)}
          value={priceBefore}
        ></TextField>
        <TextField
          className={classes.textField}
          label="Price now"
          variant="outlined"
          type="number"
          onChange={(e) => setPriceAfter(e.target.value)}
          value={priceAfter}
        ></TextField>
        <div>
          <TextField
            className={classes.textField}
            label="Link to deal"
            variant="outlined"
            type="text"
            onChange={(e) => setDealLink(e.target.value)}
            value={dealLink}
            fullWidth={true}
            multiline={true}
          ></TextField>
        </div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={handleAddPost}
          size="large"
        >
          Add deal!
        </Button>
      </Paper>
    </>
  );
}

export default AddPost;
