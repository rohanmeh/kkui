var bodyParser = require("body-parser");
var express = require("express");
var payments = require("./payments.js")
var passport = require('passport')
var session = require('express-session')
var RedisStore = require('connect-redis')(session)
var app = express();
var router = express.Router();
var path = __dirname + "/views";
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  store: new RedisStore({
    url: config.redisStore.url
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}))


app.use('/',router);

router.get("/login", function(req, res) {
    res.sendFile(path+"/login.html");
})

router.get("/home", function(req, res) {
    res.sendFile(path+"/index.html");
})
router.post("/home", function(req,res) {
    var account = req.body.Account
    var amount = req.body.Amount
    payments.makePayment(account,amount);
})

app.listen(3000, function () {
console.log("Example app listening on port 3000!");
});