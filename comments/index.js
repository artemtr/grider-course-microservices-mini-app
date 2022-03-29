const express = require("express");
const app = express();

const { randomBytes } = require("crypto");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const commentsById = {};

app.get("/posts/:id/comments", (req, res) => {
  console.log(commentsById[req.params.id]);
  res.send(commentsById[req.params.id]);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentsId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsById[req.params.id] || [];
  comments.push({ id: commentsId, content });
  commentsById[req.params.id] = comments;
  res.status(201).send(comments);
});

app.listen(5001, () => {
  console.log("comments works");
});
