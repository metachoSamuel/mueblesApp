let express = require('express');
let router = express.Router();

let proyectoModel = require('../modelos/ProyectoModel');


module.exports = function(){

    router.get('/', function(req, res){
        proyectoModel.getProyectos(function(error, data){
            res.status(200).json(data)
        })
    })

    //CRUL Read(Leer)
    router.get('/:id', function(req, res){
        const id = req.params.id;
        //si es un numero
        if (!isNaN(id)){
            proyectoModel.getProyecto(id, function(error, data){
                if (typeof data !==  'undefined' && data.length > 0){
                    res.status(200).json(data)
                }else{
                    res.json(404, {
                        "msg":"Registro no existe"
                    })
                }
            })
        }else {
            res.status(500).json({"msg":"No es un numero"})
        }
    })

    //CRUL Create(Crear)
    router.post('/', function(req, res){
        //Objeto JSON con los datos del nuevo registro
        const proyectoData={
            id_proyecto: null,
            id_tipo_material: req.body.id_tipo_material,
            id_produccion: req.body.id_produccion,
            descrip_proyecto: req.body.descrip_proyecto,
        }

        proyectoModel.insertProyecto(proyectoData, function(error, data){
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).send({error: "No se creo"})
            }
        })

    })

    //

    router.put("/", function(req, res){
        const proyectoData={
            id_proyecto: req.body.id_proyecto,
            id_tipo_material: req.body.id_tipo_material,
            id_produccion: req.body.id_produccion,
            descrip_proyecto: req.body.descrip_proyecto,
        }

        proyectoModel.updateProyecto(proyectoData, function(error, data){
            if(data && data.msg){
                res.status(200).json(data)
            }else{
                res.status(500).send({error: "No se actualizo"})
            }
        })
    })

    return router
}