
let connection = require('../conexion/index')

let produccionModel = {}

/**
 * CRUL de datos para la tabla Produccion
 *
 */

// GET CONCTACTOS
produccionModel.getProducciones = function (callback) {
    if (connection) {
        var sql = "SELECT * FROM tb_produccion";

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
produccionModel.getProduccion = function (id, callback){
    if(connection){
        const sql = "SELECT * FROM tb_produccion WHERE id_produccion="+connection.escape(id)+";";
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
produccionModel.insertProduccion = function(ProduccionData, callback){
    if(connection){
        var sql="INSERT INTO tb_produccion SET ?"
        connection.query(sql, ProduccionData, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg": "Registro Insertado"})
            }
        })
    }
}

// PUT CONTACTO
produccionModel.updateProduccion = function(ProduccionData, callback){
    if (connection){
        var sql="UPDATE tb_produccion SET "
            + " id_produccion = " + connection.escape(ProduccionData.id_produccion)
            + ", fecha_produccion = " + connection.escape(ProduccionData.fecha_produccion)
            + ", horas_trabajo = " + connection.escape(ProduccionData.horas_trabajo)
            + ", costos_produccion = " + connection.escape(ProduccionData.costos_produccion)
            + ", descrip_produccion = " + connection.escape(ProduccionData.descrip_produccion)
            + ", cantidad_produccion = " + connection.escape(ProduccionData.cantidad_produccion)
            + " WHERE  id_produccion  =  " + connection.escape(ProduccionData.id_produccion) + ";";

        connection.query(sql, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg":"Registro actualizado"})
            }
        })
    }
}

module.exports = produccionModel