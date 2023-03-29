import ManagerUsuarios from "./manager/managerUsuarios";
const Manager = new ManagerUsuarios();

const env = async () =>{

    let users = {
        nombre: "juan Pablo",
        apellido: "Perez",
        edad : "42",
        curso: "Backend"
    }

    let result = await Manager.crearUsuario(users);
    console.log(result);

    let usuarios = await Manager.consultarUsuarios()

    console.log(usuarios);

}

env()