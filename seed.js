const mysql = require('mysql2');
const { faker } = require('@faker-js/faker');
require('dotenv').config()

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'quora_app',
  password: process.env.DB_PASSWORD
});

let getUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    `What is ${faker.word.adjective()} ${faker.word.noun()}?`,
  ];
};

let data=[];
for(let i=1;i<=100;i++){
    data.push(getUser());
}

let q="INSERT INTO posts (id,author,question) VALUES ?"

connection.query(q,[data],(err,result)=>{
     if(err){
       console.log(err);
     }
     else{
       console.log(`${result.affectedRows} posts inserted successfully!`);
     }
     connection.end();
});