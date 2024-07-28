//const express = require("constants");
const express = require("express");
const path = require("path");
const {v4:uuidv4} = require("uuid");
const port = 8080;
const methodOverride = require("method-override");


const app = express();


app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));





let data=[
    {   id:uuidv4(),
        name:"ben",
        postContent:"hello world",
        likes:1000,
    },
    {   id:uuidv4(),
        name:"dev",
        postContent:"hello firend",
        likes:1000,
    },{ id:uuidv4(),
        name:"mark",
        postContent:"arigatho",
        likes:1000,
    }
];





app.listen
(port,(req,res)=>
{
    console.log("port is started at",port);
})




app.get
("/",(req,res)=>
{
    res.send("server is working well");
})




app.get
("/posts",(req,res)=>
{
    res.render("index",{data});
})





app.post
("/posts",(req,res)=>
{
    console.log(req.body);
    req.body.id=uuidv4();
    let {id,name,postContent,likes} = req.body;
    data.push({id,name,postContent,likes});
    console.log(data);
    res.redirect("/posts");
})





// after getting the data it 
app.get
("/posts/new",(req,res)=>
{
    res.render("newPost");
})





//more details
app.get
("/posts/:id",(req,res)=>{
    let id = (req.params).id;
    let searchData = [data.find(obj=> obj.id === id)];
    
    console.log(searchData);
    console.log(id);
    res.render("searchResult",{searchData});
})



//rendering the edit page by sending the data to it

app.get
("/posts/:id/edit",(req,res)=>{
let {id} = (req.params);
let searchData = [data.find(obj=> obj.id === id)];
res.render("editPage",{searchData});

});



//pathc work
app.patch("/posts/:id",(req,res)=>{
    let id = req.params.id;
    let content = req.body.postContent;
    console.log(id);
    console.log(content);
    let searchObj = data.find(obj => obj.id ===id);
    searchObj.postContent = content;
    // alert("success");
    res.redirect("/posts");
   console.log(searchObj);


});


//distroyer

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    data = data.filter(p =>   p.id != id );
    // console.log(obj);
    // console.log(req.body)
    res.redirect("/posts");
})


