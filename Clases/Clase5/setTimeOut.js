const temporizador = (funcionCallBack) => {
    setTimeout (() =>{
        funcionCallBack()
    }, 5000);
}

let operacion = () => console.log('Realizar una operacion');


console.log('Inicio la tarea');
temporizador (operacion)
console.log('Fin de la tarea');