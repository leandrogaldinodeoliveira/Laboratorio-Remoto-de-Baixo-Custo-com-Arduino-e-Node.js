var http = require('http'); // 1
var express = require('express'); // 2
var app = express(); // 3
var server = http.createServer(app); // 4
var io = require('socket.io')(server); // 5


const { SerialPort } = require('serialport'); // 6
const { ReadlineParser } = require('@serialport/parser-readline'); // 7
const port = new SerialPort({ path: 'COM5', baudRate: 9600 }); // 8
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' })); //9
parser.on('data', console.log); //10

app.engine('ejs', require('ejs').__express); //11
app.set('view engine', 'ejs'); //12

// Variável de controle para verificar se o site está ocupado

let siteOcupado = false; //13

app.get('/', function(req, res) {
if (siteOcupado) {
res.send('Experimento ocupado. Tente novamente mais tarde');
} else {
res.render('index');
}
}); //14

io.on('connection', function(socket) {
console.log('socket.io connection'); //15

// Se o site estiver ocupado, desconectar o usuário
if (siteOcupado) {
        
socket.disconnect(true);
return;
} 
// Definir o site como ocupado
siteOcupado = true; //16

// Código do projeto front para Arduino
socket.on('Ligar', function(ligar) {
        
port.write(ligar);

port.on('open', function() {
console.log('Porta serial aberta');
            
});

port.on('data', function(data) {
if (typeof data !== 'string') {
data = data.toString();
}

data = data.replace(/\r\n/g, '');
dados = data.split(',');
console.log(dados);
socket.emit('data', { valor: dados });
});
}); //17

socket.on('Desligar', function(desligar) {
port.write(desligar);
console.log("dado enviado");
socket.disconnect(true);
        
                         
// Definir o site como não ocupado
siteOcupado = false;
}); //18

socket.on('disconnect', function() {
console.log('Desconectado');

// Definir o site como não ocupado
siteOcupado = false;
});
});

server.listen(3389 , '0.0.0.0' ,  function() {
console.log("servidor rodando");
});


