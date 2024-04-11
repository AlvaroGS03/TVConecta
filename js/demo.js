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
    });
});
function playSound(checkbox) {
    if (checkbox.checked) {
        var audio = document.getElementById("startup");
        audio.play();
    }
}
function playSoundAndRedirect() {
    var audio = new Audio('sounds/shutdown.mp3');

    // Reproducir el sonido
    audio.play();

    // Redirigir después de que termine de reproducirse el sonido
    audio.addEventListener('ended', function () {
        window.open('demo.html', '_self');
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
        if (option == "channelup") {
            if (player.src() == "video/la1_main_dvr.m3u8") {
                player.src("video/la2_main_dvr.m3u8");
            }
            else if (player.src() == "video/la2_main_dvr.m3u8") {
                mostrarAviso();
            }
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
            imagen.src = 'img/volume-X.svg';
        }
        else {
            imagen.src = 'img/volume-1.svg';
            player.volume(player.volume() - 0.2);
        }
    } else if (tipo === 'mute') {
        if (player.volume() > 0) {
            imagen.src = 'img/volume-X.svg';
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

