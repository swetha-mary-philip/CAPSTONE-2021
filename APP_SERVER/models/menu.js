var mongoose = require('mongoose');

var ingredientsList = new mongoose.Schema({
    name : {type: String, required: [true, 'Ingredient name is required']}
});


var menuSchema = new mongoose.Schema({
    name : {type: String, required: true, minlength: 3},
    description: {type: String, required: true, maxlength:1000},
    imageurl: {type: String, required: true},
    price: {type: String, required: true},
    ingredients: [ingredientsList],
    createdate: {type:Date},
    modifieddate: {type:Date},
    avg_rating: {type: Number}
});

module.exports  = mongoose.model('Menu', menuSchema, 'menus');

