const router = require('express').Router();
const cryptoService = require('../services/cryptoService');


router.get('/', async (req, res) => {
    const cryptoResult = await cryptoService.getAll().lean();
    const cryptos = cryptoResult.map(x => ({ ...x }));

    res.render('home', { cryptos });
});



module.exports = router;
