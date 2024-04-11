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

function openTV() {

    var player = videojs('hls-example');
    player.play();

    var symbol = document.getElementById("tv-screen");
    symbol.style.display = "block"; // Cambia la visibilidad a "block" (visible)


    document.getElementById("tv-remote").style.right = "0px";
    document.getElementById("tv-remote").style.left = "";

}


function mostrarImagen(tipo) {
    // Obtener el contenedor de la imagen y la imagen misma
    var contenedor = document.getElementById('imagen-container');
    var imagen = document.getElementById('imagen');
    var player = videojs('hls-example');

    // Cambiar la imagen según el tipo
    if (tipo === 'subir') {
        if (player.volume() == 1) {
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

