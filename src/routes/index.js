const router = require('express').Router();

// importamos los routes
const helloRoute = require('./hello');
const homeRoute = require('./home');

// paths con su propio route
router.use('/hello', helloRoute);
router.use('/home', homeRoute);

// path con retorno directo
router.use('/', (req, res) => 
{ 
    res.json(
        { 
            version: "0.0.1",
            paths: [
                "/hello",
                "/home"
            ] 
        }
        ); 
}
)

module.exports = router;