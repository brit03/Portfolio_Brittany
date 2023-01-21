let altoAncho = 10;
let celdas = [];
let totalPuntos = 0;
let celdasSin;
window.onload = () => {
    empezar.addEventListener("click", start);
}

function start() {
    if (numMinas.value >= 5 && numMinas.value <= 50) {
        numMinas = numMinas.value;
        celdasSin = altoAncho*altoAncho - numMinas;
        borrarTablero();
        generarTablero();
        colocarBombas();
        pintarNumeros();
    } else {
        error.innerText = "Tiene que ser un valor entre 5 y 50";
    }
}

function borrarTablero() {
    tablero.innerText = "";
}

function generarTablero() {
    for(let i = 0; i < altoAncho; i++) {
        let fila = [];
        for (let x = 0; x < altoAncho; x++) {
            let div = document.createElement("div");
            div.classList.add("casilla");
            div.classList.add("oculto");
            fila.push(div);
            div.addEventListener("click", mostrarCasilla);
            tablero.appendChild(div);
        }
        celdas.push(fila);
    }
}

function colocarBombas() {
    let bombas = 0;
    while(bombas < numMinas) {
        let rand = alea(celdas.length);
        let rand2 = alea(celdas.length);
        if(!celdas[rand][rand2].className.includes("mina")) {
            celdas[rand][rand2].classList.add("mina");
            bombas++;
        }
    }
}

function pintarNumeros() {
    //X - COLUMNAS
    //I - FILAS
    for(let i = 0; i < celdas.length; i++) {
        for (let x = 0; x < celdas[i].length; x++) {
            if (celdas[i][x].classList.contains("mina")) {
                comprobarNumeros(i - 1,x);
                comprobarNumeros(i + 1,x);
                comprobarNumeros(i,x - 1);
                comprobarNumeros(i,x + 1);
                comprobarNumeros(i - 1,x - 1);
                comprobarNumeros(i - 1,x + 1);
                comprobarNumeros(i + 1,x - 1);
                comprobarNumeros(i + 1,x + 1);
            }
        }
    }
}

function comprobarNumeros(i, x) {
    let color;
    if (i >= 0 && i < altoAncho && x >= 0 && x < altoAncho && !celdas[i][x].classList.contains("mina")) {
        if (celdas[i][x].innerText) {
            if (parseInt(celdas[i][x].innerText) + 1 == 2) color = "medio";
            else color = "mucho";
            celdas[i][x].innerText = parseInt(celdas[i][x].innerText) + 1;
        } else {
            celdas[i][x].innerText = "1";
            color = "poco";
        }
        celdas[i][x].classList.add(color);
    }
}

function mostrarCasilla() {

    celdasSin--;
    //Mostrar el contenido de la celda.
    this.classList.remove("oculto");
    //Eliminar el evento de la línea para no poder sumar con nuevos clicks
    this.removeEventListener("click", mostrarCasilla);
    if (this.classList.contains("mina")) {
        mostrarMensajeFinal(false);
    } else {
        totalPuntos += parseInt((this.innerText + 1))*numMinas;
        if(totalPuntos < 10) puntos.innerHTML = totalPuntos + "<br>puntos";
        else puntos.innerText = totalPuntos + " puntos";
    }
    if(celdasSin <= 0) mostrarMensajeFinal(true);
}

function mostrarMensajeFinal(win) {
    protector.classList.remove("ocultar");
    mensajeFinal.classList.remove("ocultar");
    if(win) mensajeFinal.innerHTML = `Has ganado con ${totalPuntos} puntos<br><button onclick="location.assign('index.html')">Volver a jugar</button>`;
    else mensajeFinal.innerHTML = `Has perdido con ${totalPuntos} puntos<br><button onclick="location.assign('index.html')">Volver a jugar</button>`;
}

function alea(max) {
    return Math.floor(Math.random()*max);
}