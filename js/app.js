//SELECTOR
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
//LISTENER
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deletecheck)
filterOption.addEventListener("input",filterTodo)
//FUNCTION
function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li")
    newTodo.innerText=todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //CHECK BUTTON
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //DELETE BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //ADD TO DO
    todoList.appendChild(todoDiv)
    todoInput.value="";

}
function deletecheck(event) {
    const item = event.target;
    //DELETE
    if (item.classList[0] === "trash-btn") {
        item.parentElement.remove();
    }
    //CHECK
    if (item.classList[0] === "complete-btn") {
        item.parentElement.classList.toggle("completed");
    }
}