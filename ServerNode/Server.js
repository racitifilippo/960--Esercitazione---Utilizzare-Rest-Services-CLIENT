
const app = require('express')();
var cors = require('cors');
const { SocketAddress } = require('net');

const httpServer = require('http').createServer(app);
app.use(cors())

const io = require('socket.io')(httpServer, {
cors: {origin : '*'}
});

const port = process.env.PORT || 3002;
var nomi = ['ciao']
var addr = ['::ffff:192.168.199.117']


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
                nomi.pop(i)
                addr.pop(i)
            }
        }
    });
});
httpServer.listen(port, () => console.log('listening on port ' + port));