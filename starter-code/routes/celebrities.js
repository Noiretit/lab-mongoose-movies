const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity.js');

//IT 2
//GET celebrity list page to show all CELEBRITIES
router.get('/', (req, res, next) => {
    Celebrity.find()
        .then(allCelebsFromDB => {
            console.log(`${allCelebsFromDB}, celebrities.js`)
            res.render('celebrities/index', {
                celebrities: allCelebsFromDB
            })
        })
        .catch((err) => {
            console.log('Error while displaying the celebs', err)
            next(err)
        })
});

//IT 4
//GET celebrities/new para crear una nueva
router.get('/new', (req, res, next) => {
    res.render('celebrities/new')
});

//POST celebrities
router.post('/new', (req, res, next) => {
    //Cojo la info del form con req.body y la guardo en 3 constantes.
    const {
        name,
        occupation,
        catchPhrase
    } = req.body;
    //Paso esas 3 constantes como argumentos al modelo de Celebrity y creo una nueva.
    //La guardo en una variable.
    const newCelebrity = new Celebrity({
        name,
        occupation,
        catchPhrase
    })
    newCelebrity
        .save()
        .then((newCeleb) => {
            res.redirect('/celebrities');
        })
        .catch((err) => {
            console.log('Error while creating a new celeb', err)
            res.render('celebrities/new')
        })
});

//IT 3
//GET celebrities/:id  para ver info específica
router.get('/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then(thisCelebDB => {
            console.log(`${thisCelebDB}, celebrities.js`);
            res.render('celebrities/show', {
                thisCeleb: thisCelebDB
            })
        })
        .catch((err) => {
            console.log('Error while displaying an specific celeb', err)
            next(err)
        })
});


module.exports = router;