//jshint esversion: 6
const bodyParser=require("body-parser");
const request=require("request");
const express=require("express");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
const jsdom = require("jsdom");
const fs = require("fs");
const jquery = require('jquery');




app.use(express.static("public"));

app.get('/second/css/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "second/css/style.css");
  });
app.get('/second/css/owl.carousel.css', function(req, res) {
    res.sendFile(__dirname + "/" + "second/css/owl.carousel.css");
  });
  app.get('/second/images/1.jpg', function(req, res) {
    res.sendFile(__dirname + "/" + "/second/images/1.jpg");
  });
app.get('/second/js/skycons.js', function(req, res) {
    res.sendFile(__dirname + "/" + "second/js/skycons.js");
  });
app.get('/second/js/owl.carousel.js', function(req, res) {
    res.sendFile(__dirname + "/" + "second/js/owl.carousel.js");
  });
  app.get('/second/js/jquery-2.2.3.min.js', function(req, res) {
    res.sendFile(__dirname + "/" + "second/js/jquery-2.2.3.min.js");
  });
//   app.get("/",function(req,res){
//     // app.use(express.static("web"));
//      res.sendFile(__dirname+"/Signup.html");
//  });




app.post("/",function(req,res){
  var cityName=req.body.destination;
  var statue1;
 request(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=e41b7534ebd25851dfb23c61cba7ab1c`
 ,function(error,response,body){
   var data=JSON.parse(body);
    statue1=data.list[0].weather[0].description;
    console.log(statue1);

     var temprature=data.list[0].main.temp_max;
     console.log(temprature);
    fs.readFile(__dirname+'/second/index.html', 'utf8', (err, data) => {
        const dom = new jsdom.JSDOM(data);
        const $ = jquery(dom.window);
        //console.log(dom.window.document);
        $("h4").text(cityName);
       $("#statue").text(statue1);
       $("#temprature").text(Math.ceil(temprature-273.15));


    
        fs.writeFile('second/index.html', dom.serialize(), function(err) {
          if(err)console.log(err);
          console.log("The file was saved!");
          res.sendFile(__dirname+"/second/index.html");
        });
      });
    });
    

    // fs.unlink(__dirname+"/second/index2.html",err=>{
    //   console.log('sda');
    // });
    
     });

     



 
app.listen(3000,function(){
    console.log("server is running on 3000");
});