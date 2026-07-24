'use strict';

/**
 * Controla a sessão do usuário e a comunicação
 * entre a interface e o Arduino.
 */
function criarLaboratorio({
    io,
    serial
}) {
    let ocupado = false;
    let socketAtivo = null;

    /**
     * Envia ao navegador os dados recebidos
     * pela porta serial.
     */
    serial.aoReceberDados(function (valores) {
        console.log(
            'Dados recebidos do Arduino:',
            valores
        );

        if (
            socketAtivo &&
            socketAtivo.connected
        ) {
            socketAtivo.emit('data', {
                valor: valores
            });
        }
    });

    /**
     * Libera o laboratório para outro usuário.
     */
    function liberarLaboratorio() {
        ocupado = false;
        socketAtivo = null;

        console.log(
            'Laboratório liberado para o próximo usuário.'
        );
    }

    /**
     * Envia o comando de desligamento.
     */
    async function desligarArduino() {
        try {
            await serial.enviar('F');

            console.log(
                'Comando de desligamento enviado ao Arduino.'
            );
        } catch (erro) {
            console.error(
                'Erro ao desligar o Arduino:',
                erro.message
            );
        }
    }

    /**
     * Configura as conexões Socket.IO.
     */
    io.on('connection', function (socket) {
        console.log(
            `Usuário conectado: ${socket.id}`
        );

        if (ocupado) {
            socket.emit(
                'laboratorio_ocupado',
                'O experimento já está sendo utilizado.'
            );

            socket.disconnect(true);
            return;
        }

        ocupado = true;
        socketAtivo = socket;

        /**
         * Recebe o comando de ligamento.
         */
        socket.on(
            'Ligar',
            async function () {
                if (socketAtivo !== socket) {
                    return;
                }

                try {
                    await serial.enviar('T');

                    console.log(
                        'Comando Ligar enviado ao Arduino.'
                    );

                    socket.emit(
                        'laboratorio_ligado'
                    );
                } catch (erro) {
                    console.error(
                        'Erro ao ligar o laboratório:',
                        erro.message
                    );

                    socket.emit(
                        'erro_laboratorio',
                        'Não foi possível enviar o comando ao Arduino.'
                    );
                }
            }
        );

        /**
         * Recebe o comando de desligamento.
         */
        socket.on(
            'Desligar',
            async function () {
                if (socketAtivo !== socket) {
                    return;
                }

                await desligarArduino();
                liberarLaboratorio();

                if (socket.connected) {
                    socket.disconnect(true);
                }
            }
        );

        /**
         * Desliga o aparato caso o usuário feche
         * a página ou perca a conexão.
         */
        socket.on(
            'disconnect',
            async function (motivo) {
                console.log(
                    `Usuário desconectado: ${motivo}`
                );

                if (socketAtivo !== socket) {
                    return;
                }

                await desligarArduino();
                liberarLaboratorio();
            }
        );
    });

    /**
     * Encerra o laboratório quando o processo
     * Node.js é finalizado.
     */
    async function encerrar() {
        await desligarArduino();
        liberarLaboratorio();
    }

    return {
        encerrar
    };
}

module.exports = {
    criarLaboratorio
};