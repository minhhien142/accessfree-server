var express = require('express');
var router = express.Router();
var modal = require('./mongoose/mongoose.js');
const MY_DOMAIN = "http://accessfree.tk";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/data', (req, res) =>{

  console.log(req.body.data);
  console.log("hello");
  res.json(req.body);
  
  // res.render('index', { title: 'Express' });
  
});

router.post('/data', (req, res) =>{
  console.log(req.body);
  var newCookie = new modal.Cookie({ url: req.body.url, cookies: req.body.data });
  newCookie.save(function (err, data) {
    if (err) {
      console.log(err);
      res.json({error: "error"});
  
    } else {
      console.log(data.id);
      res.json({id: MY_DOMAIN + "/access/" + data.id});
      // res.render('access', {});
  
    }
  });

  // res.render('index', { title: 'Express' });
  
});
router.get('/access/:id', (req, res, next) =>{
  modal.Cookie.findOne({ '_id': req.params.id },'url', function (err, person) {
    if (err) return handleError(err);
    console.log(person) // Space Ghost is a talk show host.
    // res.json(person.url);
      res.render('access', {});
    
    // res.redirect(person.url);
  })
  
})

router.post('/getdata', (req, res) =>{
  modal.Cookie.findOne({ '_id': req.body.id },'url cookies', function (err, person) {
    if (err) return handleError(err);
    console.log(person) // Space Ghost is a talk show host.
    // res.json(person.url);
    // res.redirect(person.url);
    res.json(person);
  })
})

module.exports = router;
