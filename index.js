const express=require('express');
const app=express();
// getting-started.js
app.use(express.json());
const mongoose = require('mongoose');
app.use(express.json());
let student={
    name:"Yash",
    age:12
}

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get("/",(req,res)=>{
    console.log(student);
    res.send("Succesful");
})

app.get("/body",(req,res)=>{
    const {name,age}=req.body;
    console.log(name);
    res.send("Hello!");
})

app.listen("3000",()=>{
    console.log("app is listening on port 3000");
    console.log("connected to database");
})

app.post("/post",(req,res)=>{
    res.send("This is a post request.");
})

app.put("/post",(req,res)=>{
    res.send("This is a put request.");
})

app.delete("/post",(req,res)=>{
    res.send("This is a delete request.");
})



//This part is added by me for further process.