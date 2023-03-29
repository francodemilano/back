import managerUsuarios from "./Manager/ManagerUsuarios";
const Manager = new ManagerUsuarios();

const env = async () =>{

    let users = {
        nombre: "juan Pablo",
        apellido: "Perez",
        edad : "42",
        curso: "Backend"
    }

    let result = await manager.crearUsuario(user);
    console.log(result);

    let usuarios = await manager.consultarUsuarios()

    console.log(usuarios);

}

env()