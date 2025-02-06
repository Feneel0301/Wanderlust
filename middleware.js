const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const { reviewSchema } = require("./schema.js");
const Review = require("./models/reviews.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged!");
         return res.redirect("/login");
     }
     next();
};


module.exports.saveRedirectUrl = (req, res, next) => {
   if(req.session.redirectUrl){
     res.locals.redirectUrl = req.session.redirectUrl;
   }
   next();
};

module.exports.isOwner = async(req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error", "You don't have permission");
    return res.redirect(`/listings/${id}`);
  }
  next();
};



module.exports.validateListings = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
      let errMSG = error.details
        .map((el) => `${el.path.join(".")}: ${el.message}`)
        .join(", ");
      throw new ExpressError(400, errMSG);
    } else {
      next();
    }
  };
 

  module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
      let errMSG = error.details
        .map((el) => `${el.path.join(".")}: ${el.message}`)
        .join(", ");
      throw new ExpressError(400, errMSG);
    } else {
      next();
    }
  };


  module.exports.isReviewAuthor = async(req, res, next) => {
    let { id, reviewID } = req.params;
    let review = await Review.findById(reviewID);
    if(!review.author._id.equals(res.locals.currUser._id)){
      req.flash("error", "You don't have permission");
      return res.redirect(`/listings/${id}`);
    }
    next();
  };
  
