let vid;
let boton;
let barra;

window.onload = () => {
    cargarElementos();
    cargarEventos();
    cargarBarra();
    cargarPubli();
};


function cargarPubli() {
    document.querySelector("#aspa").classList.add("ocultar");
    document.querySelector("#protector").classList.remove("ocultar")
    console.log("ENTRA");
    let segundos = 3;
    contador.innerHTML = `<div><h1>Espere durante ${segundos} segundos</h1></div>`;
    setInterval(function() {
        segundos--;
        if (segundos < 0) {
            document.querySelector("#aspa").classList.remove("ocultar");
        } else {
            contador.innerHTML = `<div><h1>Espere durante ${segundos} segundos</h1></div>`;
        }
    }, 1000);
}

function cargarElementos() {
    vid = document.getElementById("vid");
}

function cargarEventos() {
    document.querySelector("#aspa").addEventListener("click", ocultarPubli)
    let botones = document.querySelectorAll(".boton");
    for(let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", ejecutar);
    }
    vid.addEventListener("click", reproducir);
    let videos = document.querySelectorAll(".video_listado > video ");
    console.log(videos.length);
    videos.forEach( video => {
        video.addEventListener("mouseover", reproducir);
        video.addEventListener("mouseout", reproducir);
        video.addEventListener("click", cambiar);
    });
}

function ocultarPubli() {
    console.log("ocultar");
    document.querySelector("#protector").classList.add("ocultar");
}

function cargarBarra() {
    barra = document.querySelector("#barra");
    barra.addEventListener("click", comprobarBarra);
    barra.max = vid.duration;
    barra.value = 0;
    setInterval(comprobarBarra, 500);
}

function comprobarBarra() {
    if(this.id == "barra") {
        vid.currentTime = parseInt(this.value);
    } else {
        barra.value = vid.currentTime;
    }
}

function cambiar() {
    let auxiliar = this.src;
    this.src = vid.src;
    vid.src = auxiliar;
    this.play();
    cargarPubli();
}

function ejecutar() {
    boton = this;
    switch(boton.id) {
        case "mute":
            silenciar();
            break;
        case "izq":
            rebobinar(-10);
            break;
        case "play":
            reproducir();
            break;
        case "der":
            rebobinar(+10);
            break;
        case "inicio":
            reiniciar();
            break;
        case "volume_dec":
            volumen(+0.1);
            break;
        case "volume_inc":
            volumen(-0.1);
            break;
        default:break;
    }
}

function silenciar() {
    boton.classList.toggle("unmute");
    if (vid.muted) vid.muted = false;
    else vid.muted = true;
}

function rebobinar(tiempo) {
    vid.currentTime += tiempo;
}

function reproducir() {
    let video;
    if (this.id) {
        boton = document.getElementById("play");
        boton.classList.toggle("pause");
        video = this;
    }
    else {
        boton.classList.toggle("pause");
        video = vid;
    }

    if (video.paused) video.play();
    else video.pause();
}

function reiniciar() {
    vid.currentTime = 0;
}

function volumen(vol) {
    vid.volume += vol;
}
