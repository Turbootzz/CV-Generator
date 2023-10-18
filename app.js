const express = require("express");
const path = require("path");
// require(dotenv).config({ path: __dirname + '/.env'});
const app = express();
const PORT = 3000 || process.env.PORT;
var favicon = require('serve-favicon')

app.use(express.static( __dirname + "/public"));

app.set("view engine", "ejs");

// adds bootstrap
app.use('/public/assets/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/public/assets/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/public/assets/css', express.static(path.join(__dirname, '/node_modules/bootstrap-icons/font')));
app.use('/public/assets/img/icons', express.static(path.join(__dirname, '/node_modules/bootstrap-icons/icons')));

app.use(favicon(path.join(__dirname, '/public/assets/img', 'favicon.ico')))

// home page
app.get('/', (req, res) => {
    res.render(__dirname + '/public/views/index')
})
  
// cv page
app.get('/cv', function(req, res) {
    res.render(__dirname + '/public/views/cv');
});

app.use((req, res) => {
    res.status(404);
    res.sendFile( __dirname + "/public/views/404.ejs");
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});