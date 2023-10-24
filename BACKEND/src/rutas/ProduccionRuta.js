let express = require('express');
let router = express.Router();

let produccionModel = require('../modelos/ProduccionModel');


module.exports = function(){

    router.get('/', function(req, res){
        produccionModel.getProducciones(function(error, data){
            res.status(200).json(data)
        })
    })

    //CRUL Read(Leer)
    router.get('/:id', function(req, res){
        const id = req.params.id;
        //si es un numero
        if (!isNaN(id)){
            produccionModel.getProduccion(id, function(error, data){
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
        const produccionData={
            id_produccion: null,
            fecha_produccion: req.body.fecha_produccion,
            horas_trabajo: req.body.horas_trabajo,
            costos_produccion: req.body.costos_produccion,
            descrip_produccion: req.body.descrip_produccion,
            cantidad_produccion: req.body.cantidad_produccion,
        }

        produccionModel.insertProduccion(produccionData, function(error, data){
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).send({error: "No se creo"})
            }
        })

    })

    //

    router.put("/", function(req, res){
        const produccionData={
            id_produccion: req.body.id_produccion,
            fecha_produccion: req.body.fecha_produccion,
            horas_trabajo: req.body.horas_trabajo,
            costos_produccion: req.body.costos_produccion,
            descrip_produccion: req.body.descrip_produccion,
            cantidad_produccion: req.body.cantidad_produccion,
        }

        produccionModel.updateProduccion(produccionData, function(error, data){
            if(data && data.msg){
                res.status(200).json(data)
            }else{
                res.status(500).send({error: "No se actualizo"})
            }
        })
    })

    return router
}