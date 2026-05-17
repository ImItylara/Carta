const stage = document.querySelector(".stage");
const title = document.querySelector(".title");
const startBtn = document.querySelector(".start");
const starsContainer = document.querySelector(".stars");
const flash = document.querySelector(".flash");

const continueBtn = document.querySelector(".continue");
const continueBtn2 = document.querySelector(".continue2");

const genesisText = document.querySelector(".genesis-text");
const hechizoText = document.querySelector(".hechizo-text");
const envelope = document.querySelector(".envelope");
const letter = document.querySelector(".letter");

/* ================= TEXTOS ================= */

const textContent = `Hola, mi amor lindo.
Qué palabra tan hermosa: Génesis.

El instante exacto en el que mi mundo empezó a cambiar,
sería el momento en el que usted apareció.

Recuerdo cuando comencé a enamorarme de usted.
Cuando verdaderamente me sentí flechado.

Pasaron tantos sentimientos dentro de mí
que ni siquiera sabía cómo explicarlos.

Tanta tranquilidad que uested me brinda,
felicidad, alegrias, días que adoro con toda mi alma
tantas cosas que pasamos juntos, tantas emociones
y no olvidar esta conexion tan hermosa que tenemos.

Desde entonces,
algo dentro de mí entendió
que usted es alguien demasiado importante para mi vida.`;

const hechizoContent = `Un hechizo que jamás me atrevería a romper.

Porque encontrar a una mujer tan maravillosa
se siente casi irreal,
como si alguien hubiera escrito su existencia
solo para cambiar mi vida.

A veces pienso que no puede ser verdad.

Que una persona tan hermosa,
tan unica, dulce, hermosa, preciosa, guapa, perfecta,
haya llegado justamente a mi mundo.

Pero sí existe.

Y tiene nombre y apellido:

“Brittany Valle”.

Desde que llegó,
mis días tienen más color,
mis pensamientos llevan su nombre
y mi corazón encontró un lugar donde quedarse.

Porque usted no solo se volvió alguien importante para mí…

Se volvió mi paz,
mi felicidad
y el lugar al que siempre quiero volver.`;

/* ================= ABRIR TELÓN ================= */

stage.addEventListener("click", () => {

    if (!stage.classList.contains("open")) {

        stage.classList.add("open");

        setTimeout(() => {
            title.classList.add("show-title");
        }, 1200);

        setTimeout(() => {
            startBtn.classList.add("show-start");
        }, 3000);
    }
});

/* ================= ESCENA 1 → 2 ================= */

startBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    stage.classList.add("next");

    setTimeout(() => {
        typeWriter(textContent, genesisText, 35, continueBtn);
    }, 800);
});

/* ================= ESCENA 2 → 3 ================= */

continueBtn.addEventListener("click", (e) => {

    e.stopPropagation();

    stage.classList.add("next2");

    setTimeout(() => {
        typeWriter(hechizoContent, hechizoText, 35, continueBtn2);
    }, 800);
});

/* ================= TYPEWRITER ================= */

function typeWriter(text, element, speed, buttonToShow){

    let i = 0;

    element.innerHTML = "";

    buttonToShow.classList.remove(
        "show-continue",
        "show-continue2"
    );

    function typing(){

        if(i < text.length){

            element.innerHTML += text.charAt(i);

            i++;

            setTimeout(typing, speed);

        }else{

            buttonToShow.classList.add(
                buttonToShow === continueBtn
                ? "show-continue"
                : "show-continue2"
            );
        }
    }

    typing();
}

/* ================= ESTRELLAS ================= */

function createStar(customDuration = null){

    const star = document.createElement("div");

    star.classList.add("shooting-star");

    star.style.top = Math.random() * window.innerHeight + "px";

    const duration =
        customDuration || (Math.random() * 3 + 2);

    star.style.animationDuration = duration + "s";

    starsContainer.appendChild(star);

    setTimeout(() => star.remove(), duration * 1000);
}

setInterval(createStar, 800);

/* ================= WARP ================= */

let warpSpeed = 800;
let warpActive = false;
let warpLoop;

function progressiveWarp(){

    function spawn(){

        if(!warpActive) return;

        const fastDuration =
            Math.random() * 0.8 + 0.4;

        createStar(fastDuration);

        setTimeout(spawn, warpSpeed);
    }

    spawn();
}

/* ================= ESCENA 3 → 4 ================= */

continueBtn2.addEventListener("click", (e) => {

    e.stopPropagation();

    warpActive = true;

    warpLoop = setInterval(() => {

        if(warpSpeed > 80){
            warpSpeed -= 60;
        }

    }, 200);

    progressiveWarp();

    setTimeout(() => {

        flash.classList.add("active");

        setTimeout(() => {

            flash.classList.remove("active");

            setTimeout(() => {

                stage.classList.add("next3");

            }, 300);

            clearInterval(warpLoop);

            warpActive = false;

            warpSpeed = 800;

        }, 1400);

    }, 3000);
});

/* ================= ABRIR SOBRE CORREGIDO ================= */
// Agregamos el parámetro (e) aquí adentro
envelope.addEventListener("click", (e) => {
    
    // ESTA LÍNEA ES LA CLAVE: Evita que el click se duplique o se pierda en el celular
    e.stopPropagation(); 

    envelope.classList.add("open");

    setTimeout(() => {
        letter.classList.add("show");
    }, 700);
});
