const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isReviewAuthor , validateReview  } = require("../middleware.js");
const ReviewController = require("../controllers/reviews.js");

// REVIEWS
//reviews post  route
router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync( ReviewController.CreateReview ));
  
  // Delete route
  router.delete("/:reviewID",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync( ReviewController.DeleteReview));

  module.exports = router;