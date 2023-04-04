import http from 'http';

const PORT = '8081';

const server = http.createServer ((request, response)=>{
    response.end('NAAAAAACHOOOOOOOO ATATA MAAAT')
})

server.listen(PORT, ()=>{
    console.log(`Servidor en el puerto ${PORT}`);
})

