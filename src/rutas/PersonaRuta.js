let express = require('express');
let router = express.Router();

let personaModel = require('../modelos/personaModel');


module.exports = function(){

    router.get('/', function(req, res){
        personaModel.getPersonas(function(error, data){
            res.status(200).json(data)
        })
    })

    //CRUL Read(Leer)
    router.get('/:id', function(req, res){
        const id = req.params.id;
        //si es un numero
        if (!isNaN(id)){
            personaModel.getPersona(id, function(error, data){
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
        const PersonaData={
            id_persona: null,
            nombre_1: req.body.nombre_1,
            nombre_2: req.body.nombre_2,
            apellido_1: req.body.apellido_1,
            apellido_2: req.body.apellido_2,
            id_tipo_doc: req.body.id_tipo_doc,
            nu_documento: req.body.nu_documento,
            sexo: req.body.sexo,
            fecha_nacimiento: req.body.fecha_nacimiento,
            cargo_persona: req.body.cargo_persona,
            id_eps_persona: req.body.id_eps_persona,
            id_arl_persona: req.body.id_arl_persona,
            id_pension_persona: req.body.id_pension_persona,
        }

        personaModel.insertPersona(PersonaData, function(error, data){
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).send({error: "No se creo"})
            }
        })

    })

    //

    router.put("/", function(req, res){
        const PersonaData={
            id_persona: req.body.id_persona,
            nombre_1: req.body.nombre_1,
            nombre_2: req.body.nombre_2,
            apellido_1: req.body.apellido_1,
            apellido_2: req.body.apellido_2,
            id_tipo_doc: req.body.id_tipo_doc,
            nu_documento: req.body.nu_documento,
            sexo: req.body.sexo,
            fecha_nacimiento: req.body.fecha_nacimiento,
            cargo_persona: req.body.cargo_persona,
            id_eps_persona: req.body.id_eps_persona,
            id_arl_persona: req.body.id_arl_persona,
            id_pension_persona: req.body.id_pension_persona,
        }

        personaModel.updatePersona(PersonaData, function(error, data){
            if(data && data.msg){
                res.status(200).json(data)
            }else{
                res.status(500).send({error: "No se actualizo"})
            }
        })
    })

    return router
}