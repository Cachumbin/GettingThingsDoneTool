const mandar = document.getElementById("submit");
const container = document.getElementById("container");
const nombreTarea = document.getElementById("nombreTarea");
const tipoTarea = document.getElementById("tipoTarea");
const accionableTarea = document.getElementById("accionableTarea");
const mandar2 = document.getElementById("submit2");
const categoria = document.getElementById("categoria");
const filtro = document.getElementById("filtro");
const filtrar = document.getElementById("filtrar");
const tasksContainer = document.getElementById("tasks");
const noTarea = document.getElementById("noTarea");

let tareas = [];
let accion;
let categoriasFiltro = [];
categoriasFiltro[0] = document.getElementById("todas");
categoriasFiltro[1] = document.getElementById("sinCategoria");
let divs = [];

function createTask(tarea) {

    if (noTarea) {
        noTarea.remove();
    }

    if (tarea.accionable) {
        accion = "Si";
    }
    else {
        accion = "No";
    }

    var newDiv = document.createElement("div");
    var currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
    tasksContainer.append(newDiv);

    newDiv.innerHTML = `
        <p>${tarea.nombre}</p>
        <p>Categoria: ${tarea.area}</p>
        <p>Es accionable: ${accion}</p>
        <input type="button" class="boton" value="Completada" id="${tarea.nombre}">
    `
    newDiv.classList.add(`tareaDiv`)
    newDiv.id = `${tarea.nombre}`
    divs.push(new TaskId(tarea.nombre, newDiv))
}

function display(radioActivo) {
    for (let i = 0; i < tareas.length; i++) {
        if (radioActivo === 'Todas' || tareas[i].area === radioActivo) {
            divs[i].id.classList.remove('hide');
        } else {
            divs[i].id.classList.add('hide');
        }
    }
}

mandar2.addEventListener("click", ()=>{
    if (categoria.value == "") {

        alert("Llene todos los campos antes de enviar")
        
    } else {

        console.log(categoria.value);
        tipoTarea.insertAdjacentHTML("beforeend",`<option value="${categoria.value}"> ${categoria.value} </option>`);
        filtro.insertAdjacentHTML("beforeend",`
            <div>
                <input type="radio" id="${categoria.value}" name="categoriaOpcion" value="${categoria.value}" checked>
                <label for="${categoria.value}" class="filtroLabel">${categoria.value}</label>
            </div>
        `);

        categoriasFiltro.push(document.getElementById(`${categoria.value}`))


        categoria.value = ""
        console.log(categoriasFiltro)

        

    }
})

mandar.addEventListener("click", ()=>{
    

    if (nombreTarea.value && tipoTarea.value != "") {
        
        console.log(nombreTarea.value);
        console.log(tipoTarea.value);
        console.log(accionableTarea.checked);

        tareas.push(new Task(nombreTarea.value, tipoTarea.value, accionableTarea.checked))
        createTask(tareas[tareas.length-1])

        nombreTarea.value = ""
        tipoTarea.value = ""
        accionableTarea.checked = false;

    } else {

        alert("Llene todos los campos antes de enviar")

    }
    
})

filtrar.onclick = function() {
    var selected = categoriasFiltro.find(radio => radio.checked);
    if (selected) {
        display(selected.value);
    }
}

function deleteTask(tarea) {
    var tareaIndex = tareas.findIndex(t => t.nombre === tarea);
    if (tareaIndex !== -1) {
        tareas.splice(tareaIndex, 1);
        var divIndex = divs.findIndex(d => d.nombre === tarea);
        if (divIndex !== -1) {
            divs[divIndex].id.remove();
            divs.splice(divIndex, 1);
        }
    }
}

tasksContainer.addEventListener("click", function(event){
    if (event.target.classList.contains(`boton`)) {
        deleteTask(event.target.id)
    }
    event.stopPropagation()
})