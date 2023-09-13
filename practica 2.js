// Ejercicio 1: Promesas Encadenadas
// Crea una función que realice las siguientes tareas:

// Inicia una promesa que se resuelva después de 2 segundos con un número aleatorio entre 1 y 100.
// Luego, toma ese número y crea una segunda promesa que se resuelva después de 3 segundos con el resultado de elevar ese número al cuadrado.
// Finalmente, toma el resultado de la segunda promesa y crea una tercera promesa que se resuelva después de 1 segundo con la raíz cuadrada del número resultante.

const numRandom = () => {
  return new Promise((resolve, rej) => {
    setTimeout(() => {
      const num = Math.floor(Math.random() * (100 - 1 + 1) + 1);
      resolve(num);
    }, 2000);
  });
};

const cuadrado = (num) => {
  return new Promise((resolve, rej) => {
    setTimeout(() => {
      const n2 = num * num;
      resolve(n2);
    }, 3000);
  });
};

const raiz = (num) => {
  return new Promise((resolve, rej) => {
    setTimeout(() => {
      const nraiz = Math.sqrt(num);
      resolve(nraiz);
    }, 3000);
  });
};
numRandom()
  .then((num) => {
    console.log("Número aleatorio es:", num);
    return cuadrado(num);
  })
  .then((resultadoCuadrado) => {
    console.log("Número al cuadrado:", resultadoCuadrado);
    return raiz(resultadoCuadrado);
  })
  .then((resraiz) => {
    console.log("Raíz cuadrada:", resraiz);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Ejercicio 2: Promesa de Múltiples Solicitudes
// Crea una función que realice las siguientes tareas:

// Recibe un array de URLs como argumento.
// Utiliza fetch y promesas para realizar una solicitud GET a cada URL en el array.
// Devuelve una promesa que se resuelva con un array de los resultados de todas las solicitudes.

const URL = [
  "https://reqres.in/api/users",
  "https://swapi.dev/api/films/1/",
  "https://reqres.in/api/users?page=2",
];

const multi = (urls) => {
  let responses = [];
  URL.forEach((url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => responses.push(data))
      .catch(console.log);
  });

  return new Promise((res, rej) => {
    setTimeout(() => res(responses), 0);
  });
};

multi(URL).then(console.log).catch(console.log);
// Ejercicio 3: Promesas Paralelas
// Crea una función que realice las siguientes tareas:

// Recibe un array de funciones que devuelven promesas como argumento.
// Ejecuta todas las funciones en paralelo y espera a que todas las promesas se resuelvan.
// Devuelve una promesa que se resuelva con un array de los resultados de todas las promesas.
const item1 = ()=>{return new Promise((resolve,reject)=>resolve("Promesa ejecutada 1"))}
const item2 = ()=>{return new Promise((resolve,reject)=>resolve("Promesa ejecutada 2"))}
const item3 = ()=>{return new Promise((resolve,reject)=>resolve("Promesa ejecutada 3"))}
const arreglo=[item1,item2,item3]
const tercero=arreglo=>{
    return Promise.all(arreglo.map(e=>e()));
}
tercero(arreglo).then(
    values=>console.log(values)
)
// Ejercicio 4: Promesas en Cadena con Retraso
// Crea una función que realice las siguientes tareas:

// Recibe un número n como argumento.
// Utiliza un bucle para crear una cadena de promesas, donde cada promesa se resuelve después de N segundos con el número actual en el bucle.
// Cada promesa debe imprimir el número en la consola antes de resolverse.
// Finalmente, devuelve una promesa que se resuelva después de N segundos con el mensaje "Todas las promesas se resolvieron".
const cuarto = (n) => {
    return new Promise((resolve) => {
      const promises = [];
      
      for (let i = 1; i <= n; i++) {
        promises.push(
          new Promise((innerResolve) => {
            setTimeout(() => {
              console.log(i);
              innerResolve();
            }, i * 1000); // Espera i segundos antes de resolver esta promesa
          })
        );
      }
      
      Promise.all(promises).then(() => {
        setTimeout(() => {
          console.log("Todas las promesas se resolvieron");
          resolve("Todas las promesas se resolvieron");
        }, n * 1000); // Espera n segundos antes de resolver la promesa principal
      });
    });
  };
  
  
  cuarto(5).then((message) => {
    console.log(message);
  });
  

// Ejercicio 5: Promesa con Cancelación
// Crea una función que realice las siguientes tareas:

// Inicia una promesa que se resuelva después de 5 segundos con un mensaje.
// Si se llama a una función cancel antes de que se cumplan los 5 segundos, la promesa debe rechazarse con el mensaje "Promesa cancelada".
let cancelPromiseCalled;

const promesaInicio = ()=>{
    setTimeout(()=>{
        if(cancelPromiseCalled){
            promesaCancelada().then(res=>console.log(res))
        }else{
            new Promise((resolve,reject)=>{
                resolve(console.log(`Resuelta`));
            })
        }
    },5000);


}   

const promesaCancelada = ()=>{
    cancelPromiseCalled = true;
    new Promise((resolve,reject)=>{
        reject(`promesaCancelada`);
    })
}   


promesaInicio();
promesaCancelada();