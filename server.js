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
  // res.send("Hello World")
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//listen to api/notes  post
app.post("/api/notes", (req, res) => {
  const arr = JSON.parse(fs.readFileSync("db.json"));
  arr.push(req.body); 
  fs.writeFileSync("db.json",`[${arr.map((el,index) => JSON.stringify({...el,id:index}))}]`);
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes",(req, res) => {
  const arr = JSON.parse(fs.readFileSync("db.json"));
  res.send(arr);
});

app.delete("/api/notes/:id",(req,res) =>{

  ///the id of the element we want to delete
  const id=req.params.id;
  
  
   const arr = JSON.parse(fs.readFileSync("db.json"));
  
   const arr2=[];
   for(let i=0;i<arr.length;i++){
      if(arr[i].id !=id){
        arr2.push(arr[i]);
      }
   }
   
  fs.writeFileSync("db.json",`[${arr2.map((el,index) => JSON.stringify({...el,id:index}))}]`);
  res.sendFile(path.join(__dirname, "/public/notes.html"));
  
  
  
  })
  
//Create(post) Retrieve(get) Update(put) Delete(delete) //HTML/hhtps protocol
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});