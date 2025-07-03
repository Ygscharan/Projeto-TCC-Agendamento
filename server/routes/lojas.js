const express = require('express');
const {
    getAllLojas,
    createLoja,
    getLojaById,
    updateLoja,
    deleteLoja
} = require('../controllers/lojaController');

const router = express.Router();


router.get('/', getAllLojas);


router.post('/', createLoja);


router.get('/:id', getLojaById);


router.put('/:id', updateLoja);


router.delete('/:id', deleteLoja);

module.exports = router;