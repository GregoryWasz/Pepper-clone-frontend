import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "../service/axios";

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
      .then(history.push("/posts/" + id))
      .catch(console.log("Bad Kitty!"));
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
      <TextField
        variant="outlined"
        value={title}
        label="Title"
        type="text"
        multiline={true}
        fullWidth={true}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        variant="outlined"
        value={content}
        label="Description"
        type="text"
        multiline={true}
        fullWidth={true}
        onChange={(e) => setContent(e.target.value)}
      />
      <TextField
        variant="outlined"
        value={priceBefore}
        label="Old price"
        type="number"
        onChange={(e) => setPriceBefore(e.target.value)}
      />
      <TextField
        variant="outlined"
        value={priceAfter}
        label="Price now"
        type="number"
        onChange={(e) => setPriceAfter(e.target.value)}
      />
      <TextField
        variant="outlined"
        value={dealLink}
        label="Link to deal"
        type="text"
        onChange={(e) => setDealLink(e.target.value)}
      />
      <Button
        onClick={() => {
          handleUpdatePost();
        }}
      >
        Accept
      </Button>
    </>
  );
}
