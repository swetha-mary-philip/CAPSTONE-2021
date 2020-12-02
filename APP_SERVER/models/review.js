var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    reviewername:{type:String, required:true},
    reviewcomment:{type:String, required:true, minlength:10, maxlength:500},
    rating :{type:Number, required: true},
    orderid: { type : mongoose.Schema.Types.ObjectId, ref : 'Menu'},
    reviewdate : {type:Date}
});


module.exports  = mongoose.model('Review', reviewSchema, 'reviews');
