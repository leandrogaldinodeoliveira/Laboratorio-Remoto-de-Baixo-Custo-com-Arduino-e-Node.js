'use strict';

module.exports = {
        servidor: {
        porta: 3389,
        host: '0.0.0.0'
    },

    serial: {
        porta: 'COM3',
        baudRate: 9600,
        delimitador: '\r\n'
    },

    youtube: {
        /* Adicione a url da transmissão
         * Exemplo:
         *
         * https://www.youtube.com/watch?v=AbCdEf12345
         *
         */
        url: 'https://www.youtube.com'
    },

    experimento: {
        aquecimentoSegundos: 5,
        estabilizacaoSegundos: 5,
        duracaoSegundos: 600
    }
};