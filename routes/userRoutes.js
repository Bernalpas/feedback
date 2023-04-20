
const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const {
    paginaPrincipal,
    paginaError,
    registrarUsuario,
    paginaPrueba
} = require('../controllers/userControllers')

router.get('/', paginaPrincipal);

router.get('/error', paginaError);

router.post('/',  
[
    check('nombre').isLength({min:4}),
    check('email').isEmail(),
    check('password').isLength({min:5}),
], registrarUsuario);

router.post('/body', 
    body('nombre').isLength({ min: 4 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
, paginaPrueba);


module.exports = router;