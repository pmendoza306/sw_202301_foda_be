import express from 'express';
const router = express.Router();

import { Usuarios, IUsuario } from '@server/libs/Usuarios/Usuarios';

const usuariosModel = new Usuarios();

usuariosModel.add({
    codigo: '',
    correo: 'paola123@gmail.com',
    nombre: 'Paola',
    password: 'Paola123',
    roles: 'Admi'
   
});
//registrar los endpoint en router
//http://localhost:3001/empresas
router.get('/', (_req, res)=>{
    const jsonUrls = {
        "getAll": {"method":"get","url": "usuarios/all"},
        "getById": {"method":"get","url": "usuarios/byid/:id"},
        "new": {"method":"post","url": "usuarios/new"},
        "update": {"method":"put","url": "usuarios/upd/:id"},
        "delete": {"method":"delete","url": "usuarios/del/:id"},
    };
    res.status(200).json(jsonUrls);
});

router.get('/all', (_req, res) => {
    res.status(200).json(usuariosModel.getAll());
});

router.get('/byid/:id', (req, res)=>{
    const {id: codigo} = req.params;
    const usuario = usuariosModel.getById(codigo);
    if(usuario){
        return res.status(200).json(usuario);
    }
    return res.status(404).json({"error":"No se encontro Usario"});
});

router.post('/new', (req, res) => {
    console.log("Usuarios /new request body:", req.body)
    const {
        correo= "paola123@gmail.com",
        nombre= "Paola",
        password= "Paola123",
        roles= "Admi"
    } = req.body;
    //TODO: Validar entrada de datos
    const newUsuarios: IUsuario = {
        codigo : "",
        correo,
        nombre,
        password,
        roles
        
    };
    if (usuariosModel.add(newUsuarios)){
        return res.status(200).json({"created": true});
    }
    return res.status(404).json(
        {"error": "Error al agregar un nuevo usuario"}
    );
});

router.put('/upd/:id', (req, res) => {
    const { id } = req.params;
    const { 
        correo= "paola123@gmail.com",
        nombre= "Paola",
        password= "Paola123",
        roles= "Admi"
       
    } = req.body;

    const updateUsario : IUsuario = {
        codigo: id,
        correo,
        nombre,
        password,
        roles,
        
    };

    if (usuariosModel.update(updateUsario)) {
        return res
        .status(200)
        .json({"updated": true}); 
    }
    return res
    .status(404)
    .json(
        {
            "error": "Error al actualizar Usuarios"
        }
    );
});

router.delete('/del/:id', (req, res)=>{
    const {id : codigo} = req.params;
    if(usuariosModel.delete(codigo)){
        return res.status(200).json({"deleted": true});
    }
    return res.status(404).json({"error":"No se pudo eliminar Uusuario"})
});
/*
router.get('/', (_req, res)=>{

});
*/

export default router;