var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
  res.render('index', { title: 'Home Page' });
});


router.get('/login', function(req, res){
    res.render('login', { title: 'User Login' });
});

router.post('/userlogin', function(req, res){
     var db = req.db;
     var username = req.body.username;
     var password = req.body.password;
     var collection = db.get('usercollection');
    collection.count({'username' : username,'password' : password}, function(res){
         if(res == 1){
         res.send("login successfull");
          } else {
          res.send("login");
           } 
   });
       
});


router.get('/signup', function(req, res){
    res.render('signup', { title: 'Signup!' });
});

router.post('/adduser', function(req, res){
       if (req.body.password != req.body.repassword) {
         res.send('Passwords do not match! Re-enter' );
       } else {
       var db = req.db;
       var firstname = req.body.firstname;
       var lastname = req.body.lastname;
       var username = req.body.username;
       var useremail = req.body.useremail;
       var password = req.body.password;
       var repassword = req.body.repassword;
       var collection = db.get('usercollection');
       
       collection.insert({
            "firstname" : firstname,
            "lastname" : lastname,
            "username" : username,
            "useremail" : useremail,
            "password" : password
       }, function(err, doc) {
        if (err) {            
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.location("login");
            res.redirect("login");
        }         
    });
   }
});

module.exports = router;
