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
categoriasFiltro[0] = new Categoria("Todas")
categoriasFiltro[1] = new Categoria("Sin Categoria")
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

function display(target) {
    for (let i = 0; i < divs.length; i++) {
      if (target === 'Todas' || tareas[i].area === target) {
        divs[i].elemento.classList.remove('hide');
        console.log("mostrado")
      } else {
        divs[i].elemento.classList.add('hide');
        console.log("escondido")
      }
    }
  }
  
mandar2.addEventListener("click", ()=>{
    if (categoria.value == "") {

        alert("Llene todos los campos antes de enviar")
        
    } else {
        categoriasFiltro.push(new Categoria(categoria.value))
        console.log(categoria.value);
        tipoTarea.insertAdjacentHTML("beforeend",`<option value="${categoria.value}" id="${categoria.value}"> ${categoria.value} </option>`);
        filtro.insertAdjacentHTML("beforeend",`
            <input type="button" id="${categoria.value}" class="botonFiltro" value="${categoria.value}">
        `);



        categoria.value = ""
        console.log(categoriasFiltro)

        localStorage.setItem("categorias", JSON.stringify(categoriasFiltro));

        

    }
})

function buscar(category) {
    let result = categoriasFiltro.find(element => element.nombre === category)
    return result
} 

mandar.addEventListener("click", ()=>{
    

    if (nombreTarea.value && tipoTarea.value != "") {
        
        console.log(nombreTarea.value);
        console.log(tipoTarea.value);
        console.log(accionableTarea.checked);

        let string = tipoTarea.value

        let cat = buscar(string)

        tareas.push(new Task(nombreTarea.value, tipoTarea.value, accionableTarea.checked, cat))
        createTask(tareas[tareas.length-1])

        nombreTarea.value = ""
        tipoTarea.value = ""
        accionableTarea.checked = false;

    } else {

        alert("Llene todos los campos antes de enviar")

    }
    localStorage.setItem("tareas", JSON.stringify(tareas))
})

  filtro.addEventListener("click", function(event) {
    if (event.target.classList.contains(`botonFiltro`)) {
        console.log(event.target.value)
        display(event.target.value)
    }
    event.stopPropagation()
  })

function deleteTask(tarea) {
    var tareaIndex = tareas.findIndex(t => t.nombre === tarea);
    if (tareaIndex !== -1) {
        tareas.splice(tareaIndex, 1);
        var divIndex = divs.findIndex(d => d.nombre === tarea);
        if (divIndex !== -1) {
            divs[divIndex].elemento.remove();
            divs.splice(divIndex, 1);
            localStorage.removeItem("tareas")
            localStorage.setItem("tareas", JSON.stringify(tareas))
            if (tareas == null) {
                tareas = []
            }
        }
    }
}

tasksContainer.addEventListener("click", function(event){
    if (event.target.classList.contains(`boton`)) {
        deleteTask(event.target.id)
    }
    event.stopPropagation()
})

window.addEventListener("load", ()=>{
    let storedTareas = localStorage.getItem("tareas")
    tareas = JSON.parse(storedTareas)

    if (tareas == null) {
        tareas = []
    }

    tareas.forEach((tarea)=>{
        createTask(tarea)
    })

    let storedCategorias = localStorage.getItem("categorias");
    categoriasFiltro = JSON.parse(storedCategorias);

    if (categoriasFiltro == null) {
        categoriasFiltro = []
        categoriasFiltro[0] = new Categoria("Todas")
        categoriasFiltro[1] = new Categoria("Sin Categoria")
    }

    if (categoriasFiltro.length > 2) {
        for (let i = 0; i < categoriasFiltro.length; i++) {
            if (i+2 != undefined) {
                tipoTarea.insertAdjacentHTML("beforeend",`<option value="${categoriasFiltro[i+2].nombre}" id="${categoriasFiltro[i+2].nombre}"> ${categoriasFiltro[i+2].nombre} </option>`);
                filtro.insertAdjacentHTML("beforeend",`
                <input type="button" id="${categoriasFiltro[i+2].nombre}" class="botonFiltro" value="${categoriasFiltro[i+2].nombre}">
                `);
            } else {
                console.log("terminado")
            }
        }
    }

})


console.log(tareas)

