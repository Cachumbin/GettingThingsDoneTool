const mandar = document.getElementById("submit");
const container = document.getElementById("container");
const nombreTarea = document.getElementById("nombreTarea");
const tipoTarea = document.getElementById("tipoTarea");
const accionableTarea = document.getElementById("accionableTarea");
const mandar2 = document.getElementById("submit2");
const categoria = document.getElementById("categoria");
const filtro = document.getElementById("filtro");
const tasksContainer = document.getElementById("tasks");
const noTarea = document.getElementById("noTarea");

let nuevoNombre;
let tareas = [];
let accion;
let categoriasFiltro = [];
categoriasFiltro[0] = new Categoria("Todas")
categoriasFiltro[1] = new Categoria("Sin Categoria")
let divs = [];
let categoriaDivs = [];



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
        <input type="button" class="botonEditar" value="Editar" id="${tarea.nombre}">
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

function createCategory(nombre) {
    tipoTarea.insertAdjacentHTML("beforeend",`<option value="${nombre}" id="${nombre}Opcion"> ${nombre} </option>`);
    filtro.insertAdjacentHTML("beforeend",`
        <input type="button" id="${nombre}" class="botonFiltro" value="${nombre}">
    `);
    categoriaDivs.push(document.getElementById(`${nombre}`))
}
  
mandar2.addEventListener("click", ()=>{
    if (categoria.value == "") {

        alert("Llene todos los campos antes de enviar")
        
    } else {
        categoriasFiltro.push(new Categoria(categoria.value))
        console.log(categoria.value);
        
        createCategory(categoria.value)
        

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
        for (let i = 0; i < categoriasFiltro.length; i++) {
            if (categoriasFiltro[i].nombre === event.target.value) {
                categoriaDivs[i].classList.add('activo')
            } else {
                categoriaDivs[i].classList.remove('activo')
            }
        }
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

tasksContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains(`botonEditar`)) {
        nuevoNombre = prompt("Introduce el nuevo nombre de la tarea")
        console.log(nuevoNombre)
        var tareaIndex2 = tareas.findIndex(t => t.nombre === event.target.id);
        if (tareaIndex2 !== -1) {
            var divIndex2 = divs.findIndex(d => d.nombre === event.target.id);
            if (divIndex2 !== -1) {
                console.log(tareas[tareaIndex2], divs[divIndex2])
                console.log(tareas[tareaIndex2].nombre, divs[divIndex2].nombre)
                tareas[tareaIndex2].nombre = nuevoNombre;
                divs[divIndex2].nombre = nuevoNombre;
                console.log(tareas[tareaIndex2].nombre, divs[divIndex2].nombre)
                divs[divIndex2].elemento.innerHTML = `
                <p>${tareas[tareaIndex2].nombre}</p>
                <p>Categoria: ${tareas[tareaIndex2].area}</p>
                <p>Es accionable: ${accion}</p>
                <input type="button" class="boton" value="Completada" id="${tareas[tareaIndex2].nombre}">
                <input type="button" class="botonEditar" value="Editar" id="${tareas[tareaIndex2].nombre}">
            `
            }
        }
        console.log(event.target.id)
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
        categoriaDivs.push(document.getElementById("Todas"))
        categoriaDivs.push(document.getElementById("Sin_Categoria"))
        for (let i = 0; i < categoriasFiltro.length; i++) {
            if (i+2 != undefined) {
                createCategory(categoriasFiltro[i+2].nombre);
            } else {
                console.log("terminado")
            }
        }
    }
})



console.log(tareas)

