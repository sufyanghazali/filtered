const express = require("express"),
    app = express(),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    PORT = process.env.PORT || 4000,
    session = require("express-session"),
    User = require("./models/user");


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

app.use(express.urlencoded({extended: true})); // replaces body-parser. parse url-encoded bodies
app.set("view engine", "ejs"); // needed to download
app.use(express.static("public")); // makes express look out for stuff in "public" dir
app.use(methodOverride("_method")); // needed to download
app.use(passport.initialize());
app.use(passport.session()); // applications need this for persistent login sessions

// Configure Session
app.use(session({
    secret: "yirgacheffe",
    resave: false,
    saveUninitialized: false
}))

// Passport Configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser);
passport.serializeUser(User.deserializeUser);

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// Routing
app.use(indexRoutes);
app.use("/shops", shopRoutes);

app.listen(PORT, (req, res) => {
    console.log("Server started. Yeet yeet!");
});