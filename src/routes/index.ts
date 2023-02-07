import express from 'express';
const router  = express.Router();

import usuariosRouter from './usuarios/usuarios';
//import empresasRouter from './empresas/empresas';
// REST API
// Internet -> HTTP -> REST API -> DB
// SOAP XML wsdl
// {} -> JSON
// [] -> JSON
// { llave : valor }
// valor: texto, númerico, booleano, array [valores], objeto {llave:valor}

// REST stateless, resource unique representation
//CRUD Create, Read, Update, Delete
//      POST, GET, PUT, DELETE
router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

 router.get('/version', (_req , res)=>{   'req is declared but its value is never read.'
  const version: String = "1.0.0";   'version is declared but its value is never read.'
  const jsonResp = {"name":"FODA Be", "version":version}; 
  
  // string, number, boolean, types, interfaces, classes, enumerators
  res.json(jsonResp);
});

router.use('/usuarios', usuariosRouter);
//router.use('/empresas', empresasRouter);

//router.get router.post router.put router.delete router.use


export default router;
