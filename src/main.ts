import './style.css'
import { v4 } from 'uuid'
import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'
// seleccionamos el form
const taskForm = document.querySelector<HTMLFormElement>('#taskForm')
// seleccionaremos el div donde dejaremos la lista de elementos
const taskList = document.querySelector<HTMLDivElement>('#taskList')

interface Task {
  id: string,
  title: string
  description: string,
}
let task: Task[] = []
if (taskForm != null) {
  // guardamos los valores obtenidos de los imputs
  const saveTask = (e: Event) => {
    e.preventDefault()

    const taskTitle = taskForm['title'] as unknown as HTMLInputElement

    const taskArea = taskForm['description'] as unknown as HTMLTextAreaElement

    // guardaremos los valores en un arreglo
    task.push({
      title: taskTitle.value,
      description: taskArea.value,
      id: v4()
    })
    // luego lo guardo dentro del localStorage
    localStorage.setItem('task', JSON.stringify(task))

    Toastify({
      text: 'Tarea guardada'
    }).showToast()

    renderTask(task) // renderizamos la lista de tareas
    // limpiamos los inputs
    taskForm.reset()
    taskTitle.focus()
  }
  taskForm?.addEventListener('submit', saveTask)
}

//accion Eliminar del boton
const deleteTask = function () {
  const index = task.findIndex((t) => t.id === task.id)

  task.splice(index, 1)
  localStorage.setItem('task', JSON.stringify(task))
  Toastify({
    text: 'Tarea eliminada'
  }).showToast()
  
  renderTask(task)

}


const renderTask = (task: Task[]) => {
  taskList!.innerHTML = ''

  task.forEach(task => {

    // usaremos selectores de elementos para crear los elementos dinamicamente
    const taskElement = document.createElement('div')
    const header = document.createElement('header')
    const title = document.createElement('span')
    const description = document.createElement('p')
    const deleteButton = document.createElement('button')

    taskElement.className = 'bg-zinc-900 mb-1 p-4 rounded-lg hover:bg-zinc-800 hover: cursor-pointer'
    deleteButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg'
    header.className = 'flex justify-between'


    title.innerText = task.title
    description.innerText = task.description
    deleteButton.innerText = '❌'

    deleteButton.addEventListener('click', deleteTask)

    header.appendChild(title)
    header.appendChild(deleteButton)
    taskElement.appendChild(header)
    taskElement.appendChild(description)
    taskList?.append(taskElement)
  })
}

// parseamos los valores del localstorage y y guardamos en el array
const loader = () => {
  task = JSON.parse(localStorage.getItem('task') || '[]')
  renderTask(task)
}

// vamos a crear un evento que se dispare o ejecute cuando la pagina haga un Reload
document.addEventListener('DOMContentLoaded', loader)


