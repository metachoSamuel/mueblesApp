let mysql = require('mysql')
let settings = require('./config.json')

let connection;


// Conexion con la Base de datos
function connectDatabase(){
    if(!connection){
        connection = mysql.createConnection(settings)
        connection.connect(function(err){
            if(!err){
                console.log('Base de datos conectada '+settings.database)
            }else{
                console.log('Error en la conexión con la base de datos'+settings.database)
            }
        });
    }
    return connection
}

// Exportar la conexion

module.exports = connectDatabase();

