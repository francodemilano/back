import UserManager from './Managers/UserManager.js';

const userManager = new UserManager ();

const env = async () =>{
    let users = await userManager.getUsuarios ();
    console.log(users); //[]

    let user ={
        nombre: 'Juan',
        apellido: 'Bidabehere',
        usuario: 'bidabehere',
        contrasena: 'contraseña'
    }
    await userManager.crearUsuario(user)
    users = await userManager.getUsuarios ();

    console.log(users);


    await userManager.validarUsuario ('bidabehere', '123456')
    await userManager.validarUsuario('bidabehere','contraseña')
}

env ()
