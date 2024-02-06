const express = require("express");
const path = require("path");
// require(dotenv).config({ path: __dirname + '/.env'});
const app = express();
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000 || process.env.PORT;
var favicon = require('serve-favicon');

app.use(cors()); // Allows request from any IP (prevent any CORS error)

app.use(express.static( __dirname + "/public"));

app.set("view engine", "ejs");

// addons
app.use('/public/assets/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/public/assets/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/public/assets/css', express.static(path.join(__dirname, '/node_modules/bootstrap-icons/font')));
app.use('/public/assets/img/icons', express.static(path.join(__dirname, '/node_modules/bootstrap-icons/icons')));
app.use('/public/assets/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/public/assets/js', express.static(path.join(__dirname, '/node_modules/jquery.repeaster')));
app.use('/public/assets/js', express.static(path.join(__dirname, '/node_modules/@emailjs/dist')));

app.use(favicon(path.join(__dirname, '/public/assets/img', 'favicon.ico')));

// home page
app.get('/', (req, res) => {
    res.render(__dirname + '/public/views/index')
});
  
// generator page
app.get('/generator', function(req, res) {
    res.render(__dirname + '/public/views/generator');
});

// feedback page
app.get('/feedback', function(req, res) {
    res.render(__dirname + '/public/views/feedback');
});
// app.post('/feedback', upload.any(), function (req, res) {
//     console.log(req.body); // Text input
//     console.log(req.files); // Metadata about uploaded files (if any)
// });
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// not found page
app.use((req, res) => {
    res.status(404);
    res.render(__dirname + "/public/views/404");
});

// port
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});