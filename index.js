import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var posts=[];
var topics=["General","Drama","Sports","Movies","Other"]
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
app.get("/details", (req, res) => {
  res.render("details.ejs");
});

app.post("/form", (req, res) => {
  var id=Math.floor(Math.random()*10000);
  for(i=0;i<posts.length;i++){
    if(id==posts[i].id){
      var id=Math.floor(Math.random()*10000);
      i=0;
    }
  }
  var post={
    id:id,
    title:req.body["title"],
    name:req.body["name"],
    topic:req.body["topic"],
    text:req.body["text"]};
  posts.push(post);
  console.log(posts);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
