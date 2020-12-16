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
router.get('/orders', ctrlMain.getorders);
router.post('/orders', ctrlMain.createorder);
router.get('/orders/:orderid',  ctrlMain.getsingleorder);
router.put('/orders/:orderid', ctrlMain.cancelorder);
router.get('/orders/customer/search/:email/', auth, ctrlMain.getcustomerorders);



//RESERVATION
router.get('/reservationslots', ctrlMain.getavailability);
router.post('/reservationslots', ctrlMain.createavailability);
router.put('/reservationslots/:reservationslotid', ctrlMain.updateavailability);


router.get('/reservations', ctrlMain.getreservations);


//REVIEW
router.get('/reviews/:menuid',  ctrlMain.getreviews);
router.post('/reviews/:menuid',auth, ctrlMain.AddReview);

//CONTACT
router.get('/contacts',  ctrlMain.getcontacts);
router.post('/contacts', ctrlMain.AddContact);

// EMAIL

router.post('/sendemail', ctrlMain.sendemail);

module.exports = router;
