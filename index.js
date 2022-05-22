const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const path = require("path")
const methodOverride = require("method-override");
const app = express()
const {v4:uuid} = require('uuid')
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.set('view engine','ejs')
app.use(methodOverride("_method"));

let comment = [{
    id: uuid(),
    user : "hwkk" ,
    todo : "haii"}];

app.get('/',(req,res)=>{
   
    res.render("index",{comment})
})




app.post('/',(req,res)=>{
    // console.log(req.body)
    const { todo,user } = req.body;
    comment.push({ todo, user,id:uuid() });
    res.redirect('/')
})




app.get("/detail/:id", (req, res) => {
  const { id } = req.params;
  let d = comment.find((c) => c.id === id);
//   console.log(d, "here is the data of the d");
  res.render('detail',{d});
});


app.patch("/detail/:id", (req, res) => {
  const { id } = req.params;
  const newtodo = req.body.todo;
  const newuser = req.body.user;
  console.log(newtodo, newtodo);
  let foundTodo = comment.find((c) => c.id === id);
  foundTodo.user = newuser
  foundTodo.todo = newtodo
  res.redirect("/");
});

app.delete("/detail/:id", (req, res)=>{
    const {id}=req.params;
    comment = comment.filter(c=> c.id===id);
    res.redirect("/")


})


app.get('*',(req,res)=>{
    res.send({"mes":"page not foung"})
})


app.listen(3000,()=>{
    console.log("it is working on 8000")
})

