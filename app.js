let express = require('express');
let bodyParser = require('body-parser'), port = 3000;
let http = require('http')
let path = require('path')

let connect = require('./src/conexion/index');


let persona = require('./src/rutas/PersonaRuta');
let contacto = require('./src/rutas/ContactoRuta');
let proyecto = require('./src/rutas/ProyectoRuta');
let material = require('./src/rutas/MaterialRuta');


let app = express();


app.set('port', process.env.PORT || port);
app.use(bodyParser.json({type: 'application/json', limit: '10mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req,res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// RUTAS
app.use('/persona', persona());
app.use('/contacto', contacto());
app.use('/proyecto', proyecto());
app.use('/material', material());

http.createServer(app).listen(app.get('port'), function (){
    console.log('Servidor Express esuchando en el puerto ' + app.get('port'));
});


module.exports = app;