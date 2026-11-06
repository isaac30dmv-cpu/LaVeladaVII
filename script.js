// 1. CUENTA ATRÁS
const fechaEvento = new Date("April 22, 2027 16:00:00").getTime();
setInterval(() => {
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
    
    const el = document.getElementById("cuenta-atras");
    if (el) el.innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}, 1000);

// 2. BOTÓN FLOTANTE VOLVER ARRIBA
const btnTop = document.getElementById('btn-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 250) {
        btnTop.classList.add('visible');
    } else {
        btnTop.classList.remove('visible');
    }
});

// 3. SELECCIÓN EN EL MAPA CIRCULAR
const zonas = document.querySelectorAll('.zona');
const zonaElegidaText = document.getElementById('zona-elegida');
const precioElegidoText = document.getElementById('precio-elegido');
const btnSiguiente = document.getElementById('btn-siguiente');

const faseMapa = document.getElementById('fase-mapa');
const faseFormulario = document.getElementById('fase-formulario');
const btnVolver = document.getElementById('btn-volver');

const inputCantidad = document.getElementById('cantidad');
const resumenZona = document.getElementById('resumen-zona');
const precioTotalText = document.getElementById('precio-total');
const formEntradas = document.getElementById('form-entradas');
const mensajeExito = document.getElementById('mensaje-exito');

let precioBase = 120;
let zonaNombre = "Pista VIP";

zonas.forEach(zona => {
    zona.addEventListener('click', function() {
        zonas.forEach(z => z.classList.remove('activa'));
        this.classList.add('activa');
        
        zonaNombre = this.getAttribute('data-zona');
        precioBase = parseInt(this.getAttribute('data-precio'));
        
        if (zonaElegidaText) zonaElegidaText.innerText = zonaNombre;
        if (precioElegidoText) precioElegidoText.innerText = precioBase;
    });
});

btnSiguiente.addEventListener('click', () => {
    faseMapa.style.display = 'none';
    faseFormulario.style.display = 'block';
    calcularTotal();
});

btnVolver.addEventListener('click', () => {
    faseFormulario.style.display = 'none';
    faseMapa.style.display = 'flex';
    if (mensajeExito) mensajeExito.style.display = 'none';
});

function calcularTotal() {
    const cantidad = parseInt(inputCantidad.value) || 1;
    const gastosGestion = 5 * cantidad;
    const total = (precioBase * cantidad) + gastosGestion;
    
    if (resumenZona) resumenZona.innerText = zonaNombre;
    if (precioTotalText) precioTotalText.innerText = total;
}

if (inputCantidad) inputCantidad.addEventListener('input', calcularTotal);

if (formEntradas) {
    formEntradas.addEventListener('submit', (e) => {
        e.preventDefault();
        if (mensajeExito) mensajeExito.style.display = 'block';
        
        const grid = document.querySelector('.form-grid');
        const resumen = document.querySelector('.resumen-pago');
        const submitBtn = e.target.querySelector('button[type="submit"]');
        
        if (grid) grid.style.display = 'none';
        if (resumen) resumen.style.display = 'none';
        if (btnVolver) btnVolver.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'none';
    });
}