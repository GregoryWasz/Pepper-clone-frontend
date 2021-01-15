import { Button, makeStyles, Paper, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "../service/axios";
import { Alert } from "@material-ui/lab";

const useStyle = makeStyles({
  paper: {
    padding: "1rem",
    marginTop: "0.5rem",
    marginBottom: "0.5rem",
    marginLeft: "0.25rem",
    marginRight: "0.25rem",
  },
  text: { margin: "0.5rem" },
  button: { marginLeft: "0.5rem", color: "white", backgroundColor: "#ff7900" },
  alert: { margin: "0.5rem" },
});
export default function EditPost() {
  const { id } = useParams();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priceBefore, setPriceBefore] = useState("");
  const [priceAfter, setPriceAfter] = useState("");
  const [dealLink, setDealLink] = useState("");
  const [active, setActive] = useState(true);
  const [tagId, setTagId] = useState("1");
  const classes = useStyle();
  const [isError, setIsError] = useState(false);

  async function handleUpdatePost() {
    await axios
      .put("/posts/" + id, {
        title,
        content,
        priceBefore,
        priceAfter,
        dealLink,
        active,
        tagId,
      })
      .then(() => history.push("/posts/" + id))
      .catch(setIsError(true));
  }

  useEffect(() => {
    async function getPost() {
      const post = await axios.get("posts/" + id);
      setTitle(post.data.title);
      setContent(post.data.content);
      setPriceBefore(post.data.priceBefore);
      setPriceAfter(post.data.priceAfter);
      setDealLink(post.data.dealLink);
      setActive(post.data.active);
      setTagId(post.data.tagId);
    }
    getPost();
  }, [id]);
  return (
    <>
      {isError && (
        <Alert className={classes.alert} severity="error">
          Fill properly all fields!
        </Alert>
      )}
      <Paper className={classes.paper}>
        <TextField
          className={classes.text}
          variant="outlined"
          value={title}
          label="Title"
          type="text"
          multiline={true}
          fullWidth={true}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          className={classes.text}
          variant="outlined"
          value={content}
          label="Description"
          type="text"
          multiline={true}
          fullWidth={true}
          onChange={(e) => setContent(e.target.value)}
        />
        <TextField
          className={classes.text}
          variant="outlined"
          value={priceBefore}
          label="Old price"
          type="number"
          onChange={(e) => setPriceBefore(e.target.value)}
        />
        <TextField
          className={classes.text}
          variant="outlined"
          value={priceAfter}
          label="Price now"
          type="number"
          onChange={(e) => setPriceAfter(e.target.value)}
        />
        <div>
          <TextField
            className={classes.text}
            variant="outlined"
            value={dealLink}
            label="Link to deal"
            type="text"
            onChange={(e) => setDealLink(e.target.value)}
            fullWidth={true}
            multiline={true}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            className={classes.button}
            size="large"
            onClick={() => {
              handleUpdatePost();
            }}
          >
            Accept
          </Button>
        </div>
      </Paper>
    </>
  );
}
