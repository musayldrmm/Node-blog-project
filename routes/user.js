const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/user");
const nodemailer = require("nodemailer");

router.get("/login", (req, res) => {
  res.send("Logindesin");
});

router.get("/register", (req, res) => {
  res.send("Kayıt oldasın");
});

router.post("/register", async (req, res) => {
  try {
    const hashedPwd = await bcrypt.hash(req.body.value.password, saltRounds);

    let user = new User({
      name: req.body.value.name,
      surname: req.body.value.surname,
      email: req.body.value.email,
      password: hashedPwd,
    });
    await user.save();
    console.log(user);
    const outputHTML = `
    <h2>Merhaba</h2>
    <ul>
        <li>Sayın ${req.body.value.name}</li>
    </ul>
    <h3>Message</h3>
    <p>Üyelik başarılı şekilde oluşturuldu.</p>`;
    async function main() {
      let testAccount = await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "fitnessdiaryinfotr@gmail.com",
          pass: "cmijtaasbvkrcktf",
        },
      });

      let info = await transporter.sendMail({
        from: 'FitnessDiary ',
        to: `${req.body.value.email}`,
        subject: "node contact",
        text: "Hello world?",
        html: outputHTML,
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    main().catch(console.error);
    res.status(200).send(user._id);
  } catch (error) {
    console.log(error);
    res.status(500).send("errorr");
  }
});
router.post("/login", async (req, res) => {

  const user = await User.findOne({ email: req.body.value.email });
  try {
    if (user) {
      const cmp = await bcrypt.compare(req.body.value.password, user.password);
      if (cmp) {
        req.session.userId = user._id;
        console.log(req.session.userId);
        console.log("başarılı giriş yaptınız");
        res.send(200, req.session.userId);
        console.log(req.session.userId);
      } else {
        res.send(402, "Email veya sifre yanlıs");
      }
    } else {
      console.log("üyelik yanlış");
      res.send(404, "kullanıcı bulunamadı");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
});

module.exports = router;
