// VARIABLES
let urlPokemons = [];
let turno,
  contador,
  tableroJugador,
  tableroMaquina,
  jugadaJugador,
  jugadaMaquina,
  cartasJugador,
  cartasMaquina,
  cartel,
  cargando,
  primero,
  puntosMaquina,
  puntosJugador,
  contenedorMaquina,
  contenedorJugador,
  ataquesMaquina,
  ataqueRival,
  ataqueMaquina,
  contadorMin,
  movimientoJugador,
  movimientoMaquina;

window.onload = function () {
  primero = true;
  contador = 0;
  contadorMin = 0;
  tableroJugador = document.getElementById("player");
  tableroMaquina = document.getElementById("machine");
  turno = randomNum(1, 3);

  jugadaJugador = document.getElementById("jugadaPlayer");
  jugadaMaquina = document.getElementById("jugadaMachine");

  puntosMaquina = document.querySelector("#totalMachine");
  puntosJugador = document.querySelector("#totalPlayer");

  cartel = document.getElementById("reportero");
  cargando = document.querySelector("#reportero > img");

  contenedorJugador = document.getElementById("cartasPlayer");
  contenedorMaquina = document.getElementById("cartasMachine");

  ajax();
};
function ajax() {
  fetch("https://pokeapi.co/api/v2/pokemon")
    .then((result) => result.json())
    .then((info) => {
      ajax2(info.count);
    });
}

function ajax2(numMax) {
  fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${numMax}`)
    .then((result) => result.json())
    .then((info) => {
      // Almacenamos todas las url's de los pokemon en un vector
      for (let i = 0; i < info.results.length; i++) {
        urlPokemons[i] = info.results[i].url;
      }
      ajax3(urlPokemons);
    });
}

function ajax3(array) {
  for (let i = 0; i <= 10; i++) {
    fetch(`${array[randomNum(0, array.length)]}`)
      .then((result) => result.json())
      .then((final) => {
        if (final.base_experience == null) {
          final.base_experience = randomNum(100, 300);
          crearPokemons(
            final.name,
            final.base_experience,
            final.sprites.front_default
          );
        } else if (final.sprites.front_default == null) {
          final.sprites.front_default = "";
          crearPokemons(
            final.name,
            final.base_experience,
            final.sprites.front_default
          );
        } else {
          crearPokemons(
            final.name,
            final.base_experience,
            final.sprites.front_default
          );
        }
      });
  }
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function crearPokemons(nombre, ataque, imagen) {
  if (contador < 10) {
    if (tableroJugador.childElementCount < 5) {
      // caja
      let caja = document.createElement("div");
      caja.classList.add("carta");
      caja.classList.add("cartaJugador");
      tableroJugador.appendChild(caja);
      caja.addEventListener("click", mover);

      // imagen
      let img = document.createElement("img");
      caja.appendChild(img);
      img.src = imagen;

      // nombre
      let name = document.createElement("div");
      caja.appendChild(name);
      name.innerText = nombre;

      // ataque
      let attack = document.createElement("div");
      attack.classList.add("experiencia");
      caja.appendChild(attack);
      attack.innerText = ataque;
    } else {
      // caja
      let caja = document.createElement("div");
      caja.classList.add("carta");
      caja.classList.add("cartaMaquina");
      tableroMaquina.appendChild(caja);

      // imagen
      let img = document.createElement("img");
      caja.appendChild(img);
      img.src = imagen;

      // nombre
      let name = document.createElement("div");
      caja.appendChild(name);
      name.innerText = nombre;

      // ataque
      let attack = document.createElement("div");
      attack.classList.add("experiencia");
      caja.appendChild(attack);
      attack.innerText = ataque;

      let dorso = document.createElement("img");
      caja.appendChild(dorso);
      dorso.classList.add("dorso");
      dorso.src = "./img/dorso.png";
    }
    cartasJugador = document.querySelectorAll("#player > .cartaJugador");
    cartasMaquina = document.querySelectorAll("#machine > .cartaMaquina");
    ataquesMaquina = document.querySelectorAll(".cartaMaquina > .experiencia");
    contador++;
  } else {
    jugar();
  }
}

function jugar() {
  if (jugadaMaquina.childElementCount == 1 &&jugadaJugador.childElementCount == 1) {
    deliverar();
  } else if (turno == 2) {
    if (primero) {
      jugadaMaquina.appendChild(cartasMaquina[randomNum(0, cartasMaquina.length)]);
      let cartaDorso = document.querySelector("#jugadaMachine > .carta > .dorso");
      cartaDorso.classList.add("ocultar");
      primero = false;
      turno = 1;
    }else{
      ia();
    }
  } else if (
    jugadaMaquina.childElementCount == 0 &&
    jugadaJugador.childElementCount == 1
  ) {
    ia();
  }
}

function ia() {
  

  let ataquesMaquinaInt = [];
  ataqueRival = parseInt(ataqueRival.innerText);

  for (let i = 0; i < ataquesMaquina.length; i++) {
    ataquesMaquinaInt.push(parseInt(ataquesMaquina[i].innerText));
  }

  var menor = Math.min(...ataquesMaquinaInt);
  var mayor = Math.max(...ataquesMaquinaInt);


  ataquesMaquinaInt.forEach(ataqueInt => {
    if (ataqueInt > ataqueRival) {
      
    }
  });

  if (jugadaMaquina.childElementCount < 1 && tableroMaquina.childElementCount >= 1) {
    jugadaMaquina.appendChild(cartasMaquina[randomNum(0,cartasMaquina.length)]);
    let cartaDorso = document.querySelector("#jugadaMachine > .carta > .dorso");
    cartaDorso.classList.add("ocultar");
    ataqueMaquina = document.querySelector(
      "#jugadaMachine > .cartaMaquina > .experiencia"
    );
    ataqueMaquina = ataqueMaquina.innerText;
    movimientoMaquina = document.querySelector("#jugadaMachine > .cartaMaquina");
  
    mover();
  }
  
}

function mover() {
  if (jugadaJugador.childElementCount < 1) {
    jugadaJugador.appendChild(this);
    ataqueRival = document.querySelector(
      "#jugadaPlayer > .cartaJugador > .experiencia"
    );
    movimientoJugador = document.querySelector("#jugadaPlayer > .cartaJugador");
  }
  jugar();
}

function deliverar() {
  ataqueMaquina = parseInt(document.querySelector(
    "#jugadaMachine > .cartaMaquina > .experiencia"
  ).innerText);
  ataqueRival = parseInt(document.querySelector(
    "#jugadaPlayer > .cartaJugador > .experiencia"
  ).innerText);
  movimientoJugador = document.querySelector("#jugadaPlayer > .cartaJugador");
  movimientoMaquina = document.querySelector("#jugadaMachine > .cartaMaquina");

  puntosMaquina = document.querySelector("#totalMachine");
  puntosJugador = document.querySelector("#totalPlayer");

  let resultado = 0;

    if (ataqueMaquina > ataqueRival) {
      contenedorMaquina.appendChild(movimientoMaquina);
      contenedorMaquina.appendChild(movimientoJugador);
      resultado = (ataqueMaquina + ataqueRival)+parseInt(puntosMaquina.innerText);
      puntosMaquina.innerText = resultado;
      turno = 2;
    }else if(ataqueMaquina < ataqueRival){
      contenedorJugador.appendChild(movimientoMaquina);
      contenedorJugador.appendChild(movimientoJugador);
      resultado = (ataqueMaquina + ataqueRival)+parseInt(puntosJugador.innerText);
      puntosJugador.innerText = resultado;
      turno = 1;
    }
    
    if(parseInt(puntosMaquina.innerText) >= 1000 || parseInt(puntosJugador.innerText) >= 1000 || (tableroJugador.childElementCount == 0 && tableroMaquina.childElementCount == 0)){
      final();
    }
    cartasJugador = document.querySelectorAll("#player > .cartaJugador");
    cartasMaquina = document.querySelectorAll("#machine > .cartaMaquina");
    jugar();
}


function final(){
}
