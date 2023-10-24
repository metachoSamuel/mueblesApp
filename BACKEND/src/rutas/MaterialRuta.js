let express = require('express');
let router = express.Router();

let materialModel = require('../modelos/MaterialModel');


module.exports = function(){

    router.get('/', function(req, res){
        materialModel.getMateriales(function(error, data){
            res.status(200).json(data)
        })
    })

    //CRUL Read(Leer)
    router.get('/:id', function(req, res){
        const id = req.params.id;
        //si es un numero
        if (!isNaN(id)){
            materialModel.getMaterial(id, function(error, data){
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
        const materialData={
            id_material: null,
            tipo_material: req.body.tipo_material,
            caracteristica_material: req.body.caracteristica_material,
            cantidad_material: req.body.cantidad_material,
        }

        materialModel.insertMaterial(materialData, function(error, data){
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).send({error: "No se creo"})
            }
        })

    })

    //

    router.put("/", function(req, res){
        const materialData={
            id_material: req.body.id_material,
            tipo_material: req.body.tipo_material,
            caracteristica_material: req.body.caracteristica_material,
            cantidad_material: req.body.cantidad_material,
        }

        materialModel.updateMaterial(materialData, function(error, data){
            if(data && data.msg){
                res.status(200).json(data)
            }else{
                res.status(500).send({error: "No se actualizo"})
            }
        })
    })

    return router
}