//MODO ASINCRONICO
/*let contador = ()=>{

    let counter = 1;
    console.log('Realizar la operacion');

    let timer = setInterval (() => {
      console.log(counter++);
      if(counter > 5){
        clearInterval (timer)
      }
    }, 1000);
    
}

console.log('inicio de tarea');
contador ();
console.log('Fin de tarea'); */


//MODO SINCRONICO
console.log('Inicio de tarea');
console.log('Realizo la tarea');

for (let contador = 0; contador <= 5; contador++) {
    console.log(contador);
}

console.log('Fin de la tarea');


