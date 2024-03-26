const powerSwitch = document.querySelector('.power-switch');
const body = document.querySelector('body');

powerSwitch.addEventListener('animationend', function(event) {
    if (event.animationName === 'click-animation') {
        setTimeout(function() {
            powerSwitch.style.display = 'none';
            mostrarBotones();
        }, 700);
    }
});

function mostrarBotones() {
    document.querySelector('.modo-sencillo').style.display = 'inline-block';
    document.querySelector('.modo-complejo').style.display = 'inline-block';
}
