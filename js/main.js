const formulario = document.querySelector(".form");

const campoEntrada = document.querySelector(".input");

const listaUl = document.querySelector(".list");
formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  listaTareas();
});

//obtener los datos ddel localstorage
let lista = JSON.parse(localStorage.getItem("lista"));
console.log(lista);
lista.forEach((tarea) => {
  listaTareas(tarea);
});

function listaTareas(tarea) {
  //Crear Tarea
  let nuevaTarea = campoEntrada.value;

  //LocalStorage
  if (tarea) {
    nuevaTarea = tarea.nombre;
  }

  // agregando tareas
  const selectLi = document.createElement("li");

  //localStorage
  if (tarea && tarea.checkeado) {
    selectLi.classList.add("checked");
  }

  //boton chequear en nueva tarea
  selectLi.innerText = nuevaTarea;
  listaUl.appendChild(selectLi);
  campoEntrada.value = "";

  //chequear boton
  const botonChequear = document.createElement("div");
  botonChequear.innerHTML = '<i class="fas fa-check-square"></i>';
  selectLi.appendChild(botonChequear);

  //boton borrar en nueva tarea
  const botonBorrar = document.createElement("div");
  botonBorrar.innerHTML = '<i class="fas fa-trash"></i>';
  selectLi.appendChild(botonBorrar);

  //Funcionalidad de tachar tarea
  botonChequear.addEventListener("click", () => {
    selectLi.classList.toggle("checked");
    actualizarLocalStorage();
  });

  //Funcionalidad de borrar tarea
  botonBorrar.addEventListener("click", () => {
    selectLi.remove();
    actualizarLocalStorage();
  });

  actualizarLocalStorage();
}

//Guardar en el localStorage del navegador

function actualizarLocalStorage() {
  const selectLis = document.querySelectorAll("li");

  lista = [];
  selectLis.forEach((selectLi) => {
    lista.push({
      nombre: selectLi.innerText,
      checkeado: selectLi.classList.contains("checked"),
    });
  });
  localStorage.setItem("lista", JSON.stringify(lista));
}
