
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


io.on('connection', (socket) => {
    console.log('ciao')
    socket.on('aggiungi', (arg) => {
        console.log('Aggiunta '+arg)
        nomi.push(arg)
        io.emit('aggiorna', nomi)
        console.log(nomi)
    })

    socket.on('discon', (arg)=>{
        console.log('-------------'+arg)

        for (let i = 0 ; i < nomi.length ; i++) {
            console.log(arg)
            if (nomi[i] == arg) {
                console.log('eccoloooooooo')
                nomi.pop(i)
            }
        }

        io.emit('aggiorna', nomi)
    })

    socket.on('disconnect', (arg) => {
        console.log('a user disconnected! --> ' + arg);
        io.emit('discon', 'https://i.redd.it/g4rzf4xvcn871.jpg')

        for (let i = 0 ; i < nomi.length ; i++) {
            console.log(arg)
            if (nomi[i] == arg) {
                console.log('eccoloooooooo')
                nomi.pop(i)
            }
            
        }
    });
});
httpServer.listen(port, () => console.log('listening on port ' + port));