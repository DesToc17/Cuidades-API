const axios = require('axios');

class Busquedas {
    historial = [];

    constructor (){

    };

    async ciudad (lugar){

        try{
            // const resp = await axios.get('https://reqres.in/api/users?page=2');
        const ruta = `https://api.mapbox.com/search/geocode/v6/forward?q=${lugar}&access_token=${process.env.MAPBOX_KEY}`
            const resp = await axios.get(ruta);
            console.log(resp.data.features);

            return []; // retorna los lugares;
        }catch{
           console.log('Error con el endpoint');
        }
    };

};

module.exports = Busquedas;