const { Router } = require('express');
const { Countrys } = require('../../models/Countrys');
const router = Router();


//router.get ("/:id",async(req,res) => {
//    try {
//        //const {id} = req.body
//        //const pais = await Countrys.findByPk(id);
//        res.status(200).sand(pais)
 //   } catch (error) {
 //       res.status(400).send("pais no encontrado")
 //   }
//})

router.post ("/create",async(req,res) => {
    try {
        const { aid,name,capital,sub_region,area,poblacion,img,continente } = req.body;
        const newCountrys = await Countrys.create({aid,name,capital,sub_region,area,poblacion,img,continente});
        return res.status(201).send(newCountrys);
      } catch (error) {

        return res.status(404).send("Error en alguno de los datos provistos111111111111");
      }
})

module.exports = router;

