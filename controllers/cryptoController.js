const router = require('express').Router();

const cryptoService = require('../services/cryptoService');
const { isAuth } = require('../middleware/authMiddleware');
const { isPreload, isCryptoOwner } = require('../middleware/cryptoMiddleware');
const { getErrorMsg } = require('../util/errorMsg');

router.get('/', async (req, res) => {
    const cryptos = await cryptoService.getAll().lean();
    res.render('crypto', { cryptos });
});

router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {

    const createdPublicData = { ...req.body, owner: req.user._id };

    try {
        await cryptoService.create(createdPublicData);
        res.redirect('/cryptos');
    } catch (error) {
        res.render('crypto/create', { ...req.body, error: 'Username should be minimum 2 characters long OR Description should be minimum 10 characters long!' });
    }


});

router.get('/:cryptoId/details', async (req, res) => {

    const crypto = await cryptoService.getOneDetails(req.params.cryptoId).lean();
    const isOwner = crypto.owner._id == req.user?._id;
    const isBuy = crypto.buyCrypto.includes(req.user?._id);

    res.render('crypto/details', { crypto, isOwner, isBuy });

});

router.get('/:cryptoId/edit', isAuth, isPreload, isCryptoOwner, (req, res) => {
    res.render('crypto/edit', { ...req.crypto });
});

router.post('/:cryptoId/edit', isAuth, isPreload, isCryptoOwner, async (req, res) => {

    try {
        await cryptoService.updateOne(req.params.cryptoId, req.body);
        res.redirect(`/cryptos/${req.params.cryptoId}/details`);

    } catch (error) {
        res.render('crypto/edit', { ...req.body, error: getErrorMsg(error) });
    }
});

router.get('/:cryptoId/delete', isAuth, isPreload, isCryptoOwner, async (req, res) => {
    await cryptoService.delete(req.params.cryptoId);
    res.redirect('/cryptos');
});

router.get('/:cryptoId/buy', isAuth, async (req, res) => {

    const crypto = await cryptoService.getOne(req.params.cryptoId);
    crypto.buyCrypto.push(req.user._id);
    await crypto.save();
    res.redirect('/');
});


module.exports = router;
