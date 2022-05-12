const express = require('express');
//used mergeParams: true as id param in hotels/:id/reviews cannot be accessed otherwise. 
const router = express.Router({ mergeParams: true });

const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

const Hotel = require('../models/hotel');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');

// const { reviewSchema } = require('../schemas.js');

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

// const validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }

//Path for reviews
// router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
//     const hotel = await Hotel.findById(req.params.id);
//     const review = new Review(req.body.review);
//     review.author = req.user._id;
//     hotel.reviews.push(review);
//     await review.save();
//     await hotel.save();
//     req.flash('success', 'Created new review!');
//     res.redirect(`/hotels/${hotel._id}`);
// }))
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
//     const { id, reviewId } = req.params;
//     await Hotel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//     await Review.findByIdAndDelete(reviewId);
//     req.flash('success', 'Successfully deleted review')
//     res.redirect(`/hotels/${id}`);
// }))
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;