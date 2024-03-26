const powerSwitch = document.querySelector('.power-switch');
const body = document.querySelector('body');

powerSwitch.addEventListener('animationend', function(event) {
    if (event.animationName === 'click-animation') {
        setTimeout(function() {
            powerSwitch.style.display = 'none';
            mostrarTarjetas();
        }, 700);
    }
});


function mostrarTarjetas() {
    // Eliminar las tarjetas anteriores si existen
    const tarjetasAnteriores = document.querySelectorAll('.tarjeta');
    tarjetasAnteriores.forEach(tarjeta => tarjeta.remove());

    // Crear tarjeta para el modo sencillo (a la izquierda)
    const tarjetaSencillo = document.createElement('div');
    tarjetaSencillo.classList.add('tarjeta');
    tarjetaSencillo.classList.add('izquierda');
    tarjetaSencillo.textContent = 'Modo sencillo';
    document.body.appendChild(tarjetaSencillo);

    // Crear tarjeta para el modo completo (a la derecha)
    const tarjetaCompleto = document.createElement('div');
    tarjetaCompleto.classList.add('tarjeta');
    tarjetaCompleto.classList.add('derecha');
    tarjetaCompleto.textContent = 'Modo completo';
    document.body.appendChild(tarjetaCompleto);
}