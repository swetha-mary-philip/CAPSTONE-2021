var mongoose = require("mongoose");
require('./menu');
require('./order');
require('./reservationslot');
require('./review');
require('./customer');
require('./reservation');
require('./contact');

var dburi = "mongodb+srv://sphilip5993:swetha@cluster0-vcoij.mongodb.net/restaurant?retryWrites=true&w=majority";

mongoose.connect(dburi, {dbName:"restaurant"})

mongoose.connection.on("connected", function(){
    console.log("connected");      
});

mongoose.connection.on("error", function(){
    console.log("error");
});

mongoose.connection.on("disconnected", function(){
    console.log("disconnected");
});

