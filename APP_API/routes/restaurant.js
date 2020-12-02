var express = require('express');
var router = express.Router();
const auth = require('../../middleware/auth');

const ctrlMain = require('../controllers/restaurant')

//MENU
router.get('/menu', ctrlMain.getMenus);
router.get('/menu/:menuid', ctrlMain.getsinglemenu);
router.get('/menu/substance/search/:substance?', ctrlMain.getfilteredmenu);
router.post('/menu',auth,ctrlMain.createmenu);
router.put('/menu/:menuid', auth,ctrlMain.updatemenu);
router.delete('/menu/:menuid', auth, ctrlMain.deletemenu);

//CUSTOMER
router.get('/customer/:custid', ctrlMain.getcustomer);
router.post('/customer', ctrlMain.createcustomer);
router.put('/customer/:custid', ctrlMain.updatecustomer);



// ORDERS
router.get('/order', ctrlMain.getorders);
router.post('/orders', ctrlMain.createorder);
router.get('/order/:orderid',  ctrlMain.getsingleorder);
router.put('/order/:orderid', ctrlMain.cancelorder);


//RESERVATION
router.get('/reservationslots', ctrlMain.getavailability);
router.post('/reservationslots', ctrlMain.createavailability);
router.put('/reservationslots/:reservationslotid', ctrlMain.updateavailability);


router.get('/reservations', ctrlMain.getreservations);


//REVIEW
router.get('/reviews',  ctrlMain.getreviews);
router.post('/reviews/:orderid', ctrlMain.AddReview);

//CONTACT
router.get('/contacts',  ctrlMain.getcontacts);
router.post('/contacts', ctrlMain.AddContact);
module.exports = router;
