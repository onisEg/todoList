
/*
- cauth varuble
- make funtion print input value in array 
- consol this array 
- make function ( make opject - push to array - add task to localstoreg )
- make function ( loop on array and add in tasks - if task done put classname done   )
- check if theres tasks in local storage and call displey tasks in form 
- click on task Element 
- Delete Button
- remove task from local storage
- remove element from page
- task element done or not
- toggle done class
- toggle completed for the task 
- make function delet with id 

*/


let inputTask = document.querySelector("[type='text']");
let addTask = document.querySelector("[type= 'submit']");
let tasksDiv = document.querySelector(".tasks");
let deleteBtn = document.querySelector(".del");
let delTask = document.querySelector(".del");
let editBtn = document.querySelector(".edit")
let done = document.querySelector(".toDoDone span")
let progress = document.querySelector(".progress span")


var DoneCount = 0;





let tasksOfArray = []
// make onclick function
addTask.onclick = function (e) {
    e.preventDefault();
    if (addTask.value == "add") {
        if (inputTask.value != "") {
            addTaskToArray(inputTask.value)
            // console.log(inputTask.value);
            setTasksToLocalStorage()
            addTaskToForm()
        }
        inputTask.value = ""

    } else {
        if (inputTask.value != "") {
            tasksOfArray[currentIndex].title = inputTask.value;
            setTasksToLocalStorage(tasksOfArray)
            addTaskToForm(tasksOfArray)
        }
        addTask.value = "add";
        inputTask.value = ""
    }
}

function addTaskToArray(taskTitle) {
    const task = {
        title: taskTitle,
        completed: false,
        id: Date.now(),
    }
    tasksOfArray.push(task)

}

function addTaskToForm() {

    tasksDiv.innerHTML = ""
    tasksOfArray.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        if (task.completed === true) {
            div.className = "task done"
        }
        div.setAttribute("data-id", task.id)
        let p = document.createElement("p")
        p.appendChild(document.createTextNode(task.title))
        div.appendChild(p)


        let iconsDiv = document.createElement("div");
        iconsDiv.className = "icons";
        div.appendChild(iconsDiv)

        let icon1 = document.createElement("i");
        icon1.className = "del fas fa-trash-alt";
        iconsDiv.appendChild(icon1);

        // icon1.addEventListener("click", (e) => {
        //     console.log(e.path[2].getAttribute("data-id"));
        //     tasksOfArray.slice(e.path[2].getAttribute("data-id"),1)
        // })

        let icon2 = document.createElement("i");
        icon2.className = "edit far fa-edit";
        iconsDiv.appendChild(icon2);

        let icon3 = document.createElement("i");
        icon3.className = "ok far fa-check-circle";
        iconsDiv.appendChild(icon3);

        iconsDiv.appendChild(icon1)
        iconsDiv.appendChild(icon2)
        iconsDiv.appendChild(icon3)

        tasksDiv.appendChild(div)

    })

}



// add Array to localStorage
function setTasksToLocalStorage() {
    window.localStorage.setItem("tasks", JSON.stringify(tasksOfArray))

}

if (localStorage.getItem("tasks")) {
    tasksOfArray = JSON.parse(localStorage.getItem("tasks"))
    addTaskToForm()

}


// make function delet with id 
function deleteTaskWith(taskId) {
    tasksOfArray = tasksOfArray.filter((task) => task.id != taskId)
    setTasksToLocalStorage(tasksOfArray)
}

// click on task Element 
tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        deleteTaskWith(e.target.parentElement.parentElement.getAttribute("data-id"));

        // // remove element from page
        e.target.parentElement.parentElement.remove()
        // console.log(e.target.parentElement.parentElement);
    }

    if (e.target.classList.contains("ok")) {
        // console.log(e.target.parentElement.parentElement.classList);
        e.target.parentElement.parentElement.classList.toggle("done")
        // e.target.classList.toggle("done");
        toggleStatusTaskWith(e.target.getAttribute("data-id"))

        if (e.target.parentElement.parentElement.classList.contains("done")) {
            DoneCount++;
            done.innerHTML = `Todo Done : ${DoneCount}`
            setTasksToLocalStorage(tasksOfArray)
        } else {
            DoneCount--;
            done.innerHTML = `Todo Done : ${DoneCount}`
            setTasksToLocalStorage(tasksOfArray)
        }

    }


    if (e.target.classList.contains("edit")) {
        edit(e.target.parentElement.parentElement.getAttribute("data-id"));

    }
})





function toggleStatusTaskWith(taskId) {
    for (i = 0; i < tasksOfArray.length; i++) {
        if (tasksOfArray[i].id == taskId) {
            tasksOfArray[i].completed == false ? tasksOfArray[i].completed = true : tasksOfArray[i].completed = false;
        }
    }
    setTasksToLocalStorage(tasksOfArray)
}


var currentIndex;
function edit(taskId) {
    console.log(taskId);
    let index;
    for (i = 0; i < tasksOfArray.length; i++) {
        if (tasksOfArray[i].id == taskId) {
            index = i
            break;
        }
    }
    inputTask.value = tasksOfArray[index].title;
    addTask.value = "edit";
    currentIndex = index;

}


/*
is'n complete >>
- Todo On Progress :>> not complet
- the numbers may be negtive 
- 
*/
