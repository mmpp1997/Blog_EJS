import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var posts=[];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs",{
    data: posts
});
});

app.get("/form", (req, res) => {
  res.render("form.ejs");
});

app.post("/form", (req, res) => {
  if(req.body["title"]!=""){
  var post={title:req.body["title"],name:req.body["name"],email:req.body["email"],text:req.body["text"]};
  posts.push(post)
  console.log(posts);
  res.redirect('/');
  }
  else{
    console.log("nema naslova");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
