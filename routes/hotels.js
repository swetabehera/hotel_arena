const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const hotels = require('../controllers/hotels');
// const { hotelSchema } = require('../schemas.js');
// const { isLoggedIn } = require('../middleware');
const { isLoggedIn, isAuthor, validateHotel } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

// const ExpressError = require('../utils/ExpressError');
const Hotel = require('../models/hotel');

//Schema validation function: 2nd layer that validates at JS level before it can push into DB
// const validateHotel = (req, res, next) => {
//     const { error } = hotelSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }

// router.get('/', catchAsync(async (req, res) => {
//     const hotels = await Hotel.find({});
//     res.render('hotels/index', { hotels })
// }));

// router.get('/', catchAsync(hotels.index));

router.route('/')
    .get(catchAsync(hotels.index))
    .post(isLoggedIn, upload.array('image'), validateHotel, catchAsync(hotels.createHotel))

// router.get('/new', isLoggedIn, (req, res) => {
//     res.render('hotels/new');
// })
router.get('/new', isLoggedIn, hotels.renderNewForm)

// router.post('/', isLoggedIn, validateHotel, catchAsync(async (req, res) => {
//     const hotel = new Hotel(req.body.hotel);
//     hotel.author = req.user._id;
//     await hotel.save();
//     req.flash('success', 'Successfully made a new hotel!');
//     res.redirect(`/hotels/${hotel._id}`)
// }))

// router.post('/', isLoggedIn, validateHotel, catchAsync(hotels.createHotel))

router.route('/:id')
    .get(catchAsync(hotels.showHotel))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateHotel, catchAsync(hotels.updateHotel))
    .delete(isLoggedIn, isAuthor, catchAsync(hotels.deleteHotel));

// router.get('/:id', catchAsync(async (req, res,) => {
//     const hotel = await Hotel.findById(req.params.id).populate({
//         path: 'reviews',
//         populate: {
//             path: 'author'
//         }
//     }).populate('author');
//     // console.log(hotel);
//     if (!hotel) {
//         req.flash('error', 'Cannot find that hotel!');
//         return res.redirect('/hotels');
//     }
//     res.render('hotels/show', { hotel });
// }));
// router.get('/:id', catchAsync(hotels.showHotel));

// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
//     // const hotel = await Hotel.findById(req.params.id)
//     const { id } = req.params;
//     const hotel = await Hotel.findById(id)
//     if (!hotel) {
//         req.flash('error', 'Cannot find that hotel!');
//         return res.redirect('/hotels');
//     }
//     res.render('hotels/edit', { hotel });
// }))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(hotels.renderEditForm))

// router.put('/:id', isLoggedIn, isAuthor, validateHotel, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const hotel = await Hotel.findByIdAndUpdate(id, { ...req.body.hotel });
//     req.flash('success', 'Successfully updated hotel!');
//     res.redirect(`/hotels/${hotel._id}`)
// }));
// router.put('/:id', isLoggedIn, isAuthor, validateHotel, catchAsync(hotels.updateHotel));

// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     await Hotel.findByIdAndDelete(id);
//     req.flash('success', 'Successfully deleted hotel')
//     res.redirect('/hotels');
// }))
// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(hotels.deleteHotel));

module.exports = router; 