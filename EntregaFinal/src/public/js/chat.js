const socket = io();

let user;

const send = document.getElementById('send');
const chatbox = document.getElementById('chatbox');
const messageLog = document.getElementById('messageLog');


Swal.fire({
    title: "Tenés que identificarte",
    input: "text",
    inputValidator: (value) => {
        return !value && "Necesita escribir un nombre de usuario para iniciar el chat"; 
    },
    allowOutsideClick: false,
    toast: true
})
.then(result => {

    user = result.value;

    socket.emit('authenticated', user);

});

send.addEventListener('click', () => {
    
    if (chatbox.value.trim().length > 0){
        socket.emit('message', {user: user, message: chatbox.value.trim()});
        chatbox.value = "";
    };

});

chatbox.addEventListener('keyup', (event) => {
    
    if (event.key === "Enter"){
        if (chatbox.value.trim().length > 0){
            socket.emit('message', {user: user, message: chatbox.value.trim()});
            chatbox.value = "";
        };
    };

});

socket.on('messageLog', (messageHistory) => {

    if (!user) return;

    let messages = "";

    messageHistory.forEach(message => {

        messages += `${message.user} dice: ${message.message}<br>`;

    });

    messageLog.innerHTML = messages;

});

socket.on('newUserConnected', (data) => {
    
    if (!user) return;

    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data} se ha unido al chat`,
        icon: 'Success'
    });

});