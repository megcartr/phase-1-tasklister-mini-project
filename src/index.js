document.addEventListener("DOMContentLoaded", () => {
    buildTaskLister()
  })

let taskObjArr = []

function buildTaskLister(){
    document.getElementById("create-task-form").addEventListener('submit', handleFormSubmit)
    document.getElementById("sort-tasks").addEventListener("change", sortTasks)
}

function handleFormSubmit(e) {
    e.preventDefault()
    const task = e.target["new-task-description"].value
    const priorityLevel = parseInt(e.target.priority.value)
    
    const taskObj = {task, priorityLevel}
    taskObjArr.push(taskObj)

    sortTasks()
    displayTasks()
}

function displayTasks() {
    const taskUl = document.getElementById("tasks")
    taskUl.innerHTML = ""

    taskObjArr.forEach((task) => {
        const taskLi = document.createElement("li")
        const deleteBtn = document.createElement("button")

        deleteBtn.textContent = "x"
        deleteBtn.addEventListener("click", (e) => deleteTask(e, task))

        taskLi.textContent = task.task + " "
        taskLi.style.color = getPriorityColor(task.priorityLevel)
        taskLi.appendChild(deleteBtn)
        taskUl.appendChild(taskLi)
    })
}

function deleteTask(e, task) {
    taskObjArr = taskObjArr.filter((element) => element.task !== task.task)
    e.target.parentNode.remove()
}

function getPriorityColor(priorityLevel) {
    if (priorityLevel === 1) {
        return "red"
    } else if (priorityLevel === 2) {
        return "blue"
    } else {
        return "purple"
    }
}

function sortTasks() {
    const sortTasksSelect = document.getElementById("sort-tasks")
    if (sortTasksSelect.value === "H-L") {
        taskObjArr.sort((a, b) => a.priorityLevel - b.priorityLevel)
    } else {
        taskObjArr.sort((a, b) => b.priorityLevel - a.priorityLevel)
    }
    displayTasks()
}