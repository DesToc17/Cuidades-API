require('dotenv').config() //para confirgurar las variables de entorno
const { leerInput, inquirerMenu, confirmacion, listadoActualizar } = require("./Helpers/Inquirer");
const Busquedas = require("./Models/Busquedas");

//console.log(process.env);

const Main = async() => {

    let opt;
    const busquedas = new Busquedas(); 
    do{

        opt = await inquirerMenu('Seleccione un opción');

        switch(opt){
            
            case 1: 
                const lugar = await leerInput('Ingrese la ciudad que desea buscar: ');
                const resp = await busquedas.ciudad(lugar);
                //console.log(resp);

                const ciudad = await listadoActualizar(resp);
                // console.log(ciudad);

                if (ciudad == 0) continue;

                const lugarSeleccionado = resp.find(l => l.Id == ciudad);

                busquedas.agregarHistorial(lugarSeleccionado);

                const temp = await busquedas.temperatura(lugarSeleccionado.Latitud, lugarSeleccionado.Longitud);
                //console.log(temp);

                console.log(`\nInformación de la ciudad ${lugar.green}:`);
                console.log('Ciudad: '.green, lugarSeleccionado.Ubicacion);
                console.log('lat: '.green, `${lugarSeleccionado.Latitud}`.white);
                console.log('Lng: '.green, `${lugarSeleccionado.Longitud}`.white);
                console.log('Pronostico: '.green, temp.desc);
                console.log('Tempreratura actual: '.green, `${temp.tempActual}`.white);
                console.log('Max: '.green, `${temp.tempMax}`.white);
                console.log('Min: '.green, `${temp.tempMin}`.white);
                await confirmacion();
                break;

            case 2:
                const data = busquedas.leerDB();
                console.log(data.historial);

                // busquedas.historial.forEach((lugar, i) => {
                //     let idx = `${i +1}`.green;
                //     console.log(idx, '. ', lugar.Ubicacion);
                // })
                await confirmacion();
                break;
        };


    }while(opt != 3);
};

Main();