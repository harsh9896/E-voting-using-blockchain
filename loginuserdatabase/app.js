const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets",express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "nodejs"
});

// connect to the database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from loginuser where email_address = ? and pass = ?",[username,password],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/welcome");
        } else {
            res.redirect("/");
        }
        console.log(username,password);
        res.end();
    })
})


app.post("/registerUser",encoder, function(req,res){
    var aadhar = req.body.aadhar;
    var address = req.body.address;
    var pass = req.body.password;
    var name= req.body.name;
    connection.query("insert into loginuser (email_address, aadhar, user_name, pass) VALUES(?, ?, ?, ?)",[address,aadhar, name, pass],function(error,results,fields){
        
        res.redirect("http://localhost:4000/welcome");
        // if (results.length > 0) {
        //     res.redirect("/welcome");
        // } else {
        //     res.redirect("/");
        // }
        //console.log(username,password);
        res.end();
    })
})


// when login is success
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/welcome.html")
})

app.get("/reg",function(req,res){
    res.sendFile(__dirname + "/reg.html")
})



// set app port 
app.listen(4000);




//use localhost:4000 to run this