const router = require('express').Router();
const authService = require('../services/authServices');

const { sessionName } = require('../constants');
const { isAuth, isGuest } = require('../middleware/authMiddleware');

const { getErrorMsg } = require('../util/errorMsg');


router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');

});

router.post('/login', isGuest, async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await authService.login(email, password);
        const token = await authService.createToken(user);

        res.cookie(sessionName, token, { httpOnly: true });
        res.redirect('/'); 

    } catch (err) {
        res.render('auth/login',  { error: 'Not valid email!' });
    }


});

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');

});

router.post('/register', isGuest, async (req, res) => {
    const { password, repeatPassword, ...userData } = req.body;

    if (password !== repeatPassword) {
        return res.render('auth/register', { error: 'Password must be equal' });

    };

    try {

        const createdUser = await authService.create({ password, ...userData });

        const token = await authService.createToken(createdUser);
        res.cookie(sessionName, token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {

        return res.render('auth/register', { error: getErrorMsg(error) });

    }

});

router.get('/logout', isAuth, (req, res) => {

    res.clearCookie(sessionName);
    res.redirect('/');

})


module.exports = router;