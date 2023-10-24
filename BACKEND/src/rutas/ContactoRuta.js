let express = require('express');
let router = express.Router();

let contactoModel = require('../modelos/ContactoModel');


module.exports = function(){

    router.get('/', function(req, res){
        contactoModel.getContactos(function(error, data){
            res.status(200).json(data)
        })
    })

    //CRUL Read(Leer)
    router.get('/:id', function(req, res){
        const id = req.params.id;
        //si es un numero
        if (!isNaN(id)){
            contactoModel.getContacto(id, function(error, data){
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
        const ContactoData={
            id_contacto: null,
            id_persona: req.body.id_persona,
            contacto: req.body.contacto,
        }

        contactoModel.insertContacto(ContactoData, function(error, data){
            if(data){
                res.status(200).json(data)
            }else{
                res.status(500).send({error: "No se creo"})
            }
        })

    })

    //

    router.put("/", function(req, res){
        const ContactoData={
            id_contacto: req.body.id_contacto,
            id_persona: req.body.id_persona,
            contacto: req.body.contacto,
        }

        contactoModel.updateContacto(ContactoData, function(error, data){
            if(data && data.msg){
                res.status(200).json(data)
            }else{
                res.status(500).send({error: "No se actualizo"})
            }
        })
    })

    return router
}