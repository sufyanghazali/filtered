const express = require("express");
const methodOverride = require("method-override");
const PORT = process.env.PORT || 4000;
const session = require("express-session");
const User = require("./models/user");

const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const app = express();

// Require routes
const indexRoutes = require("./routes/index");
const shopRoutes = require("./routes/shops");

// Connect to database. If on local machine, it should use localhost
// If in production environment, should use DATABASEURL from env variables
const url = process.env.DATABASEURL || "mongodb://localhost/filtered";
// const url = "mongodb+srv://sufyan:<password>@cluster0.bpyr4.mongodb.net/<dbname>?retryWrites=true&w=majority"

// console.log(process.env);
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Connected to ${url}`);
}).catch(err => {
    console.log(`ERROR: ${err}`);
})


app.set("view engine", "ejs"); // needed to download

app.use(express.urlencoded({extended: true})); // replaces body-parser. parse url-encoded bodies
app.use(express.static("public")); // makes express look out for stuff in "public" dir
app.use(methodOverride("_method")); // needed to download

// Configure Session
app.use(session({
    secret: "yirgacheffe",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session()); // applications need this for persistent login sessions

// Passport Configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Register routes
app.use(indexRoutes);
app.use("/shops", shopRoutes);

app.listen(PORT, (req, res) => {
    console.log("Server started. Yeet yeet!");
});