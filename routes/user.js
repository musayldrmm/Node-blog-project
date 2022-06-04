const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/user");

router.get("/login", (req, res) => {
  res.send("Logindesin");
});

router.get("/register", (req, res) => {
  res.send("Kayıt oldasın");
});

router.post("/register", async (req, res) => {
  try {
    const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
   
    let user = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      hakkinda:req.body.hakkinda,
      password: hashedPwd,
    });
    await user.save();
    
    res.status(200).send(user);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("errorr");
  }
});

router.post("/login", async (req, res) => {
  console.log("email:" + req.body.email);
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  try {
    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        req.session.userId = user._id;
    console.log(req.session.userId)
        console.log("başarılı giriş yaptınız"); 
        res.redirect("/");
      } else {
        console.log("şifre yanlıs");

        res.redirect("/user/login");
      }
    } else {
      res.redirect("/user/register");
      console.log("üyelik yanlış");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
});

module.exports = router;
