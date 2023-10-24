
let connection = require('../conexion/index')

let contactoModel = {}

/**
 * CRUL de datos para la tabla Contactos
 *
 */

// GET CONCTACTOS
contactoModel.getContactos = function (callback) {
    if (connection) {
        var sql = "SELECT c.id_contacto, tp.nombre_1, tp.apellido_1, c.contacto\n" +
            "from tb_contacto c inner join tb_persona tp on c.id_persona = tp.id_persona;"

        connection.query(sql, function (error, row) {
            if (error) {
                throw error
            } else {
                callback(null, row)
            }
        })
    }
}

// GET CONTACTO
contactoModel.getContacto = function (id, callback){
    if(connection){
        const sql = "SELECT c.id_contacto, tp.nombre_1, tp.apellido_1, c.contacto\n" +
            "from tb_contacto c inner join tb_persona tp on c.id_persona = tp.id_persona WHERE id_contacto="+connection.escape(id)+";";
        connection.query(sql, function (error, row){
            if(error) {
                throw error
            } else {
                callback(null, row)
            }
        });

    }
}

// POST CONTACTO
contactoModel.insertContacto = function(ContactoData, callback){
    if(connection){
        var sql="INSERT INTO tb_contacto SET ?"
        connection.query(sql, ContactoData, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg": "Registro Insertado"})
            }
        })
    }
}

// PUT CONTACTO
contactoModel.updateContacto= function(ContactoData, callback){
    if (connection){
        var sql="UPDATE tb_contacto SET "
            + " id_persona = " + connection.escape(ContactoData.id_persona)
            + ", contacto = " + connection.escape(ContactoData.contacto)
            + " WHERE  id_contacto  =  " + connection.escape(ContactoData.id_contacto) + ";";

        connection.query(sql, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg":"Registro actualizado"})
            }
        })
    }
}

module.exports = contactoModel