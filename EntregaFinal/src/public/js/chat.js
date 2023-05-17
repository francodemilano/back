const socket = io();
    let user;
const chatbox = document.getElementById('chatbox');
chatbox.addEventListener('keyup', evt =>{
    if(evt.key === "Enter"){
        if(chatbox.value.trim().length>0){
            socket.emit('message', {user:user, message:chatbox.value.trim()})
            chatbox.value = "";
        }
    }
});

Swal.fire({
    title: "Su Email por favor",
    input: "text",
    inputValidator: (value) => {
      return !value && "Es necesario un Email para ingresar"
    },
    toast: true
  }).then(result => {
    user = result.value;
    let usuario = {
      user: user,
    }
    socket.emit('authenticated', usuario);
  });


  chatbox.addEventListener('keyup', evt => {
    if (evt.key === "Enter") {
      if (chatbox.value.trim().length > 0) {
        socket.emit('message', { user: user, message: chatbox.value.trim() })
        chatbox.value = "";
      }
    }
  });

  socket.on('messageLogs', data => {
        if (!user) return;
    let log = document.getElementById('messageLogs');
    let messages = "";
    if (Array.isArray(data)) {
      data.forEach(message => {
        messages += `${message.user} : ${message.message} <br/>  `
      });
    }
    log.innerHTML = messages;
  });


  socket.on('newUserConnected', data => {
    if (!user) return;
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      title: `${data.user} ingreso a la sala`,
      icon: "success"
    });
  });