
let connection = require('../conexion/index')

let personaModel = {}

/**
 * CRUL de datos para la tabla personas
 *
 */

// GET PERSONAS
personaModel.getPersonas = function (callback) {
    if (connection) {
        var sql = "SELECT\n" +
            "    p.id_persona,\n" +
            "    p.nombre_1,\n" +
            "    p.nombre_2,\n" +
            "    p.apellido_1,\n" +
            "    p.apellido_2,\n" +
            "    p.id_tipo_doc,\n" +
            "    p.nu_documento,\n" +
            "    p.sexo,\n" +
            "    p.fecha_nacimiento,\n" +
            "    p.cargo_persona,\n" +
            "    e.nombre_eps AS eps_nombre,\n" +
            "    a.nombre_arl AS arl_nombre,\n" +
            "    td.documento AS tipo_documento,\n" +
            "    ps.nombre_pension AS pension_nombre\n" +
            "FROM\n" +
            "    tb_persona p\n" +
            "    INNER JOIN ct_eps e ON p.id_eps_persona = e.id_eps\n" +
            "    INNER JOIN ct_arl a ON p.id_arl_persona = a.id_arl\n" +
            "    INNER JOIN ct_tipo_documento td ON p.id_tipo_doc = td.id_tipo_doc\n" +
            "    INNER JOIN ct_pension ps ON p.id_pension_persona = ps.id_pension;"

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
        const sql = "SELECT\n" +
            "    p.id_persona,\n" +
            "    p.nombre_1,\n" +
            "    p.nombre_2,\n" +
            "    p.apellido_1,\n" +
            "    p.apellido_2,\n" +
            "    p.id_tipo_doc,\n" +
            "    p.nu_documento,\n" +
            "    p.sexo,\n" +
            "    p.fecha_nacimiento,\n" +
            "    p.cargo_persona,\n" +
            "    e.nombre_eps AS eps_nombre,\n" +
            "    a.nombre_arl AS arl_nombre,\n" +
            "    td.documento AS tipo_documento,\n" +
            "    ps.nombre_pension AS pension_nombre\n" +
            "FROM\n" +
            "    tb_persona p\n" +
            "    INNER JOIN ct_eps e ON p.id_eps_persona = e.id_eps\n" +
            "    INNER JOIN ct_arl a ON p.id_arl_persona = a.id_arl\n" +
            "    INNER JOIN ct_tipo_documento td ON p.id_tipo_doc = td.id_tipo_doc\n" +
            "    INNER JOIN ct_pension ps ON p.id_pension_persona = ps.id_pension" +
            "    WHERE id_persona="+connection.escape(id)+";";
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