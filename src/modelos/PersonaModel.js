
let connection = require('../conexion/index')

let personaModel = {}

/**
 * CRUL de datos para la tabla personas
 *
 */

// GET PERSONAS
personaModel.getPersonas = function (callback) {
    if (connection) {
        var sql = "SELECT * FROM tb_persona;"

        connection.query(sql, function (error, row) {
            if (error) {
                throw error
            } else {
                callback(null, row)
            }
        })
    }
}

// GET PERSONA
personaModel.getPersona = function (id, callback){
    if(connection){
        const sql = "SELECT * FROM tb_persona WHERE id_persona="+connection.escape(id)+";";
        connection.query(sql, function (error, row){
            if(error) {
                throw error
            } else {
                callback(null, row)
            }
        });

    }
}

// POST PERSONA
personaModel.insertPersona = function(PersonaData, callback){
    if(connection){
        var sql="INSERT INTO tb_persona SET ?"
        connection.query(sql, PersonaData, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg": "Registro Insertado"})
            }
        })
    }
}

// PUT PERSONA
personaModel.updatePersona= function(PersonaData, callback){
    if (connection){
        var sql="UPDATE tb_persona SET "
            + " nombre_1 = " + connection.escape(PersonaData.nombre_1)
            + ", nombre_2 = " + connection.escape(PersonaData.nombre_2)
            + ", apellido_1 = " + connection.escape(PersonaData.apellido_1)
            + ", apellido_2 = " + connection.escape(PersonaData.apellido_2)
            + ", nu_documento = " + connection.escape(PersonaData.nu_documento)
            + " WHERE  id_persona  =  " + connection.escape(PersonaData.id_persona) + ";";

        connection.query(sql, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg":"Registro actualizado"})
            }
        })
    }
}

module.exports = personaModel