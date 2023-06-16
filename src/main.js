const mandar = document.getElementById("submit");
const container = document.getElementById("container");
const nombreTarea = document.getElementById("nombreTarea");
const tipoTarea = document.getElementById("tipoTarea");
const accionableTarea = document.getElementById("accionableTarea");
const mandar2 = document.getElementById("submit2");
const categoria = document.getElementById("categoria");
const filtro = document.getElementById("filtro");
const filtrar = document.getElementById("filtrar");

let tareas = [];
let categorias = ["Sin Categoria"];
let indexTareas = 0;
let accion;
let categoriasFiltro = [];
categoriasFiltro[0] = document.getElementById("todas");
categoriasFiltro[1] = document.getElementById("sinCategoria");
let indexFiltro = 2;
let divs = [];

function createTask(tarea, index) {

    if (tarea.accionable) {
        accion = "Si";
    }
    else {
        accion = "No";
    }

    var newDiv = document.createElement("div");
    var currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
    container.append(newDiv);

    newDiv.innerHTML = `
        <p>${tarea.nombre}</p>
        <p>${tarea.area}</p>
        <p>${accion}</p>
    `
    newDiv.classList.add(`tareaDiv`)
    newDiv.id = `${tarea.nombre}`
    divs[index] = newDiv
}

function display(radioActivo) {
    if (radioActivo === 'Todas') {
        for (let i = 0; i < tareas.length; i++) {
            divs[i].classList.remove('hide')
        }
    } else {
        for (let i = 0; i < tareas.length; i++) {
            if (tareas[i].area === radioActivo) {
                divs[i].classList.remove('hide')
            } else {
                divs[i].classList.add('hide')
            }
        }
    }
}

mandar2.addEventListener("click", ()=>{
    if (categoria.value == "") {

        alert("Llene todos los campos antes de enviar")
        
    } else {

        console.log(categoria.value);
        categorias.push(categoria.value)
        tipoTarea.insertAdjacentHTML("beforeend",`<option value="${categoria.value}"> ${categoria.value} </option>`);
        filtro.insertAdjacentHTML("beforeend",`
            <div>
                <input type="radio" id="${categoria.value}" name="categoriaOpcion" value="${categoria.value}" checked>
                <label for="${categoria.value}">${categoria.value}</label>
            </div>
        `);

        categoriasFiltro[indexFiltro] = document.getElementById(`${categoria.value}`);

        indexFiltro++

        categoria.value = ""
        console.log(categorias)
        console.log(categoriasFiltro)

        

    }
})

mandar.addEventListener("click", ()=>{
    

    if (nombreTarea.value && tipoTarea.value != "") {
        
        console.log(nombreTarea.value);
        console.log(tipoTarea.value);
        console.log(accionableTarea.checked);

        tareas[indexTareas] = new Task(nombreTarea.value, tipoTarea.value, accionableTarea.checked)
        console.log(tareas[indexTareas])
        createTask(tareas[indexTareas],indexTareas)
        indexTareas++

        nombreTarea.value = ""
        tipoTarea.value = ""
        accionableTarea.checked = false;

    } else {

        alert("Llene todos los campos antes de enviar")

    }
    
})

filtrar.onclick = function() {
    var radios = document.getElementsByName("categoriaOpcion");
    var selected = Array.from(radios).find((radio) => radio.checked);
    display(selected.value)
}

function deleteTask() {

}