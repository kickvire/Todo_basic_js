//Select the Elements
const clear = document.querySelector(".clear");
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//create variables

let LIST = [],
  id = 0;

//get item from localstorage
let data = localStorage.getItem("TODO");

//check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//clear the local storage

clear.addEventListener("click", function () {
  localStorage.clear();
  window.location.reload();
});
//show todays date
const today = new Date();
date.innerHTML = today.toLocaleDateString();

//add to do function
function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  } //already in trashed then jst return;
  const DONE = done ? CHECK : UNCHECK; //to check it is completed or not if completed then check icon otherwise circle
  const LINE = done ? LINE_THROUGH : " "; //to check it is completed or not if completed then line through otherwise nothing
  const item = `<li class="item">
                   <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                   <p class="text ${LINE}">${toDo}</p>
                   <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li> `;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}
//add an item to the list when user hit the enter key

document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    const toDo = input.value;
    //if the input is not empty
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      });
      //add item to localstorage(this is the code must be added where the list array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));
      id++;
    }
    //clear the input value for new input
    input.value = "";
  }
});

//complete to do
//here element is clicked element
function completeToDo(element) {
  element.classList.toggle(CHECK); //toggle the last check
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

list.addEventListener("click", function (event) {
  const element = event.target; //clicked element
  const elementJob = element.attributes.job.value; //complete or delete

  if (elementJob === "complete") {
    completeToDo(element);
  } else if (elementJob === "delete") {
    removeToDo(element);
  }
  // add item to localstorage(this is the code must be added where the list array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
