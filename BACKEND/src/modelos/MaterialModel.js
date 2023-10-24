
let connection = require('../conexion/index')

let materialModel = {}

/**
 * CRUL de datos para la tabla Materiales
 *
 */

// GET CONCTACTOS
materialModel.getMateriales = function (callback) {
    if (connection) {
        var sql = "SELECT m.id_material, ctm.tipo_material, m.caracteristica_material,m.cantidad_material\n" +
            "FROM tb_material m\n" +
            "INNER JOIN ct_tipo_material ctm on m.tipo_material = ctm.id_tipo_material"

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
materialModel.getMaterial = function (id, callback){
    if(connection){
        const sql = "SELECT m.id_material, ctm.tipo_material, m.caracteristica_material,m.cantidad_material\n" +
            "FROM tb_material m\n" +
            "INNER JOIN ct_tipo_material ctm on m.tipo_material = ctm.id_tipo_material WHERE id_material="+connection.escape(id)+";";
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
materialModel.insertMaterial = function(MaterialData, callback){
    if(connection){
        var sql="INSERT INTO tb_material SET ?"
        connection.query(sql, MaterialData, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg": "Registro Insertado"})
            }
        })
    }
}

// PUT CONTACTO
materialModel.updateMaterial = function(MaterialData, callback){
    if (connection){
        var sql="UPDATE tb_material SET "
            + " id_material = " + connection.escape(MaterialData.id_material)
            + ", tipo_material = " + connection.escape(MaterialData.tipo_material)
            + ", caracteristica_material = " + connection.escape(MaterialData.caracteristica_material)
            + ", cantidad_material = " + connection.escape(MaterialData.cantidad_material)
            + " WHERE  id_material  =  " + connection.escape(MaterialData.id_material) + ";";

        connection.query(sql, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg":"Registro actualizado"})
            }
        })
    }
}

module.exports = materialModel