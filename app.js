const express = require("express");
const app = express();
const port = 3000;

const userModel = require("./models/users");
const path = require("path");

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "public")));

app.get("/", (req, res) => {
  res.render("index");
});


app.post("/create", async (req, res) => {
  // console.log(req.body.phone," ",req.body.dob);
  let { name,phone,dob,email, image } = req.body;
// console.log(phone," ",dob);
  const createdUser = await userModel.create({
    name, // name:name,
    phone,
    dob,
    email,
    image
  });
  res.redirect("/read");
});


app.get("/read", async (req, res) => {
  const users=await userModel.find();
  res.render("read",{users});
});


app.post("/update/:userid", async (req, res) => {
let {image,name,email,phone,dob}=req.body;
  const user = await userModel.findOneAndUpdate({_id:req.params.userid},{image,name,email},{new:true});
  res.redirect("/read");
});


app.get("/edit/:userid", async (req, res) => {
  const user = await userModel.findOne({_id:req.params.userid});
  res.render("edit",{user});
});


app.get("/delete/:id", async (req, res) => {
  const createdUser = await userModel.findOneAndDelete({_id:req.params.id});
  res.redirect("/read");
});


app.listen(port, (req, res) => {
  console.log(`Server is running at port ${port}`);
});
