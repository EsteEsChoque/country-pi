const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countrysMiddleware = require('./Middleware/countrysMiddleware');
const actividadesMiddleware = require('./Middleware/actividadesMiddleware');
  
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countrys', countrysMiddleware);
router.use('/actividades', actividadesMiddleware);

module.exports = router;
