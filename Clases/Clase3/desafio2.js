class TicketManager{

    constructor(){
        this.eventos = []
    }
    static precioBaseGanancia = 0;

    getEventos(){
        return this.eventos;
    }

    agregarEvento (nombre, lugar, precio){
        let id_evento = (this.getEventos()).length;

        let evento = {
            nombre: nombre, 
            lugar: lugar,
            precio: precio * TicketManager.precioBaseGanancia,
            capacidad: 50,
            fecha: Date(),
            participantes: [],
            id: ++id_evento
        }

        this.eventos.push(evento);
        return this.eventos;
    }

    traerEvento(id_evento){
        let evento = this.eventos.find(evento => evento.id === id_evento)

        if (evento){
            return evento;
        }else{
            return null
        }

    }
    estaRegistrado(id_evento, id_usuario){
        let evento = this.traerEvento(id_evento);
        if(evento == null){
            return 'El evento no existe';
        }
        let registro = evento.participantes.find(idParticpiante => idParticpiante === id_usuario)
        if(registro == null){
            return true
        }else {
            return false
        }
    }


    agregarUsuario (id_evento, id_usuario){
        let evento = this.traerEvento (id_evento);
        if (evento == null){
            return 'El evento no existe';
        }
        if (this.estaRegistrado(id_evento, id_usuario)){
            evento.participantes.push(id_usuario)
            return evento;
        }else {
            return 'La persona esta registrada'
        }

    }

    ponerEventoEnGira(id_evento, nLocalidad, nFecha){
        let evento = this.traerEvento(id_evento);
        let contEventos = (this.getEventos()).length;

        if (!evento){
            return 'El Evento no existe';
        }
        let nuevoEvento = {...evento};
        nuevoEvento.lugar = nLocalidad;
        nuevoEvento.fecha = nFecha;
        nuevoEvento.id = ++contEventos;
        nuevoEvento.participantes = []

        this.eventos.push(nuevoEvento)
        return this.eventos
    }
}
const tickeyManager = new TicketManager();
tickeyManager.agregarEvento('Rock in Rio', 'Brasil', 1500)
let eventos = tickeyManager.agregarEvento('Baradero Rock', 'Baradero', 1500)
console.log(eventos);

console.log(tickeyManager.agregarUsuario(1,1));
//console.log(tickeyManager.agregarUsuario(1,3));
console.log(tickeyManager.agregarUsuario(1,1));

