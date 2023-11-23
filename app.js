const express = require("express");
const path = require("path");
// require(dotenv).config({ path: __dirname + '/.env'});
const app = express();
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

const PORT = 3000 || process.env.PORT;
var favicon = require('serve-favicon');

app.use(express.static( __dirname + "/public"));

app.set("view engine", "ejs");

// addons
app.use('/public/assets/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/public/assets/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/public/assets/css', express.static(path.join(__dirname, '/node_modules/bootstrap-icons/font')));
app.use('/public/assets/img/icons', express.static(path.join(__dirname, '/node_modules/bootstrap-icons/icons')));
app.use('/public/assets/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/public/assets/js', express.static(path.join(__dirname, '/node_modules/jquery.repeaster')));

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

// not found page
app.use((req, res) => {
    res.status(404);
    res.render(__dirname + "/public/views/404");
});

// port
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});