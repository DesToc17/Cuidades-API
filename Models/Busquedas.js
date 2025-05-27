const fs = require('fs');
const axios = require('axios');

class Busquedas {
    historial = [];
    local_data = './Data/Historial.json'; 

    constructor (){

    };

    async ciudad (lugar){

        try{
            // const resp = await axios.get('https://reqres.in/api/users?page=2');
            console.log('Consultando...')
            const ruta = `https://api.mapbox.com/search/geocode/v6/forward?q=${lugar}&access_token=${process.env.MAPBOX_KEY}&limit=10`
            const resp = await axios.get(ruta);
            //console.log(resp.data.features);
            //console.log(JSON.stringify(resp.data, null, 2));
            //console.log(Object.keys(lugar));

            return resp.data.features.map( lugar => ({
                Id: lugar.id,
                Ubicacion: lugar.properties.full_address,
                Longitud: lugar.properties.coordinates.longitude,
                Latitud: lugar.properties.coordinates.latitude
            }))

        }catch{
           console.log('Error con el endpoint del lugar');
        }
    };

    async temperatura (lat, long){
        try{

            const ruta = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=7c3f5c37c79536bc7b6841278a725e43&units=metric&lang=es`
            const resp = await axios.get(ruta);
            //console.log(resp.data);
            //console.log(JSON.stringify(resp.data, null, 2));
            //console.log(Object.keys(lugar));
            const {weather, main} = resp.data;
            
            return {
                desc: weather[0].description,
                tempActual: main.temp,
                tempMin: main.temp_min,
                tempMax: main.temp_max
            };
        }catch(error){
            console.log('Error en la API de la temperatura: ',error)
        };
    };

    agregarHistorial(lugar){

        if (!this.historial.includes(lugar.Ubicacion.toString().toLowerCase())){
            //unshift para agregar al inicio
            this.historial.unshift(lugar.Ubicacion.toString().toLowerCase());
        };

        this.guardarDB();
    };

    guardarDB(){
        const payload =  {
            historial: this.historial
        }
        fs.writeFileSync(this.local_data ,JSON.stringify(payload));
    }

    leerDB(){
        if (!fs.existsSync(this.local_data)) {
            return null;
          }
        
          const info = fs.readFileSync(this.local_data, { encoding: "utf-8" });
          const data = JSON.parse(info);
          //console.log(data);
          return data;
    };

    CargarTareasFromArray(tareas = []) {
        tareas.forEach((tarea) => {
          this.historial[tarea.id] = tarea;
        });
      }
};

module.exports = Busquedas;