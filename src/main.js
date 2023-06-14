const mandar = document.getElementById("submit");
const container = document.getElementById("container");
const nombreTarea = document.getElementById("nombreTarea");
const tipoTarea = document.getElementById("tipoTarea");
const accionableTarea = document.getElementById("accionableTarea");
const mandar2 = document.getElementById("submit2");
const categoria = document.getElementById("categoria");

let tareas = [];
let categorias = ["Sin Categoria"]
let indexTareas = 0;

mandar2.addEventListener("click", ()=>{
    console.log(categoria.value);
    categorias.push(categoria.value)
    tipoTarea.insertAdjacentHTML("beforeend",`<option value="${categoria.value}"> ${categoria.value} </option>`);
    categoria.value = ""
    console.log(categorias)
})

mandar.addEventListener("click", ()=>{
    console.log(nombreTarea.value);
    console.log(tipoTarea.value);
    console.log(accionableTarea.checked);

    tareas[indexTareas] = new Task(nombreTarea.value, tipoTarea.value, accionableTarea.checked)
    console.log(tareas[indexTareas])
    indexTareas++

    nombreTarea.value = ""
    tipoTarea.value = ""
    accionableTarea.checked = false;
})