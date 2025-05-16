require('dotenv').config() //para confirgurar las variables de entorno
const { leerInput, inquirerMenu, confirmacion } = require("./Helpers/Inquirer");
const Busquedas = require("./Models/Busquedas");

console.log(process.env)
const Main = async() => {

    let opt;
    const busquedas = new Busquedas(); 
    do{

        opt = await inquirerMenu('Seleccione un opción');

        switch(opt){
            
            case 1: 
                const lugar = await leerInput('Ingrese la ciudad que desea buscar: ');
                await busquedas.ciudad(lugar);

                // console.log(`Información de la ciudad ${lugar.green}`);
                // console.log('Ciudad: '.green);
                // console.log('lat: '.green);
                // console.log('Lng: '.green);
                // console.log('tempreratura actual: '.green);
                // console.log('Max: '.green);
                // console.log('Min: '.green);
                await confirmacion();
                break;

            case 2:
                await confirmacion();
                break;

            case 3:
                //await confirmacion();
                break;
        }


    }while(opt != 3);
};

//Main();