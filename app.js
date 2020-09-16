const express = require("express"),
    app = express(),
    PORT = process.env.PORT || 4000,
    mongoose = require("mongoose");

// Require routes
const indexRoutes = require("./routes/index");
const shopRoutes = require("./routes/shops");

// Connect to database. If on local machine, it should use localhost
// If in production environment, should use DATABASEURL from env variables
const url = process.env.DATABASEURL || "mongodb://localhost/filtered";
// const url = "mongodb+srv://sufyan:<password>@cluster0.bpyr4.mongodb.net/<dbname>?retryWrites=true&w=majority"

console.log(process.env);
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Connected to ${url}`);
}).catch(err => {
    console.log(`ERROR: ${err}`);
})

app.use(express.urlencoded({extended: true})); // replaces body-parser. parse url-encoded bodies
app.set("view engine", "ejs"); // need to download
app.use(express.static("public"));

// Routing
app.use(indexRoutes);
app.use("/shops", shopRoutes);

app.listen(PORT, (req, res) => {
    console.log("Server started. Yeet yeet!");
});