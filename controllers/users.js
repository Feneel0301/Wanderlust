const User =  require("../models/user.js");


// signup.ejs
module.exports.RanderSignup = (req, res)=> {
    res.render("users/signup.ejs");
 }


// singup
module.exports.signup = async(req, res)=> {
    try{
    let {username, email, password} = req.body;
    const newUser =  new User({email, username});
    const registeredUser = await User.register(newUser, password);   
    req.login(registeredUser, (err) => {
       if(err){
          return next(err);
       }
       req.flash("success", "Welcome to Wanderlust!");
       res.redirect("/listings")
    })
 }
    catch(e) {
       req.flash("error", e.message);
       res.redirect("/signup");
    }
 }



// login.ejs
module.exports.loginejs = (req, res) => {
    res.render("users/login.ejs");
}


// login
module.exports.login = async(req, res) => {
    req.flash("success", "Welcome back to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
 }


 // logout
 module.exports.logout = (req, res) => {
    req.logout((err) => {
       if(err){
          return next(err);
       }
       req.flash("success", "you are logged out!");
       res.redirect("/listings")
    })
 }