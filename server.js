const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = 3000;


app.use(express.static(__dirname + "/public")); //configure the server to serve static files 
app.use(express.json());
app.get ("/", (req, res) => {
  //  res.send("Hello World")
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// API endpoint to get req at /notes
app.get ("/notes", (req, res) => {
  //  res.send("Hello World")
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//listen to api/notes  post
app.post("/api/notes", (req, res) => {
  console.log(req.body);
});

//Create(post) Retrieve(get) Update(put) Delete(delete) //HTML/hhtps protocol
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});