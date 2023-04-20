

const express = require('express'); 
const app = express();
//importamos la librería mongoose para conectar la database
const mongoose = require('mongoose');
//importamos la librería para validar datos
const { check, validationResult } = require('express-validator')
const { body } = require('express-validator');
//importamos las configuraciones para las variables de entorno
const dotenv = require('dotenv');
//un método 
//dotenv.config();

//otro método
require('dotenv').config(); 
const PORT = process.env.PORT || 8080;

//=========================================================================
//=========================================================================

//Traemos las url de conexiones a Mongo
const MONGOLOCAL = process.env.MONGOLOCAL;
const MONGOATLAS = process.env.MONGOATLAS;

//=========================================================================
//=========================================================================

//Conexión a la database de Mongo - 1
//mongoose.connect(MONGOLOCAL);

//Conexión a la database de Mongo - 2
mongoose.connect(MONGOLOCAL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
})
    .then(()=> {
        console.log(`Database conectada a Local`);
    })
    .catch((error) => {
        console.log(`El error es: ${error}`)
    })

//Conexión a la database de Mongo - 3
/*     mongoose.connect(MONGOATLAS)
        .then(()=> {
            console.log(`Database conectada a Atlas`);
        })
        .catch((error) => {
            console.log(`El error es: ${error}`)
        })
 */
//Esperamos 5 segundos para conectar la Base de Datos - 4
/* setTimeout(function() {
        console.log(`Arranco en 5 segundos`);
        mongoose.connect(MONGOLOCAL);
    }, 5000); */


//=========================================================================
//=========================================================================

//Middelwares: funciones intermedias
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//=========================================================================
//=========================================================================

//Rutas de la apllicación


app.get('/', (req, res) => { 
    console.log(req);
    res.status(200).json({
        mensaje: "Código 200 - Todo OK!"
    });
});

app.get('/error', (req, res) => { 
    console.log('Error');
    res.status(500).send(`<h1>Todo mal!!</h1>`)
});


app.post('/', 
    [
        check('nombre').isLength({min:4}),
        check('email').isEmail(),
        check('password').isLength({min:5}),
    ]
    ,    
    (req, res) => {

    
        const errores = validationResult(req);

        if(!errores.isEmpty()){
            return res.status(400).json({
                errores: errores.array()
            })
        }
    

    
    //obtenemos los datos y las gurdamos en variables
    /*   let nombre = req.body.nombre;
    let email = req.body.email;
    let password = req.body.password;  */

    console.log(req.body);

    //desestructuramos los datos y lo guardamos en variables
    const { nombre, email, password } = req.body;

    /* if(password.length >= 8){ //ejemplo de validaciones anteriores
        console.log('Pass OK')
    }else{
        console.log(`El pass debe tener 8 caracteres`);
    } */

    //console.log(req.body);

    console.log(`Mis datos son: ${nombre} - ${email} - ${password}`);

    res.status(200).end('Tus datos fueron recibidos')
});


app.post('/body', 
    //[ 
    body('nombre').isLength({ min: 4 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
    //]
    ,    
    (req, res) => {

        const { nombre, email, password } = req.body;
    
        const errores = validationResult(req);

        if(!errores.isEmpty()){
            return res.status(400).json({
                errores: errores.array()
            })
        }

        res.status(200).json({
            mensaje: 'User creado'
        })

        console.log(`Mis datos son: ${nombre} - ${email} - ${password}`);

    });
    


app.listen(PORT,  function() {

    console.log(`Servidor conectado en el Puerto ${PORT}`);

})
