const express = require('express');
const path = require('path');
const fs = require("fs");
const methodOverride = require('method-override');

const app = express();
const port = 8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.static(path.join(__dirname,"/public/js")));
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}));
// app.use(express.json());
//----------------------------------------------------------------------

const data = require("./data.json");

app.get("/",(req,res)=>{
    res.render("index.ejs",{data});
});

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{data});
});

app.get("/posts/new",(req,res)=>{
    res.render("addPost.ejs");
});

app.post("/posts",(req,res)=>{
    let {author,question} =req.body;

    let newPost = {
        id: data.length +1,
        author: author,
        question: question
    }

    data.push(newPost);

    fs.writeFileSync(
       "./data.json",
       JSON.stringify(data,null,4)
    );

    console.log("Post added");

    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
     let {id} = req.params;
     let detail = data.find((curr) => curr.id==id);
     res.render("viewPost.ejs",{detail});
});

app.get("/posts/:id/edit",(req,res)=>{
     let {id} = req.params;
     let detail = data.find((curr) => curr.id==id);
     res.render("editPost.ejs",{detail});
});

app.patch("/posts/:id",(req,res)=>{
      let {id} = req.params;
      let detail = data.find((curr) => curr.id==id);

      let newContent = req.body.question;
      detail.question=newContent;

      fs.writeFileSync(
        "./data.json",
        JSON.stringify(data, null, 4)
      );

      res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {

    let { id } = req.params;

    let index = data.findIndex((curr) => curr.id == id);

    data.splice(index, 1);

    fs.writeFileSync(
        "./data.json",
        JSON.stringify(data, null, 4)
    );

    res.redirect("/posts");
});

app.listen(port,()=>{
   console.log("app listening..");
});

