const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const UserController = require("../controllers/users.js");


// signup.ejs
router.get("/signup", UserController.RanderSignup);


// singup
router.post("/signup", wrapAsync(UserController.signup));


// login.ejs
router.get("/login", UserController.loginejs);


// login
router.post("/login",
   saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: '/login', failureFlash:  true}), wrapAsync(UserController.login));


// logout
router.get("/logout", UserController.logout);


module.exports = router;