const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

// router.get('/register', (req, res) => {
//     res.render('users/register');
// });

// router.get('/register', users.renderRegister);

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

// router.post('/register', catchAsync(async (req, res, next) => {
//     try {
//         const { email, username, password } = req.body;
//         const user = new User({ email, username });
//         const registeredUser = await User.register(user, password);
//         req.login(registeredUser, err => {
//             if (err) return next(err);
//             req.flash('success', 'Welcome to Hotel Arena!');
//             res.redirect('/hotels');
//         })
//     } catch (e) {
//         req.flash('error', e.message);
//         res.redirect('register');
//     }
// }));
// router.post('/register', catchAsync(users.register));

// router.get('/login', (req, res) => {
//     res.render('users/login');
// })
// router.get('/login', users.renderLogin)

// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
//     req.flash('success', 'Welcome back!');
//     const redirectUrl = req.session.returnTo || '/hotels';
//     delete req.session.returnTo;
//     res.redirect(redirectUrl);
// })
// router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

// router.get('/logout', (req, res) => {
//     req.logout();
//     req.flash('success', "Goodbye!");
//     res.redirect('/hotels');
// })
router.get('/logout', users.logout)

module.exports = router; 