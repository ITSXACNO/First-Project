const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/index.html")
})

app.post("/bmiCal", function(req, res) {
    res.sendFile(__dirname+"/bmiCalculator/bmi.html");
})

app.post("/bmi-cal", function(req, res) {
    var w = Number(req.body.weight);
    var h = Number(req.body.height);

    var bmi = w / (Math.pow(h, 2));

    res.write("<h1> BMI RESULT </h1>")
    res.write("Your Bmi is declared at: "+bmi);
})

app.post("/drum-Kit", function(req, res) {
    res.sendFile(__dirname+"/Drum-Kit/drum.html");
})

app.post("/newsletter", function(req, res) {
    res.sendFile(__dirname+ "/SignUp/signup.html");
})

app.post("/signed-up", function(req, res) {

    firstName = req.body.fName;
    lastName = req.body.lName;
    email = req.body.myEmail;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FName: firstName,
                    LName: lastName
                }

            }
        ]
    }

    var jsonData = JSON.stringify(data);

    var url = "https://us11.api.mailchimp.com/3.0/lists/14ac099e09";

    var option = {
        method: "POST",
        auth: "acno1:ad8e10c2e45f24196228d15abd57f638-us11"
    }

    var request = https.request(url, option, function(response){
        console.log(response);

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
        if (response.statusCode === 200){
            res.sendFile(__dirname+ "/SignUp/success.html")
        }
        else{
            res.sendFile(__dirname+ "/SignUp/failure.html")
        }
    })
    request.write(jsonData);
    request.end();
})

app.listen(3000, function() {
    console.log("Server has started at port 3000");
})

app.post("/failed", function(req, res){
    res.redirect("/newsletter");
})

app.post("/simon-game", function(req, res) {
    res.sendFile(__dirname+"/SimonGame/index.html");
})