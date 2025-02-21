let numeroSecreto = 0;
let numeroIntentos = 0;
let listasNumerosSorteados = [];
let numeroMaximo = 10;
let maximoIntentos = 5;

/**
 * Asigna texto a un elemento HTML.
 * @param {string} selector - El selector del elemento HTML.
 * @param {string} texto - El texto a asignar al elemento.
 */
function asignarTextoElemento(selector, texto) {
    const elementoHTML = document.querySelector(selector);
    if (elementoHTML) {
        elementoHTML.innerHTML = texto;
    }
}

/**
 * Verifica el intento del usuario y proporciona retroalimentación.
 */
function verificarIntento() {
    const numeroUsuario = parseInt(document.getElementById('valorUsuario').value, 10);
    if (isNaN(numeroUsuario)) {
        asignarTextoElemento("p", "Por favor, ingresa un número válido.");
        return;
    }

    numeroIntentos++;
    if (numeroUsuario === numeroSecreto) {
        asignarTextoElemento("p", `Felicidades, adivinaste el número secreto en ${numeroIntentos} ${numeroIntentos === 1 ? "intento" : "intentos"}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroIntentos >= maximoIntentos) {
            asignarTextoElemento("p", `Lo siento, has alcanzado el máximo de ${maximoIntentos} intentos. El número secreto era ${numeroSecreto}.`);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            asignarTextoElemento("p", `El número secreto es ${numeroUsuario > numeroSecreto ? "menor" : "mayor"}`);
            limpiarCampo();
        }
    }
}

/**
 * Limpia el campo de entrada del usuario.
 */
function limpiarCampo() {
    document.getElementById('valorUsuario').value = "";
}

/**
 * Genera un número secreto aleatorio entre un rango dado.
 * @param {number} min - El valor mínimo del rango.
 * @param {number} max - El valor máximo del rango.
 * @returns {number} - Un número aleatorio entre min y max.
 */
function generarNumeroSecreto(min, max) {
    let numeroGenerado = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(numeroGenerado);
    console.log(listasNumerosSorteados);
    
    if (listasNumerosSorteados.length === numeroMaximo) {
        listasNumerosSorteados = [];
        asignarTextoElemento("p", "Ya se sortearon todos los números posibles, se reinicia el juego");
    } else {
        if (listasNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto(min, max);
        } else {
            listasNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

/**
 * Establece las condiciones iniciales del juego.
 */
function condicionesIniciales() {
    asignarTextoElemento("h1", "Adivina el número secreto");
    asignarTextoElemento("p", `Adivina el número secreto entre 1 y ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto(1, numeroMaximo);
    numeroIntentos = 0;
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    limpiarCampo();
}

/**
 * Reinicia el juego a las condiciones iniciales.
 */
function reiniciarJuego() {
    condicionesIniciales();
}

/**
 * Configura el juego basado en las entradas del usuario.
 */
function configurarJuego() {
    numeroMaximo = parseInt(document.getElementById('maximoNumero').value, 10);
    maximoIntentos = parseInt(document.getElementById('maximoIntentos').value, 10);

    if (isNaN(numeroMaximo) || isNaN(maximoIntentos) || numeroMaximo <= 0 || maximoIntentos <= 0) {
        asignarTextoElemento("p", "Por favor, ingresa valores válidos para el máximo número y los intentos.");
        return;
    }

    condicionesIniciales();
}

// Inicializa el juego al cargar la página
condicionesIniciales();