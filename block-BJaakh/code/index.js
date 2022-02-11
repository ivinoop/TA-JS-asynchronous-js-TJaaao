let rootElm = document.querySelector('.todo-container');
let inputBar = document.createElement('.input');
const url = 'https://sleepy-falls-37563.herokuapp.com/api/todo';

function createUI(allTodos) {
  rooElm.innerHTML = '';
  allTodos.forEach((todo) => {
    let li = document.createElement('li');
    li.classList.add('list-items', 'flex', 'jsb', 'aic');

    let checkbox = document.createElement('input');
    input.type = 'checkbox';
    let taskName = document.createElement('p');
    let deleteTask = document.createElement('span');
    deleteTask.innerText = '❌';

    li.append(checkbox, taskName, deleteTask);
    rootElm.append(li);
  })
}
