'use strict';

const { SerialPort } = require('serialport');

const { ReadlineParser } = require('@serialport/parser-readline');

/**
 * Cria a comunicação serial com o Arduino.
 */
function criarComunicacaoSerial(configuracao) {
    const porta = new SerialPort({
        path: configuracao.porta,
        baudRate: configuracao.baudRate
    });

    const parser = porta.pipe(
        new ReadlineParser({
            delimiter: configuracao.delimitador
        })
    );

    porta.on('open', function () {
        console.log(
            `Porta serial ${configuracao.porta} aberta em ` +
            `${configuracao.baudRate} baud.`
        );
    });

    porta.on('error', function (erro) {
        console.error(
            'Erro na porta serial:',
            erro.message
        );
    });

    /**
     * Envia um comando ao Arduino.
     *
     * T = ligar
     * F = desligar
     */
    function enviar(comando) {
        return new Promise(function (resolve, reject) {
            if (!porta.isOpen) {
                reject(
                    new Error(
                        'A porta serial não está aberta.'
                    )
                );

                return;
            }

            porta.write(
                String(comando),
                function (erro) {
                    if (erro) {
                        reject(erro);
                        return;
                    }

                    porta.drain(
                        function (erroDrain) {
                            if (erroDrain) {
                                reject(erroDrain);
                                return;
                            }

                            resolve();
                        }
                    );
                }
            );
        });
    }

    /**
     * Define o que será feito quando o Arduino
     * enviar uma linha de dados.
     */
    function aoReceberDados(callback) {
        parser.on('data', function (dados) {
            const linha =
                dados.toString().trim();

            if (!linha) {
                return;
            }

            const valores = linha
                .split(',')
                .map(function (valor) {
                    return valor.trim();
                });

            callback(valores);
        });
    }

    /**
     * Fecha a porta serial.
     */
    function fechar() {
        return new Promise(function (resolve) {
            if (!porta.isOpen) {
                resolve();
                return;
            }

            porta.close(function (erro) {
                if (erro) {
                    console.error(
                        'Erro ao fechar a porta serial:',
                        erro.message
                    );
                }

                resolve();
            });
        });
    }

    return {
        enviar,
        aoReceberDados,
        fechar
    };
}

module.exports = {
    criarComunicacaoSerial
};