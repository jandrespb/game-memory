// Array para almacenar el estado de los clics
const manejoEstadosClick = {
    titulo: null,
    concepto: null
};

// Declaración elementos del DOM
const titulos = Array.from({ length: 3 }, (_, i) => document.getElementById(`titulo_${i + 1}`));
const conceptos = Array.from({ length: 3 }, (_, i) => document.getElementById(`concepto_${i + 1}`));
const contenedorConceptos = document.getElementById('concepto');
const contenedorTitulos = document.getElementById('titulo');
const botonAleatorio = document.getElementById('btn_jugar');


// Funciones que modifican el CSS
function cambiarColor(carta, color) {

    const backTitulo = carta.querySelector('.backtitulo');
    const backConcepto = carta.querySelector('.backconcepto');
    
    if (backTitulo) backTitulo.style.backgroundColor = color;
    if (backConcepto) backConcepto.style.backgroundColor = color;
}

function cambiarPosicionCarta (elemento, transformacion) {

    elemento.style.transform = transformacion;
}

// Funciones que manejan la lógica del juego
function confCartasIguales (tituloIndex, conceptoIndex) {

    cambiarColor(titulos[tituloIndex], 'rgba(129, 204, 123, 0.4)');
    cambiarColor(conceptos[conceptoIndex], 'rgba(129, 204, 123, 0.4)'); 

    const tituloEtiqueta_h3 = titulos[tituloIndex].querySelector('.backtitulo h3').innerText;
    conceptos[conceptoIndex].querySelector('.backconcepto h3').innerText = tituloEtiqueta_h3;
    const backTitulo = titulos[tituloIndex].querySelector('.backtitulo');
    const backConcepto = conceptos[conceptoIndex].querySelector('.backconcepto');
    
 cambiarPosicionCarta(backTitulo, 'perspective(600px) rotateY(360deg)');
 cambiarPosicionCarta(backConcepto, 'perspective(600px) rotateY(360deg)');
}

function confCartasDiferentes(tituloIndex, conceptoIndex) {

    cambiarColor(titulos[tituloIndex], 'rgba(221, 74, 51, 0.4)');
    cambiarColor(conceptos[conceptoIndex], 'rgba(221, 74, 51, 1)');
}

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}


// Funciones que permiten ejecutar la lógica del juego
function ejecucionJuegoCartas() {

    if (manejoEstadosClick.titulo !== null && manejoEstadosClick.concepto !== null) {

        const tituloIndex = parseInt(manejoEstadosClick.titulo.replace('titulo_', '')) - 1;
        const conceptoIndex = parseInt(manejoEstadosClick.concepto.replace('concepto_', '')) - 1;

        if (tituloIndex === conceptoIndex) {
            console.log('Son iguales');    
            confCartasIguales(tituloIndex, conceptoIndex);

        } else {
            console.log('Son diferentes');
            confCartasDiferentes(tituloIndex, conceptoIndex);

            setTimeout(() => {
                cambiarColor(titulos[tituloIndex], 'rgba(148, 153, 31, 0.4)');
            }, 2000);
        }

        manejoEstadosClick.titulo = null;
        manejoEstadosClick.concepto = null;
    }
}

function ejecucionAleatoriaCartas(container) {

    const elementsArray = Array.from(container.children);
    const shuffledElements = shuffle(elementsArray);
    
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    shuffledElements.forEach(element => {
        container.appendChild(element);
    });
}


// llamado de los eventos de clic para cada elemento (título, concepto y aleatorio)
titulos.forEach((contenedorTitulo, index) => {
    contenedorTitulo.addEventListener('click', () => {
        
            manejoEstadosClick.titulo = `titulo_${index + 1}`;
            const backTitulo = contenedorTitulo.querySelector('.backtitulo');
            backTitulo.classList.toggle('hover'); 
            ejecucionJuegoCartas(); 
    });
});

conceptos.forEach((contenedorConcepto, index) => {
    contenedorConcepto.addEventListener('click', () => {
        manejoEstadosClick.concepto = `concepto_${index + 1}`;
        ejecucionJuegoCartas(); 
    });
});

botonAleatorio.addEventListener('click', () => {
    ejecucionAleatoriaCartas(contenedorTitulos);
    ejecucionAleatoriaCartas(contenedorConceptos);
});