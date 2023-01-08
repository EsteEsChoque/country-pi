const axios = require("axios");
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const { Op, Countrys,Actividades, COU_ACT  } = require("./db.js");

require("./db.js");

const server = express();

server.name = "API";
server.use(express.json());

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});
//a modular
// http://localhost:3001/
server.post("/create", async (req, res) => {
  try {
    const data = await axios.get(`https://restcountries.com/v3/all`);
    data.data.map(async (pas) => {
      try {
        if (pas.capital == null) pas.capital = "";
        const cosas = {
          id: pas.cca3,
          name: pas.translations.spa.common,
          capital: pas.capital[0],
          sub_region: pas.subregion,
          area: pas.area,
          poblacion: pas.population,
          img: pas.flags[1],
          maps: pas.maps.googleMaps,
          continente: pas.continents[0],
        };
        const newCountrys = await Countrys.create(cosas);
        res.status(201).send(newCountrys);
      } catch (error) {
        console.log(error, "++++++++++++++++++++++++");
      }
    });
  } catch (error) {
    console.log(error, "-----------------------");
  }
});

server.post("/crearpais", async (req,res) => {
  try {
    const {id,name,capital,sub_region,area,poblacion,img,maps,continente} =req.body;
    const cosas = {
      id:id,
      name: name,
      capital: capital,
      sub_region: sub_region,
      area: area,
      poblacion: poblacion,
      img: img,
      maps: maps,
      continente: continente,
    };
    const newPais = await Countrys.create (cosas)
    res.status(201).send(newPais)
  }
  catch (error){
    console.log(error, "-----------------------");
  }
})

server.get("/all", async (req, res) => {
  const { aid } = req.query;
  try {
    if (!aid) {
      const characters = await Countrys.findAll();
      return res.status(200).send(characters);
    }
    const characters = await Countrys.findAll({ where: aid });
    return res.status(200).send(characters);
  } catch (error) {}
});



server.get("/actividades", async (req, res) => {
  try {
    const activities = await Actividades.findAll();
    res.status(200).send(activities);
  } catch (error) {
    // maneja el error de alguna manera
    console.error(error);
    res.status(500).send(error.message);
  }
});

server.get("/paisact", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const characters = await Actividades.findAll();
      return res.status(200).send(characters);
    }
    const characters = await Actividades.findAll({ where: name });
    return res.status(200).send(characters);
  } catch (error) {}
});



//------------------------------

server.get("/actividades/:id", async (req, res) => {
  try {
    const paisId = req.params.id;
    const activity = await Actividades.findByPk(paisId, {
      attributes: ['name'], // incluye solamente el campo 'name'
      include: [{
        model: Countrys, 
       attributes: ['id']
      }],
    });

    res.status(200).send(activity);
  } catch (error) {

    console.error(error);
    res.status(500).send(error.message);
  }
});



server.get("/paises/:id", async (req, res) => {
  try {
    const actividadId = req.params.id;
    const country = await Countrys.findByPk(actividadId, {
      include: [
        {
          model: Actividades
        }
      ]
    });

   
    res.status(200).send(country);
  } catch (error) {
    // manejamos el error de alguna manera
    console.error(error);
    res.status(500).send(error.message);
  }
});



//-----------------------------

server.get("/activitiesWithCountries", async (req, res) => {
  try {
    const activities = await Actividades.findAll({
      include: [{
        model: Countrys,
        as: "Countrys" // as es el alias que le damos a la relación
      }]
    });
    res.status(200).send(activities);
  } catch (error) {
    // maneja el error de alguna manera
    console.error(error);
    res.status(500).send(error.message);
  }
});

server.delete("/activity/:name", async (req, res) => {
  try {
    const { name } = req.params;
    await Actividades.destroy({
      where: { name }
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


server.get("/:aid", async (req, res) => {
  try {
    const { aid } = req.params;
    const character = await Countrys.findByPk(aid);
    if (!character) throw new Error(`El id ${aid} no corresponde a un pais`);
    return res.status(200).send(character);
  } catch (error) {
    return res.status(404).send(error.message);
  }
});

server.post("/createActivity", async (req, res) => {
  try {
    const { activityData, countryIds } = req.body;
    const newActivity = await Actividades.create(activityData);
    for (let i = 0 ; i<countryIds.length; i++) {
      let country = await Countrys.findByPk(countryIds[i])
      await newActivity.addCountrys(country);
    }
    console.log(newActivity.addCountrys);
    res.status(201).send(newActivity);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
// const newCountrys = await Countrys.create(cosas);
//         res.status(201).send(newCountrys);
//       } catch (error) {
//         console.log(error, "++++++++++++++++++++++++");
//       }
//     });
//   } catch (error) {
//     console.log(error, "-----------------------");
//   }


// server.post("/createActivity", async (req, res) => {
//   try {
//     const { activityData, countryIds } = req.body;
//     const newActivity = await Actividades.create(activityData);
//     const country = await Countrys.findAll({where: {
//       id: {
//        [Op.in ] : countryIds
//       }
//     } }) 
//     console.log(country);
//     await newActivity.addCountrys(country);

//     console.log(newActivity.addCountrys);
//     res.status(201).send(newActivity);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error.message);
//   }
// });




module.exports = server;
