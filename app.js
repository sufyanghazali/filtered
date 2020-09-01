const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs"); // need to download


app.get("/", (req, res) => {
    res.render("index");
});

app.listen(PORT, (req, res) => {
    console.log("Server started. Yeet yeet!");
})