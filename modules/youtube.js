'use strict';

/**
 * Converte uma URL comum do YouTube
 * em uma URL apropriada para incorporação.
 */
function criarEnderecoYoutube(urlYoutube) {
    if (!urlYoutube) {
        return null;
    }

    try {
        const url = new URL(urlYoutube);

        let videoId = null;

        /*
         * Formato:
         * https://www.youtube.com/watch?v=ID
         */
        if (url.hostname.includes('youtube.com')) {
            videoId = url.searchParams.get('v');

            /*
             * Formatos:
             * https://www.youtube.com/live/ID
             * https://www.youtube.com/embed/ID
             */
            if (!videoId) {
                const partes = url.pathname
                    .split('/')
                    .filter(Boolean);

                const indiceLive =
                    partes.indexOf('live');

                const indiceEmbed =
                    partes.indexOf('embed');

                if (
                    indiceLive !== -1 &&
                    partes[indiceLive + 1]
                ) {
                    videoId =
                        partes[indiceLive + 1];
                }

                if (
                    indiceEmbed !== -1 &&
                    partes[indiceEmbed + 1]
                ) {
                    videoId =
                        partes[indiceEmbed + 1];
                }
            }
        }

        /*
         * Formato:
         * https://youtu.be/ID
         */
        if (url.hostname === 'youtu.be') {
            videoId = url.pathname
                .split('/')
                .filter(Boolean)[0];
        }

        if (!videoId) {
            console.error(
                'Não foi possível identificar o vídeo na URL do YouTube.'
            );

            return null;
        }

        return (
            'https://www.youtube-nocookie.com/embed/' +
            encodeURIComponent(videoId) +
            '?autoplay=1&mute=1&rel=0'
        );
    } catch (erro) {
        console.error(
            'URL do YouTube inválida:',
            erro.message
        );

        return null;
    }
}

module.exports = {
    criarEnderecoYoutube
};