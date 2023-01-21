let botones;
let numeros = "0123456789";
let operadores = "/%+x-.";
let ultimoOperador = [];

window.onload = () => {
    cargarBotones();
}

function cargarBotones() {
    botones = document.querySelectorAll(".boton");
    botones.forEach(boton => {
            boton.addEventListener("click", pulsar);
            boton.addEventListener("mousedown", sombra);
            boton.addEventListener("mouseup", sombra);
        }
    )
}

function sombra() {
    this.classList.toggle("sombra");
}

function pulsar(ev) {

    if (ev.key) car = ev.key;
    else car = this.innerText;

    //Guardamos en una variable el úlimo caracter que hay en la pantalla (El más a la izquierda)
    let ult = pantalla.value[pantalla.value.length - 1];

    switch (car) {
        case "C":
            borrar();
            break;
        case "«":
            borrarUno(ult);
            break;
        case "()":
            parentesis();
            break;
        case"=":
            igual(ult);
            break;
        default:
            addPantalla(ult);

    }
}

function borrar() {
    //Vaciar patnalla y ponerla a 0
    pantalla.value = "0";
}

function borrarUno(ult) {
    //Borrar de uno en uno
    if (pantalla.value.length == 1) {
        //Cambiamos por 0
        pantalla.value = "0";
    } else if (ult == ")") {
        pantalla.value = pantalla.value.substring(1, pantalla.value.length - 1);
    } else {
        if (operadores.includes(ult)) ultimoOperador.pop();
        pantalla.value = pantalla.value.substring(0, pantalla.value.length - 1);
    }
}

function parentesis(ult) {
    //Englobar entre parétesis la operación que hay en la pantalla. SI SE PUEDE.
    if (!operadores.includes(ult)) {
        pantalla.value = `(${pantalla.value})`;
    }
    /*
    let expReg =  /^[0-9(].*[0-9)]$/
    if(expReg.test(ultimo)) {
        pantalla.value = `(${pantalla.value})`;
    }
    */
}

function igual() {
    //Calcular lo que hay en la pantalla
    let aux = pantalla.value;

    //Multiplicación
    aux = aux.replace("x", "*");

    //Porcentaje
    aux = aux.replace("%", "/100*");

    pantalla.value = eval(aux);
}

function addPantalla(ult) {
    if (pantalla.value == "0") {
        if (numeros.includes(car)) {
            pantalla.value = car;
        } else {
            pantalla.value += car;
        }
    } else if (numeros.includes(car) && ult != ")") {
        //NUMEROS
        console.log("CAR: " + car);
        pantalla.value += car;
    } else {
        //OPERADORES
        let operacion = pantalla.value.split(ultimoOperador[ultimoOperador.length - 1]);
        let ultOperando = operacion[operacion.length - 1];

        console.log(operacion);

        if ((!ultOperando.includes(".") && car == ".")) pantalla.value += car;
        else if(operadores.includes(car) && !operadores.includes(ult) && car !=".")  {
            pantalla.value += car;
            ultimoOperador.push(car);
        }
    }
}