var mongoose = require('mongoose');

var bookingslotslist = new mongoose.Schema({
    time : {type: String, required: true},
    tables : {type: Number, required: true}
});


var menuSchema = new mongoose.Schema({
    bookingslots: [bookingslotslist],
    reservationdate: {type:Date, required: true}
});

module.exports  = mongoose.model('ReservationSlot', menuSchema, 'reservationslots');

