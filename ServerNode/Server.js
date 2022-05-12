
const app = require('express')();
var cors = require('cors');
const { SocketAddress } = require('net');

const httpServer = require('http').createServer(app);
app.use(cors())

const io = require('socket.io')(httpServer, {
cors: {origin : '*'}
});

const port = process.env.PORT || 3002;
var nomi = []
var addr = []


io.on('connection', (socket) => {
    console.log('ciao')
    socket.on('aggiungi', (arg) => {
        console.log('Aggiunta '+arg)
        ad = socket.request.connection.remoteAddress
        console.log('address: '+ad)
        addr.push(ad)
        nomi.push(arg)
        io.emit('aggiorna', nomi)
        console.log(nomi)
        console.log(addr)
    })

    

    socket.on('disconnect', (arg) => {
        console.log('a user disconnected! --> ' + arg);
        io.emit('discon', 'https://i.redd.it/g4rzf4xvcn871.jpg')
        ad = socket.request.connection.remoteAddress

    
        for (let i = 0 ; i < addr.length ; i++) {
            if (addr[i] == ad) {
                console.log('eccoloooooooo ' + addr[i] + ' ' + ad)
                nomi[i] = '----'
                addr[i] = '----'
                i = addr.length
                break
            }
        }

        a = addr
        addr = []
        n = nomi
        nomi = []

        for (let i = 0 ; i < a.length ; i++) {
            if(a[i] != '----'){
                addr.push(a[i])
                nomi.push(n[i])
            }
        }

        io.emit('aggiorna', nomi)



    });
});
httpServer.listen(port, () => console.log('listening on port ' + port));