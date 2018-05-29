var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var passport = require('../config/passport');
var LocalStrategy = require('passport-local').Strategy;
var connection = require('../config/database');
var flash = require('connect-flash');
var expressvalidator=require('express-validator');
var bcrypt = require('bcrypt');





/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('user/login');
  // console.log("'");
});

/* GET Registration page. */
router.get('/register', function (req, res, next) {
  res.render('user/register',{message: req.flash('message')});
});



/* GET Login page. */
router.get('/login', function (req, res, next) {
  res.render('user/login');
});

  /*Get Profile */
router.get('/profile',isLoggedIn,function (req, res, next) {
  res.render('user/profile');
});




  /* Passport signin */
router.post('/signin',passport.authenticate('local-login',{

  successRedirect:'/',
  failureRedirect:'/login',	
  failureFlash:true
 }));

  /* Passport signup */
 router.post('/signup',passport.authenticate('local-signup',{
  

  successRedirect:'/login',
  failureRedirect:'/register',	
  failureFlash:true
 }));



router.get('/logout', isLoggedIn, function(req, res) {
req.logout();
res.redirect('/login');
});




function isLoggedIn(req,res,next){
if(req.isAuthenticated())
return next();
res.redirect('/login');
}



/*getdata*/
// router.get('/records', function (req, res) {
//   connection.query(" SELECT * FROM employee ", function (err, data) {
//     if (!err) {
//       console.log(data);
//       res.send(data);
//     } else {
//       console.log(err);
//     }
//   })
// });


//get data on particular id
// router.get('/records/:id', function (req, res) {
//   connection.query(" SELECT * FROM employee WHERE id= ? ", [req.params.id], function (err, data) {
//     if (!err) {
//       console.log(data);
//       res.send(data);
//     } else {
//       console.log(err);
//     }
//   })
// });

////insert data
// router.post('/insert', function (req,res,next) {

//   req.assert('firstname','Name is required').notEmpty();
//  req.assert('lastname','name is required').notEmpty();
//  req.assert('companyname','Name is required').notEmpty();
//   req.assert('email','A valid email is required').isEmail();
//   req.assert('password','"passwor is required"').len(6,20)
//   req.assert('conform','conform it').equals(req.body.password);

//     var errors = req.validationErrors();
//     if (errors) {
//       console.log(errors);
//       res.json(errors);
     
//      }


// bcrypt.hash(req.body.password, 10, function( err, bcryptedPassword){
  
// var data = {
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     companyname: req.body.companyname,
//     email: req.body.email,
//    password: bcryptedPassword
  
//     }

//     connection.query("INSERT INTO employee set ? ",
//     data, function (err, data) {
//       if (err) {

//         res.render('user/register');
//         console.log('not inserted any data');
        
//         } else {
//    res.render('user/login');
//   console.log("inserted data");
//       }

  
// });
//   });
 
  


// //send mail
//   let transporter = nodemailer.createTransport({

//     service: 'gmail',
//     secure: false,
//     port: 25,
//     auth: {
//       user: 'sankar00064@gmail.com',
//       pass: 'Gmail@0064'
//     },
//     tls: {
//       rejectUnathorized: false
//     }
//   });

//   let HelperOptions = {
//     from: '"sankar" <sankar00064@gmail.com>',
//     to: req.body.email,
//     subject: 'my resume',
//     message: "please find below attaached documents",
//     html: '<p>Click <a href="http://localhost:3000/reg">here</a> to activate your profile</p>'
//   };
//   transporter.sendMail(HelperOptions, (err, info) => {
//     if (err) {
//       return console.log(err);
//     }
//     console.log('message has sent succefully', );
//   });
// });


//update
// router.put('/update/:id', function (req, res) {

  // req.assert('firstname','firstName is required').notEmpty();
  // req.assert('lastname','lastName is required').notEmpty();
  // req.assert('companyname','comapnyName is required').notEmpty();
  // req.assert('email','A valid email is required').isEmail();
  // req.assert('password','Enter a password 6 - 20').len(6,20);
  // req.assert('password2', 'Password do not match').equals(req.body.password);

  // var errors = req.validationErrors();
  // if(errors){
  //     res.status(422).json(errors);
  //     return;
  // }

//   var id = req.params.id;
//   var data = {
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     companyname: req.body.companyname,
//     email: req.body.email,
//     password: req.body.password
//   };

//   connection.query(" UPDATE  employee set ? WHERE id= ? ",
//     [data, id], function (err, data) {
//       if (!err) {
//         console.log(data);
//         res.send("upddate successfully");
//       } else {
//         console.log(err);
//       }
//     })
// });

//delete
// router.delete('/delete/:id', function (req, res) {

//   connection.query(" DELETE FROM employee WHERE id= ? ", [req.params.id], function (err, data) {
//     if (!err) {
//       console.log(data);
//       res.send("successfully deleted data");
//     } else {
//       console.log(err);
//     }
//   })
// });




module.exports = router;
