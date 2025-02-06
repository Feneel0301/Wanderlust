const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");


//reviews post  route
module.exports.CreateReview = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    await newReview.save();
    listing.reviews.push(newReview._id);
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
  };

   // Delete route
  module.exports.DeleteReview =  async(req, res)=>{
    let { id, reviewID } = req.params;
    let listing = await Listing.findById(id);
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewID}});
    await Review.findByIdAndDelete(reviewID);
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${listing._id}`);
  
  }