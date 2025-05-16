const { default: inquirer } = require("inquirer");
const { validate } = require("uuid");
require("colors");

require("inquirer");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "Seleccione una opción",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Buscar ciudad`,
      },
      {
        value: 2,
        name: `${"2.".green} Historial`,
      },
      {
        value: 3,
        name: `${"3.".green} Salir`,
      }
    ],
  },
];

const inquirerMenu = async () => {
  //console.clear();
  console.log(" -----------------------".green);
  console.log(`${"|".green} Seleccione una opción ${"|".green}`);
  console.log(" -----------------------\n".green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const confirmacion = async () => {
  const enter = [
    {
      type: "input",
      name: "confirmacion",
      message: `Presione ${"ENTER".green} para continuar`,
    },
  ];

  const { confirmacion } = await inquirer.prompt(enter);
  return confirmacion;
};

const leerInput = async (message) => {
  const descripcion = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length == 0) {
          return "Debes ingresar algun dato para la descrición";
        } else {
          return true;
        }
      },
    },
  ];

  const { desc } = await inquirer.prompt(descripcion);
  return desc;
};

const borrar = async (ciudades = []) => {
  const opciones = ciudades.map((ciudades, i) => {
    let indice = `${i + 1}`.green;
    return {
      value: ciudades.id,
      name: `${indice}. ${ciudades.Ubicacion}`,
    };
  });

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices: opciones,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);

  return id;
};

const confirmacionMensaje = async(mensaje) => {
    const conf = [
        {
            type:   'confirm',
            name:   'resp',
            message: mensaje
        }
    ];

    const { resp } = await inquirer.prompt(conf);
    return resp; 
};

const actualizarEstado = async (tareas = []) => {
    if (tareas.length != 0){
        const opciones = tareas.map((tarea, i) => {
            let indice = `${i + 1}`.green;
            return {
              value: tarea.id,
              name: `${indice}. ${tarea.desc}`,
            };
          });
        
          const preguntas = [
            {
              type: "list",
              name: "id",
              message: "Actualizar",
              choices: opciones,
            },
          ];
        
          const { id } = await inquirer.prompt(preguntas);
        
          return id;
    } else {
        return null;
    }
  };

  const listadoActualizar = async (ciudad = []) => {
    const opciones = ciudad.map((ciudad, i) => {
      let indice = `${i + 1}`.green;
      return {
        value: ciudad.Id,
        name: `${indice}. ${ciudad.Ubicacion}`,
      }; 
    });
  
    const pregunta = [
      {
        type: "list",
        name: "ids",
        message: "Seleccione una opción",
        choices: opciones,
      },
    ];
    
    const { ids } = await inquirer.prompt(pregunta);
    
    return ids;
  };

module.exports = {
  inquirerMenu,
  confirmacion,
  leerInput,
  borrar,
  confirmacionMensaje,
  actualizarEstado,
  listadoActualizar
};
