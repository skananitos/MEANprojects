// ---------------------------------------------------
// --- IMPORT ALL MODULES AND CONFIGURATION NEEDED ---
//----------------------------------------------------

var express = require('express'); //express module
var app = express();

//SECURITY: block the header from containing information about the server
app.disable('x-powered-by');

//HANDLEBARS
var handlebars = require('express-handlebars').create({defaultLayout:'main'}); 
app.engine('handlebars', handlebars.engine); 
app.set('view engine', 'handlebars');

//BODY-PARSER
app.use(require('body-parser').urlencoded({extended: true})); //required when using POST to parse encoded data
 
//FORMIDABLE
var formidable = require('formidable'); //required to accept file uploads

//FILE SYSTEM
var fs = require("fs");

//CSRF-PROTECTION
var csrf = require('csurf');

var credentials = require('./credentials.js'); //credentials to secure cookies
app.use(require('cookie-parser')(credentials.cookieSecret)); //cookie middleware

//SET PORT
app.set('port', process.env.PORT || 3000);

// ----------------
// --- COOKIES ---
//-----------------
var cookieParser = require('cookie-parser');
app.use(cookieParser());

//SET COOKIE
app.use(function(req, res, next) {
  //check if client sent cookie
  var cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    //set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName', randomNumber, { maxAge: 90000, httpOnly: true });
    console.log('cookie created successfully');
  } else {
    //cookie was already present 
    console.log('cookie exists', cookie);
  } 
  console.log("Cookies : ", req.cookies); //show all stored cookies in the console

  //DELETE COOKIE
  // res.clearCookie('cookieName');
  // console.log('cookieName Cookie Deleted'); 

  next(); //pass the request to the next middleware
});

// ----------------
// --- SESSIONS ---
//-----------------
var session = require('express-session');
var parseurl = require('parseurl'); //provides info on the url of a request object

app.use(session({secret: credentials.cookieSecret, saveUninitialized: true, resave: true}));

//get statistics of visited pages - i.e. home page
app.use(function(req, res, next){
  var views = req.session.views;
  if(!views) { //if no views initialize an empty array
    views = req.session.views = {};
  }
  var pathname = parseurl(req).pathname; //get the current path 
  views[pathname] = (views[pathname] || 0) + 1; //increment the value in the array using the path as the key
  next(); 
});

// -------------------------
// --- STATIC MIDDLEWARE ---
//--------------------------
app.use(express.static(__dirname + '/public')); 

// ---------------------
// --- DEFINE ROUTES ---
//----------------------
app.get('/', function(req, res){
  res.render('home'); //point at the home.handlebars view  

  //STATISTICS
    var stats = 'Home page loaded ' + req.session.views['/'] + ' times \n';
    fs.writeFile('./public/stats.txt', stats, function (err) { //write stats file
     if (err)
         return console.error(err);
    }); 

  console.log('You viewed this page ' + req.session.views['/'] + ' times '); //show home page statistics
});


app.get('/about', function(req, res){
  res.render('about'); //point at the about.handlebars view
});


app.get('/upload', function(req, res){ //open upload.handlebars
  var now = new Date();
  res.render('upload',{
    year: now.getFullYear(), //store the current year
    month: now.getMonth() }); //and month
  });


app.post('/upload/:year/:month', function(req, res){ //open upload.handlebars
  
    var form = new formidable.IncomingForm(); // parse the uploaded file
    form.parse(req, function(err, fields, file){
      if(err) 
        return res.redirect(303, '/upload-err');
      console.log('Photo uploaded successfully');      
      console.log(file); //output file information
      res.redirect(303, '/thanks');
  });
});


app.use(session({ secret:'music life fun one', saveUninitialized: true, resave: true}));
app.use(csrf());

app.get('/contact', function(req, res){
  res.locals.csrf = encodeURIComponent(req.csrfToken());
  res.render('contact'); //point at the contact.handlebars view
});


app.get('/thanks', function(req, res){
  res.render('thanks'); //point at the thanks.handlebars view
});


app.post('/send', function(req, res){ //receive the contact form data

  var logoData = 'Form : ' + req.query.form + '\n';
  logoData += 'CSRF token : ' + req.body._csrf + '\n';
  logoData += 'Email : ' + req.body.email + '\n';
  logoData += 'Subject : ' + req.body.subj + '\n';
  logoData += 'Message : ' + req.body.msg + '\n';

  //TODO(on next version): store data to a database

  fs.appendFile('./public/logs.txt', logoData, function (err) { //append logs file
   if (err) {
       return console.error(err);
    }
  });

  // fs.readFile('./public/logs.txt', function (err, data) { //read logs file
  //  if (err) {
  //      return console.error(err);
  //  }
  //  console.log(data.toString());
  // });

  res.redirect(303, '/thanks'); //redirect to thanks.handlebars view after the contact form is processed
});


//CUSTOM 404 Page
app.use(function(req, res) {
  res.type('text/html');
  res.status(404); //default status is 200
  res.render('404'); //point at the 404.handlebars view
});
 

//CUSTOM 500 Page
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500'); //point at the 500.handlebars view
});


// ------------------------
// --- START THE SERVER ---
//-------------------------
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});