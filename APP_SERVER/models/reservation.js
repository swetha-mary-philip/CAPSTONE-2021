var mongoose = require('mongoose');


var orderSchema = new mongoose.Schema({
   customer_id: {type : mongoose.Schema.Types.ObjectId, ref : 'Customer'},
   order_id: {type : mongoose.Schema.Types.ObjectId, ref : 'Order'},
   reservationdate : {type:Date, required: true},
   tables : {type: Number, required: true},
   slots: { type:String, required: true},
   guests: {type: Number}
});


module.exports = mongoose.model('Reservation', orderSchema, 'reservations');
