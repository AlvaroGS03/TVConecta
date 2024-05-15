const powerSwitch = document.querySelector('.power-switch');
const body = document.querySelector('body');

powerSwitch.addEventListener('animationend', function (event) {
    if (event.animationName === 'click-animation') {
        setTimeout(function () {
            powerSwitch.style.display = 'none';
            mostrarBotones();
        }, 1500);
    }
});

function mostrarBotones() {
    document.querySelector('.modo-sencillo').style.display = 'inline-block';
    document.querySelector('.modo-complejo').style.display = 'inline-block';
}


document.addEventListener('DOMContentLoaded', function () {
    // Función para manejar el evento click del botón "Modo Sencillo"
    document.querySelector('.modo-sencillo').addEventListener('click', function () {
        // Ocultar los botones "Modo Sencillo" y "Modo Complejo"
        document.querySelector('.modo-sencillo').style.display = 'none';
        document.querySelector('.modo-complejo').style.display = 'none';
        // Mostrar el mando de televisión
        document.getElementById('tv-remote').style.display = 'block';
        //poner el tv-remote en el centro horizontal de la pantalla 
        document.getElementById('tv-remote').style.left = "50%";
        document.getElementById('tv-remote').style.right = "50%";

    });
    // Función para manejar el evento click del botón "Modo Complejo"
    document.querySelector('.modo-complejo').addEventListener('click', function () {
        // Ocultar los botones "Modo Sencillo" y "Modo Complejo"
        document.querySelector('.modo-sencillo').style.display = 'none';
        document.querySelector('.modo-complejo').style.display = 'none';
        // Mostrar el mando de televisión
        document.getElementById('tv-remote-complejo').style.display = 'block';
        //poner el tv-remote en el centro horizontal de la pantalla 
        document.getElementById('tv-remote-complejo').style.left = "50%";
        document.getElementById('tv-remote-complejo').style.right = "50%";
    });
});

function playSound(checkbox) {
    if (checkbox.checked) {
        var audio = document.getElementById("startup");
        audio.play();
    }
}

function turnoff() {
    var player = videojs('hls-example');
    player.pause();
    //ocultar tv-screen
    document.getElementById('tv-screen').style.display = 'none';

    //poner el tv-remote en el centro horizontal de la pantalla 
    document.getElementById('tv-remote').style.left = "50%";
    document.getElementById('tv-remote').style.right = "50%";

    document.getElementById('tv-remote-complejo').style.left = "50%";
    document.getElementById('tv-remote-complejo').style.right = "50%";
}

function playpause() {
    var player2 = videojs('hls-example');
    if (player2.paused()) {
        player2.play();
    } else {
        player2.pause();
    }
}



function playSoundAndRedirect() {
    var audio = new Audio('sounds/shutdown.mp3');

    // Reproducir el sonido
    audio.play();

    // Redirigir después de que termine de reproducirse el sonido
    audio.addEventListener('ended', function () {
        //window.open('demo.html', '_self');
        //ocultar tv-remote
        document.getElementById('tv-remote').style.display = 'none';
        document.getElementById('tv-remote-complejo').style.display = 'none';
        document.getElementById('menu-configuracion').style.display = 'none';
        document.getElementById('remote-principal').style.display = 'block';
        //ocultar tv-screen
        document.getElementById('tv-screen').style.display = 'none';
        var player = videojs('hls-example');
        player.pause();
        mostrarBotones();
    });
}

function openTV(channelselected) {

    var player = videojs('hls-example');
    if (channelselected == 1) {
        player.src("video/la1_main_dvr.m3u8");
    }
    if (channelselected == 2) {
        player.src("video/la2_main_dvr.m3u8");
    }
    player.play();

    var symbol = document.getElementById("tv-screen");
    symbol.style.display = "block"; // Cambia la visibilidad a "block" (visible)


    document.getElementById("tv-remote").style.right = "0px";
    document.getElementById("tv-remote").style.left = "";

    document.getElementById("tv-remote-complejo").style.right = "0px";
    document.getElementById("tv-remote-complejo").style.left = "";

}

function changechannel(option) {
    var player = videojs('hls-example');
    //comparar texto de la opcion seleccionada
    if (option == "channeldown") {
        if (player.src() == "video/la1_main_dvr.m3u8") {
            mostrarAviso();
        }
        else if (player.src() == "video/la2_main_dvr.m3u8") {
            player.src("video/la1_main_dvr.m3u8");
        }
    }
    if (option == "channelup") {
        if (player.src() == "video/la1_main_dvr.m3u8") {
            player.src("video/la2_main_dvr.m3u8");
        }
        else if (player.src() == "video/la2_main_dvr.m3u8") {
            mostrarAviso();
        }
    }

    player.play();
}


function mostrarImagen(tipo) {
    // Obtener el contenedor de la imagen y la imagen misma
    var contenedor = document.getElementById('imagen-container');
    var imagen = document.getElementById('imagen');
    var player = videojs('hls-example');

    // Cambiar la imagen según el tipo
    if (tipo === 'subir') {
        if (player.volume() < 1) {
            player.volume(player.volume() + 0.2);
        }
        imagen.src = 'img/volume-2.svg';
    } else if (tipo === 'bajar') {
        if (player.volume() == 0) {
            imagen.src = 'img/volume-x.svg';
        }
        else {
            imagen.src = 'img/volume-1.svg';
            player.volume(player.volume() - 0.2);
        }
    } else if (tipo === 'mute') {
        if (player.volume() > 0) {
            imagen.src = 'img/volume-x.svg';
            //mute el reproductor de video
            player.volume(0);
        } else if (player.volume() == 0) {
            imagen.src = 'img/volume-2.svg';
            //desmute el reproductor de video
            player.volume(0.5);
        }
    }


    // Mostrar el contenedor de la imagen
    contenedor.style.display = 'block';

    // Reiniciar la animación
    imagen.style.animation = 'none';
    imagen.offsetHeight; /* Trigger reflow */
    imagen.style.animation = null;

    // Ocultar el contenedor después de medio segundo de finalizar la animación
    setTimeout(function () {
        contenedor.style.display = 'none';
    }, 500); // 500 milisegundos = 0.5 segundos
}

function mostrarAviso() {
    var popup = document.createElement('div');
    popup.classList.add('popup');

    var h2 = document.createElement('h2');
    h2.textContent = 'Aviso';

    var closeLink = document.createElement('span');
    closeLink.classList.add('close');
    closeLink.textContent = '×';
    closeLink.addEventListener('click', function () {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    var content = document.createElement('div');
    content.classList.add('content');
    content.textContent = 'No disponible en la demostración.';

    popup.appendChild(h2);
    popup.appendChild(closeLink);
    popup.appendChild(content);

    //Tengo overlay definido en el CSS, quiero añadirlo a toda la pagina cuando se muestre el popup, y cuando este se cierre, quitarselo
    var overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    overlay.style.display = 'block';

    document.body.appendChild(popup);
    popup.style.display = 'block';
}

function peliculas() {
    document.getElementById('remote-principal').style.display = 'none';
    document.getElementById('peliculas').style.display = 'block';
    document.getElementById('pelicula-comprada').style.display = 'none';
    document.getElementById('pelicula-grabada').style.display = 'none';
    document.getElementById('pelicula-explorada').style.display = 'none';
}


function mostrarmenu() {
    //Ocultar todos los botones del tv-remote-complejo
    document.getElementById('remote-principal').style.display = 'none';
    document.getElementById('menu-configuracion').style.display = 'block';

}

function mostrarprincipal() {
    document.getElementById('remote-principal').style.display = 'block';
    document.getElementById('menu-configuracion').style.display = 'none';
    document.getElementById('menu-grabar').style.display = 'none';
    document.getElementById('peliculas').style.display = 'none';
}

function grabar() {
    document.getElementById('remote-principal').style.display = 'none';
    document.getElementById('menu-grabar').style.display = 'block';
    document.getElementById('grabacion-ultima').style.display = 'none';
    document.getElementById('grabacion-serie').style.display = 'none';
    document.getElementById('grabacion-programa').style.display = 'none';
}

function iragrabar(tipo) {
    document.getElementById('menu-grabar').style.display = 'none';
    if (tipo == "pelicula") {
        document.getElementById('grabacion-ultima').style.display = 'block';
        document.getElementById('grabacion-serie').style.display = 'none';
        document.getElementById('grabacion-programa').style.display = 'none';
    }
    else if (tipo == "serie") {
        document.getElementById('grabacion-serie').style.display = 'block';
        document.getElementById('grabacion-programa').style.display = 'none';
        document.getElementById('grabacion-ultima').style.display = 'none';
    }
    else if (tipo == "programa") {
        document.getElementById('grabacion-programa').style.display = 'block';
        document.getElementById('grabacion-serie').style.display = 'none';
        document.getElementById('grabacion-ultima').style.display = 'none';
    }
}

function mostrarAvisoGrabar(tipo) {

    var popup = document.createElement('div');
    popup.classList.add('popup');

    var h2 = document.createElement('h2');
    h2.textContent = 'Aviso';

    var closeLink = document.createElement('span');
    closeLink.classList.add('close');
    closeLink.textContent = '×';
    closeLink.addEventListener('click', function () {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        
        if (document.getElementById(tipo).innerText == 'Detener grabación')
        {
            document.getElementById(tipo).innerText = 'Grabar';
            document.getElementById(tipo).style.backgroundColor = 'orange';            
            document.getElementById('btnGrabar').style.border = '0px';
        }
        else
        {
            document.getElementById(tipo).innerText = 'Detener grabación';
            document.getElementById(tipo).style.backgroundColor = 'red';
            document.getElementById('btnGrabar').style.border = '4px solid red';
        }
    if (tipo == "btn-pelicula"){
        document.getElementById('pelisgrabadas').style.display = 'flex';
    }

    grabar();
    });

    var content = document.createElement('div');
    content.classList.add('content');

    if (document.getElementById(tipo).innerText == 'Detener grabación') {
        content.textContent = 'La grabación se ha detenido.';
    }
    else
    {
        content.textContent = 'La grabación se ha programado.';
    }

    popup.appendChild(h2);
    popup.appendChild(closeLink);
    popup.appendChild(content);

    //Tengo overlay definido en el CSS, quiero añadirlo a toda la pagina cuando se muestre el popup, y cuando este se cierre, quitarselo
    var overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    overlay.style.display = 'block';

    document.body.appendChild(popup);
    popup.style.display = 'block';
}

function iraver(tipo){
    document.getElementById('peliculas').style.display = 'none';
    document.getElementById(tipo).style.display = 'block';

}

function vertrailer() {

    var player = videojs('hls-example');
    player.src("video/trailer.mp4");

    player.play();

    var symbol = document.getElementById("tv-screen");
    symbol.style.display = "block"; // Cambia la visibilidad a "block" (visible)


    document.getElementById("tv-remote").style.right = "0px";
    document.getElementById("tv-remote").style.left = "";

    document.getElementById("tv-remote-complejo").style.right = "0px";
    document.getElementById("tv-remote-complejo").style.left = "";

}

function borrargrabada() {
    var popup = document.createElement('div');
    popup.classList.add('popup');

    var h2 = document.createElement('h2');
    h2.textContent = 'Aviso';

    var closeLink = document.createElement('span');
    closeLink.classList.add('close');
    closeLink.textContent = '×';
    closeLink.addEventListener('click', function () {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    var content = document.createElement('div');
    content.classList.add('content');
    content.textContent = '¿Estás seguro de querer borrar esta grabación?.';

    // Crear botones de confirmar y cancelar
    var confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirmar';
    confirmButton.addEventListener('click', function() {
        // Acción a realizar cuando se confirma el borrado
        document.getElementById('pelisgrabadas').style.display = 'none';
        popup.style.display = 'none';
        overlay.style.display = 'none';
        peliculas();

    });

    var cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancelar';
    cancelButton.addEventListener('click', function() {
        // Acción a realizar cuando se cancela el borrado
        popup.style.display = 'none';
        overlay.style.display = 'none';
        
    });

    popup.appendChild(h2);
    popup.appendChild(closeLink);
    popup.appendChild(content);
    popup.appendChild(confirmButton);
    popup.appendChild(cancelButton);

    // Tengo overlay definido en el CSS, quiero añadirlo a toda la pagina cuando se muestre el popup, y cuando este se cierre, quitarselo
    var overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    overlay.style.display = 'block';

    document.body.appendChild(popup);
    popup.style.display = 'block';
}

function comprarpelicula() {
    var popup = document.createElement('div');
    popup.classList.add('popup');

    var h2 = document.createElement('h2');
    h2.textContent = 'Aviso';

    var closeLink = document.createElement('span');
    closeLink.classList.add('close');
    closeLink.textContent = '×';
    closeLink.addEventListener('click', function () {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    var content = document.createElement('div');
    content.classList.add('content');
    content.textContent = '¿Estás seguro de querer comprar esta película?.';

    // Crear botones de confirmar y cancelar
    var confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirmar';
    confirmButton.addEventListener('click', function() {
        // Acción a realizar cuando se confirma el borrado
        document.getElementById('compradapelicula').style.display = 'block';
        popup.style.display = 'none';
        overlay.style.display = 'none';
        peliculas();
    });

    var cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancelar';
    cancelButton.addEventListener('click', function() {
        // Acción a realizar cuando se cancela el borrado
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    popup.appendChild(h2);
    popup.appendChild(closeLink);
    popup.appendChild(content);
    popup.appendChild(confirmButton);
    popup.appendChild(cancelButton);

    // Tengo overlay definido en el CSS, quiero añadirlo a toda la pagina cuando se muestre el popup, y cuando este se cierre, quitarselo
    var overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    overlay.style.display = 'block';

    document.body.appendChild(popup);
    popup.style.display = 'block';
}
