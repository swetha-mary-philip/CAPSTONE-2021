const moongose = require('mongoose');
var fs = require('fs');

const Menu = moongose.model("Menu");
const Order = moongose.model("Order");
const ReservationSlots = moongose.model("ReservationSlot");
const Reservation= moongose.model("Reservation");
const Customer= moongose.model("Customer");
const Review = moongose.model("Review");
const Contact = moongose.model("Contact");

//MENUS
const getMenus = function (req, res){
    
    Menu.find().exec(function(err,menudata){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(menudata);

    })
};

const getsinglemenu = function (req, res){
    
    let id = req.params.menuid;
    Menu.aggregate([
        {$match : {_id : moongose.Types.ObjectId(id)}}
    ]).exec(function(err, menudata) {
        if(err){
            res
            .status(404)
            .json(err);
            return;
        }
        
        res
        .status(200)
        .json(menudata);
    });

};


const createmenu = function(req,res){
  console.log(req.body);

    Menu.create({
        name :req.body.name,
        description: req.body.description,
        imageurl:req.body.imageurl,
        price:req.body.price,
        createdate:Date.now(),
        modifieddate:Date.now(),
        avg_rating:req.body.avg_rating,
        ingredients: req.body.ingredients     

    }, 
    (err,foodData) =>{
        if(err){
            res.status(400).json(err);
        }
        else{
            res.status(201).json(foodData);
        }
    })

}

const updatemenu = function (req, res){
    console.log(req.params.menuid);
    if(!req.params.menuid){
        res
        .status(404)
        .json({"message": "not found, Menuid is required"});
        return;
    }
    Menu.findById(req.params.menuid)
    .exec((err, menudata) => {
        if(!menudata){
            res
            .json(404)
            .status({"message": "Menuid not found"});
            return;
        }
        else if(err){
            res
            .status(400)
            .json(err);
            return;
        }
        
        
        menudata.name =req.body.name,
        menudata.description=req.body.description,
        menudata.imageurl=req.body.imageurl,
        menudata.price=req.body.price,
        menudata.modifieddate=Date.now(),
        menudata.avg_rating=req.body.avg_rating,
        menudata.ingredients=req.body.ingredients,        
        menudata.save((err,menudata) =>{
            if(err){
                res.status(404).json(err);
            }
            else{
                res.status(200).json(menudata);
            }
        })
    })
};

const deletemenu = function (req, res){
 
    let menuid = req.params.menuid;
        if(menuid){
            Menu.findByIdAndRemove(menuid)
            .exec((err, menudata) =>{
                if(err){
                    res
                    .status(404)
                    .json(err);
                    return;
                }
                res
                .status(204)
                .json({"message": "deleted"});    
            })
        }
        else{
            res
            .status(404)
            .json({"message": "no menuId"});
        }
};

const getfilteredmenu = function (req, res){

    let substance = (req.params.substance);

    if (substance != null)
        substance = substance.toLowerCase();
    
    Menu.find( { 'ingredients.name' : {'$ne': substance} }).exec(function(err,menudata){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(menudata);

    })

};

//CUSTOMER
const createcustomer = function (req, res){

    Customer.create({
        firstname :req.body.firstname,
        lastname :req.body.lastname,
        email :req.body.email,
        phone: req.body.phone,
        createdate:Date.now(),
        modifieddate:Date.now(),
        address: req.body.address     
    }, 
    (err,custData) =>{
        if(err){
            res.status(400).json(err);
        }
        else{
            res.status(201).json(custData);
        }
    })
};

const updatecustomer = function (req, res){
    console.log(req.params.custid);
    if(!req.params.custid){
        res
        .status(404)
        .json({"message": "not found, custid is required"});
        return;
    }
    Customer.findById(req.params.custid)
    .exec((err, custdata) => {
        if(!custdata){
            res
            .json(404)
            .status({"message": "custid not found"});
            return;
        }
        else if(err){
            res
            .status(400)
            .json(err);
            return;
        }
        
        custdata.firstname = req.body.firstname;
        custdata.lastname = req.body.lastname;
        custdata.email = req.body.email;
        custdata.phone = req.body.phone;
        //custdata.createdate = Date.now();
        custdata.modifieddate = Date.now();
        custdata.address = req.body.address;
    
        custdata.save((err,custdata) =>{
            if(err){
                res.status(404).json(err);
            }
            else{
                res.status(200).json(custdata);
            }
        })
    })
};

const getcustomer = function (req, res){
    
    let id = req.params.custid;
    Customer.aggregate([
        {$match : {_id : moongose.Types.ObjectId(id)}}
    ]).exec(function(err, custdata) {
        if(err){
            res
            .status(404)
            .json(err);
            return;
        }
        
        res
        .status(200)
        .json(custdata);
    });

};


//RESERVATION
const getavailability = function (req, res){
    
    ReservationSlots.find().exec(function(err,menudata){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(menudata);

    })
};


const createavailability = function(req,res){
    console.log(req.body);
  
    ReservationSlots.create({
        bookingslots:req.body.bookingslots,
        reservationdate: req.body.reservationdate,
        }, 
      (err,menudata) =>{
          if(err){
              res.status(400).json(err);
          }
          else{
              res.status(201).json(menudata);
          }
      })
  
  };

const updateavailability = function (req, res){
    if(!req.params.reservationslotid){
        res
        .status(404)
        .json({"message": "not found, reservationslotid is required"});
        return;
    }
    ReservationSlots.findById(req.params.reservationslotid)
    .exec((err, slotdata) => {
        if(!slotdata){
            res
            .json(404)
            .status({"message": "reservationid not found"});
            return;
        }
        else if(err){
            res
            .status(400)
            .json(err);
            return;
        }
        
        
        slotdata.bookingslots =req.body.bookingslots,
        slotdata.reservationdate=req.body.reservationdate,       
        slotdata.save((err,slotdata) =>{
            if(err){
                res.status(404).json(err);
            }
            else{
                res.status(200).json(slotdata);
            }
        })
    })
};


  
const getreservations = function (req, res){
    
    Reservation.find().exec(function(err,data){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(data);

    })
};


//ORDERS
const getorders = function (req, res){
    
    Order.find().exec(function(err,data){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(data);

    })
};

const cancelorder = function (req, res){
    if(!req.params.orderid){
        res
        .status(404)
        .json({"message": "not found, orderid is required"});
        return;
    }
    Order.findById(req.params.orderid)
    .exec((err, fooddata) => {
        if(!fooddata){
            res
            .json(404)
            .status({"message": "orderid not found"});
            return;
        }
        else if(err){
            res
            .status(400)
            .json(err);
            return;
        }
        
        fooddata.status = "Cancelled";
    
        fooddata.save((err,fooddata) =>{
            if(err){
                res.status(404).json(err);
            }
            else{
                res.status(200).json(fooddata);
            }
        })
    })
};

const getsingleorder = function (req, res){
    
    let id = req.params.orderid;
    Order.aggregate([
        {$match : {_id : moongose.Types.ObjectId(id)}},
        {$lookup: {
            from: "customers", // collection name in db
            localField: "customer_id",
            foreignField: "_id",
            as: "customer_details"
        }
    }
    ]).exec(function(err, orderdata) {
        if(err){
            res
            .status(404)
            .json(err);
            return;
        }
        
        res
        .status(200)
        .json(orderdata);
    });

};

const createorder = function (req, res){

    Order.create({
        status :req.body.status,
        order_type :req.body.order_type,
        special_instructions :req.body.special_instructions,
        orderdate: Date.now(),
        payment:req.body.payment,
        amount:req.body.amount,
        customer_id: moongose.Types.ObjectId(req.body.customer_id),
        order_details: req.body.order_details     
    }, 
    (err,orderData) =>{
        if(err){
            res.status(400).json(err);
        }
        else{
            res.status(201).json(orderData);
        }
    })
};


//REVIEWS
const getreviews = function (req, res){
    
    Review.find().exec(function(err,data){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(data);

    })
};

const AddReview = function(req,res){
  
    if(!req.params.orderid){
        res
        .status(404)
        .json({"message": "not found, foodid is required"});
        return;
    }

    Review.create({
        reviewername :req.body.reviewername,
        reviewcomment: req.body.reviewcomment,
        rating:req.body.rating,
        orderid: moongose.Types.ObjectId(req.params.orderid),
        reviewdate:  Date.now(),
    }, 
    (err,foodData) =>{
        if(err){
            res.status(400).json(err);
        }
        else{
            res.status(201).json(foodData);
        }
    })

}
const getcontacts = function (req, res){
    
    Contact.find().exec(function(err,data){
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(data);

    })
};
const AddContact = function(req,res){
      
    Contact.create({
        fullname :req.body.fullname,
        email: req.body.email,
        subject:req.body.subject,
        message:req.body.message
       
    }, 
    (err,foodData) =>{
        if(err){
            res.status(400).json(err);
        }
        else{
            res.status(201).json(foodData);
        }
    })

}

module.exports = {getMenus,getavailability,createavailability,updateavailability,getreservations, 
                    createcustomer, updatecustomer,getcustomer, deletemenu, getfilteredmenu,
                    getorders,getsingleorder, getsinglemenu, cancelorder, createorder,getreviews,AddReview,
                    createmenu,updatemenu,getcontacts,AddContact};

