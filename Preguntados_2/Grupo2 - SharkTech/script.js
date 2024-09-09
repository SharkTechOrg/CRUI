let numeroPregunta = 1;
let puntos = 0;

const preguntas = [
  {
    categoria: "Salud",
    pregunta: "¿Cuánta agua hay que beber al día?",
    respuestas: [
      { texto: "1,5 y 2 litros" },
      { texto: "4 litros" },
      { texto: "3 litros" },
      { texto: "5 litros" },
    ],
    correcta: 0,
  },
  {
    categoria: "Geografía",
    pregunta: "¿Cuál es la capital de Francia?",
    respuestas: [
      { texto: "París" },
      { texto: "Londres" },
      { texto: "Berlín" },
      { texto: "Madrid" },
    ],
    correcta: 0,
  },
  {
    categoria: "Educación",
    pregunta:
      "Todas las escuelas del país deben tener educación sexual integral en sus planes de estudio para generar actitudes responsables y prevenir problemas relacionados con la salud sexual.",
    respuestas: [{ texto: "Verdadero" }, { texto: "Falso" }],
    correcta: 0,
  },
];

function validarRespuesta(index, el) {
  const preguntaActual = preguntas[numeroPregunta - 1];
  let feedback = "";
  if (preguntaActual.correcta === index) {
    puntos++;
    el.classList.add("correcto");
    feedback = "Correcto";
  } else {
    el.classList.add("incorrecto");
    feedback = "Incorrecto";
    const buttons = document.querySelectorAll("button");
    buttons[preguntaActual.correcta].classList.add("correcto");
  }
  document.querySelectorAll("button").forEach((el) => {
    el.disabled = true;
  });

  document.getElementById("feedback").textContent = feedback;
  siguiente();
}

function siguiente() {
  setTimeout(() => {
    document.getElementById("feedback").textContent = "";
    actualizarNumeroPregunta();
  }, 1500);
}

function actualizarNumeroPregunta() {
  numeroPregunta++;
  if (numeroPregunta <= 3) {
    document.getElementById(
      "numeroPregunta"
    ).textContent = `Pregunta Número: ${numeroPregunta}`;
    mostrarPregunta();
  } else {
    const numeroPreguntaEl = document.getElementById("numeroPregunta");
    numeroPreguntaEl.innerHTML = "";
    const button = document.createElement("button");
    button.onclick = reiniciar;
    button.classList.add("btn");
    button.textContent = "Volver a jugar";
    numeroPreguntaEl.appendChild(button);
    document.getElementById("pregunta").textContent = "Fin";
    document.getElementById("respuesta").innerHTML = `Puntos: ${puntos} de 3`;
  }
}

function mostrarPregunta() {
  const preguntaActual = preguntas[numeroPregunta - 1];
  document.getElementById("pregunta").textContent = preguntaActual.pregunta;
  document.getElementById("categoria").textContent = preguntaActual.categoria;

  const respuestas = document.getElementById("respuesta");
  respuestas.innerHTML = "";

  preguntaActual.respuestas.forEach((respuesta, index) => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.textContent = respuesta.texto;
    button.onclick = () => validarRespuesta(index, button);
    respuestas.appendChild(button);
  });
}

function reiniciar() {
  numeroPregunta = 1;
  puntos = 0;
  document.getElementById(
    "numeroPregunta"
  ).textContent = `Pregunta Número: ${numeroPregunta}`;
  mostrarPregunta();
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarPregunta();
  document.getElementById(
    "numeroPregunta"
  ).textContent = `Pregunta Número: ${numeroPregunta}`;
});
