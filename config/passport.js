var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var bcrypt = require('bcrypt-nodejs');
var connection = require('../config/database');
var passport = require("passport");
var flash = require('connect-flash');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    connection.query("SELECT * FROM employee WHERE id = ? ", [id], function (err, rows) {
        done(err, rows[0]);
    });
});

passport.use(
    'local-signup',
    new LocalStrategy({

        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {

            connection.query("SELECT * FROM employee WHERE email = ?", [email], function (err, rows) {

                if (err)
                    return done(err);
                if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                }

                req.assert('firstname', 'Firstname is required').notEmpty();
                req.assert('lastname', 'Lastname is required').notEmpty();
                req.assert('companyname', 'Companyame is required').notEmpty();
                req.assert('email', 'A valid email is required').isEmail();
                req.assert('password', '"password is required"').len(6, 20)
                req.assert('conform', 'does not match password').equals(req.body.password);

                var errors = req.validationErrors();
                if (errors) {
                    console.log(errors);
                }

                else {

                    var newUserMysql = {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        companyname: req.body.companyname,
                        email: req.body.email,
                        password: bcrypt.hashSync(password, null, null),



                    };



                    var insertQuery = "INSERT INTO employee ( firstname, lastname, companyname, email, password ) values (?,?,?,?,?)";

                    connection.query(insertQuery, [newUserMysql.firstname,
                        newUserMysql.lastname, newUserMysql.companyname, newUserMysql.email, newUserMysql.password, ], function (err, rows) {
                        newUserMysql.id = rows.insertId;
                         return done(null, newUserMysql);
                         newUserMysql= new object();
                         newUserMysql.id=req.body.id;
                         
                        console.log('INSERT DATA SUCCESSFULLY');
                    });
                }
                if (insertQuery) {

                    let transporter = nodemailer.createTransport({

                        service: 'gmail',
                        secure: false,
                        port: 25,
                        auth: {
                            user: 'sankar00064@gmail.com',
                            pass: 'Gmail@0064'
                        },
                        tls: {
                            rejectUnathorized: false
                        }
                    });

                    let HelperOptions = {
                        url:'href="http://localhost:3000',
                        from: '"sankar" <sankar00064@gmail.com>',
                        to: req.body.email,
                        subject: 'Activation Link',
                        message: "please find the below Link",
                        html: 'Please click this email to conform your Email:<a href="{{url}}">Link</a>'
                    };
                    transporter.sendMail(HelperOptions, (err, info) => {
                        if (err) {
                            return console.log(err);
                        }
                        console.log('message has sent succefully', );
                    });
                } else {
                    console.log("could not sent email");
                }


            });
        })
);



passport.use(
    'local-login',
    new LocalStrategy({

        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            connection.query("SELECT * FROM employee WHERE email = ?", [email], function (err, rows) {
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }


                if (!bcrypt.compareSync(password, rows[0].password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                return done(null, rows[0]);
            });
        })
);

module.exports = passport;