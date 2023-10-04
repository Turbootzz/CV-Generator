const express = require("express");
const path = require("path");
// require(dotenv).config({ path: __dirname + '/.env'});

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static( __dirname + "/public"));

app.use((req, res) => {
    res.status(404);
    res.sendFile( __dirname + "/public/404.html");
})

app.listen(3000, () => {
    console.log(`App listening on port ${PORT}`);
});