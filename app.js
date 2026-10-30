const express = require('express');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config()
const methodOverride = require('method-override');
const { faker } = require('@faker-js/faker');

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
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'quora_app',
  password: process.env.DB_PASSWORD
});
//-----------------------------------------------------------------------
app.get("/",(req,res)=>{
    let q = "SELECT * FROM posts";
    connection.query(q,(err,data)=>{
        if (err) {
           console.error(err);
           return res.status(500).send("Database error");
        }

        res.render("index.ejs", { data });
    })
});

app.get("/posts",(req,res)=>{
    let q = "SELECT * FROM posts";
    connection.query(q,(err,data)=>{
        if (err) {
           console.error(err);
           return res.status(500).send("Database error");
        }

        res.render("index.ejs", { data });
    })
});

app.get("/posts/new",(req,res)=>{
    res.render("addPost.ejs");
});


app.post("/posts",(req,res)=>{
    let {author,question} =req.body;
    let id = faker.string.uuid();

    let insertQuery = "INSERT INTO posts (id,author,question) VALUES (?,?,?)";
    let u = [id,author,question];
    
    connection.query(insertQuery,u,(err,data)=>{
        if (err) {
           console.error(err);
           return res.status(500).send("Database error");
        };
        console.log("Post added");
        res.redirect("/posts");
    })
});

app.get("/posts/:id",(req,res)=>{
     let {id} = req.params;
     let q = "SELECT * FROM posts WHERE id = ?";
     connection.query(q, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }

        if (data.length === 0) {
            return res.status(404).send("Post not found");
        }

        let detail = data[0];

        res.render("viewPost.ejs", { detail });
    });
});

app.get("/posts/:id/edit",(req,res)=>{
     let {id} = req.params;
     let q = "SELECT * FROM posts WHERE id = ?";
     connection.query(q, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }

        if (data.length === 0) {
            return res.status(404).send("Post not found");
        }

        let detail = data[0];

        res.render("editPost.ejs",{detail});
    });
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.question;

    let q = "UPDATE posts SET question = ? WHERE id = ?";

    connection.query(q, [newContent, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Post not found");
        }

        res.redirect("/posts");
    });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;

    let q = "DELETE FROM posts WHERE id = ?";

    connection.query(q, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Database error");
        }

        if (result.affectedRows === 0) {
            return res.status(404).send("Post not found");
        }

        res.redirect("/posts");
    });
});

app.listen(port,()=>{
   console.log("app listening..");
});