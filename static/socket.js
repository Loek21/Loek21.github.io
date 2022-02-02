document.addEventListener('DOMContentLoaded', () => {

        // Connect to websocket when document is loaded
        var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);
    });
