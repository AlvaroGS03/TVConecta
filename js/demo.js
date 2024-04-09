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