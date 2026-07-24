'use strict';

const path = require('node:path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const configuracao = require('./config');
const {criarComunicacaoSerial} = require('./modules/serial');
const {criarLaboratorio} = require('./modules/laboratorio');
const {criarEnderecoYoutube} = require('./modules/youtube');

// ======================================================
// SERVIDOR
// ======================================================

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

// ======================================================
// EJS
// ======================================================

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

// ======================================================
// MÓDULOS
// ======================================================

const serial =
    criarComunicacaoSerial(configuracao.serial);

const laboratorio = criarLaboratorio({
        io,
        serial
    });

// ======================================================
// CHART.JS
// ======================================================

/*
 * Disponibiliza para o navegador o Chart.js
 * instalado na pasta node_modules.
 */
app.get(
    '/chart.js',
    function (req, res) {
        const caminhoChart =
            path.join(
                __dirname,
                'node_modules',
                'chart.js',
                'dist',
                'chart.umd.js'
            );

        res.sendFile(caminhoChart);
    }
);

// ======================================================
// ROTA PRINCIPAL
// ======================================================

app.get(
    '/',
    function (req, res) {
        const youtubeEmbedUrl =
            criarEnderecoYoutube(
                configuracao.youtube.url
            );

        res.render(
            'index',
            {
                youtubeEmbedUrl,
                experimento:
                    configuracao.experimento
            }
        );
    }
);

// ======================================================
// INICIALIZAÇÃO
// ======================================================

server.listen(
    configuracao.servidor.porta,
    configuracao.servidor.host,
    function () {
        console.log(
            'Laboratório Remoto iniciado.'
        );

        console.log(
            `Acesso local: http://localhost:` +
            `${configuracao.servidor.porta}`
        );
    }
);

// ======================================================
// ENCERRAMENTO
// ======================================================

let aplicacaoEncerrando = false;

async function encerrarAplicacao() {
    if (aplicacaoEncerrando) {
        return;
    }

    aplicacaoEncerrando = true;

    console.log(
        '\nEncerrando o Laboratório Remoto...'
    );

    await laboratorio.encerrar();
    await serial.fechar();

    server.close(function () {
        console.log(
            'Servidor encerrado.'
        );

        process.exit(0);
    });

    setTimeout(function () {
        process.exit(1);
    }, 3000).unref();
}

process.on(
    'SIGINT',
    encerrarAplicacao
);

process.on(
    'SIGTERM',
    encerrarAplicacao
);