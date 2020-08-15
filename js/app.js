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
  if(!document.querySelector('[data-add-task]').classList.contains('disabled')) {
    const closePopup= ()=> popup.style.visibility = 'hidden';
    const popup = document.querySelector("[data-errorPopup]");
    popup.style.visibility = 'visible';

    document.querySelector("[data-popup-btn]").addEventListener('click', closePopup)
    document.querySelector("[data-popup-symbol]").addEventListener('click', closePopup)
  }
}

// Registration is activated. Adding classes:
document.querySelector('[data-add-task]').classList.add('disabled');
document.querySelector('.addTask_text').classList.add('disabled');

// Register form events and functions:
(function (){
  const registrationPopup = document.querySelector('.registrationForm-bg');
    // Todo-List activation function and events:
    function removeDisabled() {
      document.querySelector('.addTask_text').classList.remove('disabled');
      document.querySelector('[data-add-task]').classList.remove('disabled');
      document.querySelector('[data-add-task]').classList.add('active');
      registrationPopup.style.visibility = 'hidden';
    }
    // Registration form activation. Events:
    document.querySelector('[data-add-task]').addEventListener('click', ()=> {
      document.querySelector('[data-add-task]').classList.contains('disabled')
       ? registrationPopup.style.visibility = 'visible' : null;
    })
  
  ///////////////////////////////////////////////
  // check length input:
  function checkLength(input, min, max) {
    if (input.value.length < min) {
      showError(input, `${firstLetter(input)} must not be less than ${min} characters`);
    } else if (input.value.length > max) {
      showError(input, `${firstLetter(input)} must be no more than ${max} characters`);
    } else {
      showSuccess(input);
    }
  }

  // error & success functions:
  function showError(input, message) {
    const parentEl = input.parentElement;
    parentEl.classList.remove("success");
    parentEl.classList.add("error");
    const small = parentEl.querySelector("small");
    small.innerText = message;
  }
  function showSuccess(input) {
    const parentEl = input.parentElement;
    parentEl.classList.remove("error");
    parentEl.classList.add("success");
  }

  // first letter to uppercase function:
  function firstLetter(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }

  // passwords identity check function:
  function comparePasswods(input1, input2) {
    if (input1.value !== input2.value) {
      showError(input2, `${firstLetter(input2)} is not valid`);
    }
  }

  // email validation function:
  function validateEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(input.value).toLowerCase())) {
      showSuccess(input);
    } else {
      showError(input, `${firstLetter(input)} is not valid`);
    }
  }

  // UI elements:
  const formSubmit = document.querySelector('[data-registration-form]'),
    username = document.querySelector("[data-userName]"),
    email = document.querySelector("[data-userEmail]"),
    password = document.querySelector("[data-userPassword]"),
    passwordConfirm = document.querySelector("[data-userPasswordConfirm]"),
    formFields = document.querySelectorAll('.formFields');

  // Checking registration form and activation Todo-List:
  function todoListActivated(e){  
      formFields[0].classList.contains('success') 
      && formFields[1].classList.contains('success') 
      && formFields[2].classList.contains('success') 
      && formFields[3].classList.contains('success')
      && document.querySelector('[data-add-task]').classList.contains('disabled')
        ? removeDisabled()
        : console.error('Form validation error');
  }

  // Form events:
  formSubmit.addEventListener("submit", (e) => {
    e.preventDefault();

    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkLength(passwordConfirm, 6, 25);
    comparePasswods(password, passwordConfirm);
    validateEmail(email);
    todoListActivated(e);
  });
})()

