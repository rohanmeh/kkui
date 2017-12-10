var bodyParser = require("body-parser");
var express = require("express");
var passport = require('passport')
var session = require('express-session')
var app = express();
var router = express.Router();
var path = __dirname + "/views";
var cors = require("cors")
var http = require("http");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(cors());
app.use( express.static( "public" ) );
app.use('/',router);

var account = {};
var account2 = {};
var requests = {};
var requests2 = {};

router.get('/', (req, res) => {
    // render list of requests
    var options = {
        "method": "GET",
        "hostname": "ec2-34-239-103-24.compute-1.amazonaws.com",
        "port": "4000",
        "path": "/requests?parentID=123456",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "8419695d-3db2-0fae-cb0e-da83b9dc9c20"
        }
    };
    var request = http.request(options, function (res) {
    var chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        res.on("end", function () {
            requests = Buffer.concat(chunks);
            console.log(requests.toString());
        });
    });
    request.end()
    console.log(requests);
    requests = requests.toString();
    requests = JSON.parse(requests);

    //get balance
    var options = {
        "method": "GET",
        "hostname": "ec2-34-239-103-24.compute-1.amazonaws.com",
        "port": "4000",
        "path": "/accounts?id=223456",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "65a9b2e0-ebf3-b71c-e941-efc3ec4977b8"
        }
    };

    var req2 = http.request(options, function (res) {
    var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            account = Buffer.concat(chunks);
            console.log(account.toString());
            account = account.toString();
            console.log(account);
            account = account.substr(1).slice(0, -1);
            //var accounts2 = JSON.parse(account[0]);
            //console.log(accounts2);
        });
        });

    req2.end();
    account = JSON.parse(account);
    res.render('home', { account: account,requests:requests })
})

router.get('/parent', (req, res) => {
    // render list of requests
    var options = {
        "method": "GET",
        "hostname": "ec2-34-239-103-24.compute-1.amazonaws.com",
        "port": "4000",
        "path": "/requests?parentID=123456",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "8419695d-3db2-0fae-cb0e-da83b9dc9c20"
        }
    };
    var request = http.request(options, function (res) {
    var chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        res.on("end", function () {
            requests2 = Buffer.concat(chunks);
            console.log(requests2.toString());
        });
    });
    request.end()
    console.log(requests);
    requests2 = requests2.toString();
    requests2 = JSON.parse(requests2);

    //get balance
    var options = {
        "method": "GET",
        "hostname": "ec2-34-239-103-24.compute-1.amazonaws.com",
        "port": "4000",
        "path": "/accounts?id=123456",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "65a9b2e0-ebf3-b71c-e941-efc3ec4977b8"
        }
    };

    var req2 = http.request(options, function (res) {
    var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            account2 = Buffer.concat(chunks);
            console.log(account.toString());
            account2 = account2.toString();
            console.log(account);
            account2 = account2.substr(1).slice(0, -1);
            //var accounts2 = JSON.parse(account[0]);
            //console.log(accounts2);
        });
        });
    req2.end();
    account2 = JSON.parse(account2);
    res.render('home2', { account: account2,requests:requests2 })
})

router.get("/login", function(req, res) {
    res.sendFile(path+"/login.html");
})

router.post("/login", function(req, res) {
    res.sendFile(path+"/index.html");
})

router.get("/home", function(req, res) {
    res.sendFile(path+"/index.html");
})

router.get("/childHome", function(req,res) {
    res.render('childHome.ejs')
   // res.sendFile(path+"/childHome.html")
})

router.post("/parent", function(req,res) {
    var amount = req.body.Amount
    console.log("AMOUNT: "+ amount);
    var path = "/sendFund?parentID=123456&childID=223456&amount=" + amount;

    var options = {
    "method": "GET",
    "hostname": "ec2-34-239-103-24.compute-1.amazonaws.com",
    "port": "4000",
    "path": "/sendFund?parentID=123456&childID=223456&amount=30",
    "headers": {
        "cache-control": "no-cache",
        "postman-token": "8088c029-138a-b83c-c3dd-18149184df9a"
    }
    };

    var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });
    });

    req.end();

    var options = {
        "method": "GET",
        "hostname": "ec2-34-239-103-24.compute-1.amazonaws.com",
        "port": "4000",
        "path": "/requests?parentID=123456",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "8419695d-3db2-0fae-cb0e-da83b9dc9c20"
        }
    };
    var request = http.request(options, function (res) {
    var chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        res.on("end", function () {
            requests2 = Buffer.concat(chunks);
            console.log(requests2.toString());
        });
    });
    request.end()
    console.log(requests);
    requests2 = requests2.toString();
    requests2 = JSON.parse(requests2);

    //get balance
    var options = {
        "method": "GET",
        "hostname": "ec2-34-239-103-24.compute-1.amazonaws.com",
        "port": "4000",
        "path": "/accounts?id=123456",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "65a9b2e0-ebf3-b71c-e941-efc3ec4977b8"
        }
    };

    var req2 = http.request(options, function (res) {
    var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            account2 = Buffer.concat(chunks);
            console.log(account.toString());
            account2 = account2.toString();
            console.log(account);
            account2 = account2.substr(1).slice(0, -1);
            //var accounts2 = JSON.parse(account[0]);
            //console.log(accounts2);
        });
        });
    req2.end();
    account2 = JSON.parse(account2);
    res.render('home2', { account: account2,requests:requests2 })
})
router.post("/", function(req,res) {
    var description = req.body.Description
    var amount = req.body.Amount
    console.log("foaehrfourahg" + description);
    console.log(amount);
    var path = "/requestFund?parentID=123456&childID=323456&desc=" + description + "&amount=" + amount;
    var options = {
        "method": "GET",
        "hostname": "ec2-34-239-103-24.compute-1.amazonaws.com",
        "port": "4000",
        "path": path,
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "c6015f77-2134-8fde-a15a-5cd8446397cb"
        }
    };

    var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
    });
    });

    req.end();
    var options = {
        "method": "GET",
        "hostname": "ec2-34-239-103-24.compute-1.amazonaws.com",
        "port": "4000",
        "path": "/requests?parentID=123456",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "8419695d-3db2-0fae-cb0e-da83b9dc9c20"
        }
    };
    var request = http.request(options, function (res) {
    var chunks = [];
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        res.on("end", function () {
            requests = Buffer.concat(chunks);
            console.log(requests.toString());
        });
    });
    request.end()
    console.log(requests);
    requests = requests.toString();
    requests = JSON.parse(requests);

    //get balance
    var options = {
        "method": "GET",
        "hostname": "ec2-34-239-103-24.compute-1.amazonaws.com",
        "port": "4000",
        "path": "/accounts?id=223456",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "65a9b2e0-ebf3-b71c-e941-efc3ec4977b8"
        }
    };

    var req2 = http.request(options, function (res) {
    var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            account = Buffer.concat(chunks);
            console.log(account.toString());
            account = account.toString();
            console.log(account);
            account = account.substr(1).slice(0, -1);
            //var accounts2 = JSON.parse(account[0]);
            //console.log(accounts2);
        });
        });

    req2.end();
    account = JSON.parse(account);
    console.log("balance: " + account.toString());
    console.log("requests: " + requests.toString());
    res.render('home', { account: account,requests:requests })
        //payments.makePayment(account,amount);
})

app.listen(3000, function () {
console.log("Example app listening on port 3000!");
});