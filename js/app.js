// UI Elements:
const menu = document.querySelector("[data-menu]"),
  menuClose = document.querySelector("[data-close]"),
  themes = document.querySelector("[data-selectItems]"),
  list = document.querySelector("[data-list]");
const form = document.forms["todoForm"];

// Events
menuClose.addEventListener("click", showThemesMenu);
themes.addEventListener("click", switchThemeHandler);
form.addEventListener("submit", createTaskHandler);
list.addEventListener("click", deleteTask);

function showThemesMenu(e) {
  e.target.classList.toggle("open");
  e.target.classList.contains("open")
    ? (document.querySelector("body").style.transform = `translateX(200px)`)
    : (document.querySelector("body").style.transform = `translateX(0px)`);
}

function switchThemeHandler(e) {
  let chosenTheme = Object.entries(e.target.dataset)[0][0];
  localStorage.setItem("currentTheme", chosenTheme);
  setTheme();
}

setTheme();
function setTheme() {
  const currentTheme = localStorage.getItem("currentTheme");
  const selectedTheme = state.themes[currentTheme];
  Object.entries(selectedTheme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}

function listItemTemplate({ _id, title, text }) {
  const li = document.createElement("li");
  li.classList.add("task");
  li.setAttribute("data-set-id", _id);
  const h3 = document.createElement("h3");
  h3.classList.add("taskName");
  h3.textContent = title;
  const p = document.createElement("p");
  p.classList.add("taskText");
  p.textContent = text;
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete task";
  deleteBtn.classList.add("taskDeleteBtn");
  li.appendChild(h3);
  li.appendChild(p);
  li.appendChild(deleteBtn);

  return li;
}

(function renderAllTasks() {
  const fragment = document.createDocumentFragment();
  state.tasks.map((task) => {
    const li = listItemTemplate(task);
    fragment.appendChild(li);
  });
  list.appendChild(fragment);
  renderAllLocalStorageTasks();
})();

function renderAllLocalStorageTasks() {
  const taskFromStorage = JSON.parse(localStorage.getItem("newTask"));
  const storeTask = listItemTemplate(taskFromStorage);
  list.appendChild(storeTask);
}

function createTaskHandler(e) {
  e.preventDefault();
  if (form.todoName.value === "" || form.todoText.value === "") {
    error()
  } else if (form.todoName.value && form.todoText.value !== "") {
    const taskObj = {
      _id: Date.now().toString(),
      title: form.todoName.value,
      text: form.todoText.value,
    };

    state.tasks.push(taskObj);
    localStorage.setItem("newTask", JSON.stringify(taskObj));
    const newTask = listItemTemplate(taskObj);
    list.insertAdjacentElement("afterbegin", newTask);
    form.reset();
  }
}
function deleteTask(e) {
  deleteTaskFromDOM(e);
  deleteTaskFromState(e);
}

function deleteTaskFromState(e) {
  const deleteItemId = e.target.parentElement.dataset.setId;
  let deleteTaskIndex;
  state.tasks.forEach((task, index) => {
    task._id === deleteItemId
      ? (deleteTaskIndex = index) + state.deletedTasks.push(task)
      : null;
  });
  const first = [...state.tasks].splice(0, deleteTaskIndex);
  const second = [...state.tasks].splice(deleteTaskIndex + 1);
  state.tasks = [...first, ...second];
}

function deleteTaskFromDOM(e) {
  e.target.classList.contains("taskDeleteBtn")
    ? e.target.parentElement.remove()
    : null;
}

function error() {
  const popup = document.querySelector("[data-errorPopup]");
  popup.style.visibility = 'visible';

  document.querySelector("[data-popup-btn]")
    .addEventListener('click', closePopup)
  document.querySelector("[data-popup-symbol]")
    .addEventListener('click', closePopup)

  function closePopup() {
    popup.style.visibility = 'hidden'
  }
}
/*

git --version
git config --global user.name "Ali Isaev"
git config --global user.email "ali1987isaev@gmail.com"

clear

git add "test.txt"
gitk
git status
git commit -m "New comment about this project"

git add *
git commit -m "... new comment..."

git log  (project history) ctrl+z (exit commit)

*/
