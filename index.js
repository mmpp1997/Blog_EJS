import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var posts=[];
var topics=[
  {name:"General",color:"orange"},
  {name:"Drama",color:"blue"},
  {name:"Sports",color:"red"},
  {name:"Movies",color:"yellow"},
  {name:"Other",color:"grey"}
]
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs",{
    data: posts
});
});
app.get("/form", (req, res) => {
  res.render("form.ejs",{
    topics:topics
  });
});
app.post("/details", (req, res) => {
  var btn_id=req.body["detail"];
  for(var i=0;i<posts.length;i++){
    if(btn_id==posts[i].id){
      var selected_post=posts[i];
      break;
    }
  }
  res.render("details.ejs",{
    about:selected_post
  });
});

app.post("/form", (req, res) => {
  var id=Math.floor(Math.random()*10000);
  for(i=0;i<posts.length;i++){
    if(id==posts[i].id){
      var id=Math.floor(Math.random()*10000);
      i=0;
    }
  }
  for(i=0;i<topics.length;i++){
    if(topics[i].name==req.body["topic"]){
      var post_color=topics[i].color;
      break;
    }
  }

  var post={
    id:id,
    title:req.body["title"],
    name:req.body["name"],
    topic:req.body["topic"],
    color:post_color,
    text:req.body["text"]};
  posts.push(post);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
