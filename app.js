const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.post('/', function(req, res){

  

    const apikey = "87bc09bfc1f36bb188de6f33d3848cf0"
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey;

    https.get(url, function(response){

        console.log(response.statusCode);


        response.on("data", function(data){
            
            const weatherData = JSON.parse(data)
            const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            

            res.set("Content-Type", "text/html");

            res.write("<img src=" + icon + ">");
            res.write("<h1> The temperature in " + query + " is " + temp +"</h1>");
            res.write("<p> The weather is currently " + weatherDescription + "</p>");

            res.send();



        })

    });

})

app.get('/', function(req, res){
    res.sendFile(__dirname+'/'+"index.html")
})



// app.get("/", function(req, res){


//     const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=87bc09bfc1f36bb188de6f33d3848cf0";

//     https.get(url, function(response){

 
//         response.on("data", function(data){
            
//             const j = JSON.parse(data)
//             console.log(j)



//         })

//     });



//     res.send("<h1>Yo this site works lol</h1>")
// });


app.listen(3000, function() {
    console.log("Listening to post 3000")
});