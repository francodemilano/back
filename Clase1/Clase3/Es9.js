const persona1 = {
    nombre: 'Juan',
    email: 'juan@gmail.com',
    edad: 42,
}
//spread para destructurar
let {nombre, email } = persona1;
console.log(persona1.nombre);
console.log(nombre);

let persona2 = {...persona1};
persona2.email = 'Pedro@gmail,com'
console.log(persona1);
console.log(persona2);
