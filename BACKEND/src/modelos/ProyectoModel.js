
let connection = require('../conexion/index')

let proyectoModel = {}

/**
 * CRUL de datos para la tabla Proyecto
 *
 */

// GET PROYECTOS
proyectoModel.getProyectos = function (callback) {
    if (connection) {
        var sql = "SELECT\n" +
            "    pr.id_proyecto,\n" +
            "    pr.id_tipo_material,\n" +
            "    pr.id_produccion,\n" +
            "    pr.descrip_proyecto,\n" +
            "    m.id_material,\n" +
            "    m.tipo_material,\n" +
            "    m.caracteristica_material,\n" +
            "    m.cantidad_material,\n" +
            "    pd.fecha_produccion,\n" +
            "    pd.horas_trabajo,\n" +
            "    pd.costos_produccion,\n" +
            "    pd.descrip_produccion,\n" +
            "    pd.cantidad_produccion,\n" +
            "    tm.id_tipo_material AS id_tipo_material_ct,\n" +
            "    tm.tipo_material AS tipo_material_ct\n" +
            "FROM\n" +
            "    tb_proyecto pr\n" +
            "    INNER JOIN tb_material m ON pr.id_tipo_material = m.id_material\n" +
            "    INNER JOIN tb_produccion pd ON pr.id_produccion = pd.id_produccion\n" +
            "    INNER JOIN ct_tipo_material tm ON m.tipo_material = tm.id_tipo_material;"

        connection.query(sql, function (error, row) {
            if (error) {
                throw error
            } else {
                callback(null, row)
            }
        })
    }
}

// GET PROYECTO
proyectoModel.getProyecto = function (id, callback){
    if(connection){
        const sql = "SELECT\n" +
            "    pr.id_proyecto,\n" +
            "    pr.id_tipo_material,\n" +
            "    pr.id_produccion,\n" +
            "    pr.descrip_proyecto,\n" +
            "    m.id_material,\n" +
            "    m.tipo_material,\n" +
            "    m.caracteristica_material,\n" +
            "    m.cantidad_material,\n" +
            "    pd.fecha_produccion,\n" +
            "    pd.horas_trabajo,\n" +
            "    pd.costos_produccion,\n" +
            "    pd.descrip_produccion,\n" +
            "    pd.cantidad_produccion,\n" +
            "    tm.id_tipo_material AS id_tipo_material_ct,\n" +
            "    tm.tipo_material AS tipo_material_ct\n" +
            "FROM\n" +
            "    tb_proyecto pr\n" +
            "    INNER JOIN tb_material m ON pr.id_tipo_material = m.id_material\n" +
            "    INNER JOIN tb_produccion pd ON pr.id_produccion = pd.id_produccion\n" +
            "    INNER JOIN ct_tipo_material tm ON m.tipo_material = tm.id_tipo_material" +
            "    WHERE id_proyecto="+connection.escape(id)+";";
        connection.query(sql, function (error, row){
            if(error) {
                throw error
            } else {
                callback(null, row)
            }
        });

    }
}

// POST PROYECTO
proyectoModel.insertProyecto = function(ProyectoData, callback){
    if(connection){
        var sql="INSERT INTO tb_proyecto SET ?"
        connection.query(sql, ProyectoData, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg": "Registro Insertado"})
            }
        })
    }
}

// PUT PROYECTO
proyectoModel.updateProyecto= function(ProyectoData, callback){
    if (connection){
        var sql="UPDATE tb_proyecto SET "
            + " id_proyecto = " + connection.escape(ProyectoData.id_proyecto)
            + ", id_tipo_material = " + connection.escape(ProyectoData.id_tipo_material)
            + ", id_produccion = " + connection.escape(ProyectoData.id_produccion)
            + ", descrip_proyecto = " + connection.escape(ProyectoData.descrip_proyecto)
            + " WHERE  id_proyecto  =  " + connection.escape(ProyectoData.id_proyecto) + ";";

        connection.query(sql, function(error, result){
            if(error){
                throw error
            }else{
                callback(null, {"msg":"Registro actualizado"})
            }
        })
    }
}

module.exports = proyectoModel