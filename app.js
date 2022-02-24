const express=require('express');
const app=express();
const nodemailer=require('nodemailer');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./src/views');
app.get('/',function(req,res){
    res.send("Welcome to Coding Competition #2 by ASIA ZURUR.K ,  FSD KKEM OCT")
  
});
app.get('/home',function(req,res){
    res.render('index');

})
app.post('/home',function(req,res){
 console.log(req.body.email);
 const demo=req.body.email;
    res.send("Mail Sent Successfully")
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });
  var mailOptions = {
    from: 'asiyasuroor@gmail.com',
    to: demo,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
})

app.listen(process.env.PORT ||5000);