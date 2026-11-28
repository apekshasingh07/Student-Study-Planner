// Student Study Planner

const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskSubject = document.getElementById("taskSubject");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

//Load previously saved tasks 
let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

// Save tasks in brower storage 
function saveTasks() {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// Display tasks ont the webpage 
function updateStats() {
    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;
    const pending = total - completed;
    const progress = total === 0 
        ? 0 
        : Math.round((completed / total) * 100);

document.getElementById("totalTasks").textContent = total;

document.getElementById("completedTasks").textContent = completed;

document.getElementById("pendingTasks").textContent = pending;

document.getElementById("progressFill").style.width = progress + "%";

document.getElementById("progressText").textContent = progress + "% completed";

}

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task, index)  
    {

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const span = document.createElement("span");
        span.textContent = task.text;

    
        if (task.completed) {
            span.style.textDecoration = "line-through";

        }

        const details = document.createElement("small");
        details.textContent = 
            " | Subject : " + 
        (task.sunject || "Unassigned") + 
            " | Due: " + (task.date || 
        "No deadline");

    
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        //Mark task as completed

        checkbox.addEventListener("change", 
        function()  {
            task[index].completed = 
        checkbox.checked;
            saveTasks();
            displayTasks();
        });

        //Delete task

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });

    updateStats();
}   

//Add new task
addTaskButton.addEventListener("click", function() {
    const taskText = taskInput.value.trim();
    const dueDate = taskDate.value;
    const selectedSubject = taskSubject.value;

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    if (selectedSubject === "") {
       alert("Please select a subject!");
       return;
    }

    if (dueDate === "") {
        alert ("Please aelect a deadline!");
        return;
    }

    tasks.push({ text: taskText,
                 subject: selectedSubject,
                 date: dueDate,
                 completed: false 
    });
    
    saveTasks();
    
    taskInput.value = "";
    taskDate.value = "";
    taskSubject.value = "";

    displayTasks(); 
});

//Display saved tasks when the page opens
displayTasks();

//Subject management

const subjectInput = document.getElementById("subjectInput");
const addSubjectButton = document.getElementById("addSubjectButton");
const subjectContainer = document.getElementById("subjectContainer");

//Load saved subjects
let subjects = JSON.parse(localStorage.getItem("mySubjects")) || [
    "Programming",
    "Mathematics",
    "Digital Electronics",
];

// Save subjects
function saveSubjects() {
    localStorage.setItem("mySubjects", JSON.stringify(subjects));
}

// Fill Subject Dropdown

function populateTaskSubjects()  {
     
    taskSubject.innerHTML = "";

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a subject";

    taskSubject.appendChild(defaultOption);

        subjects.forEach(function(subject)
{

            const option = document.createElement("option");

            option.value = subject;
            option.textContent = subject;

    taskSubject.appendChild(option);

        });       
}

//Display subjects
function displaySubjects() {

    subjectContainer.innerHTML = "";

    subjects.forEach(function(subject, index) {

        const card = document.createElement("div");
        card.className = "subject-card";    

        const heading = document.createElement("h3");
        heading.textContent = subject;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            subjects.splice(index, 1);
            saveSubjects();
            displaySubjects();
        });

        card.appendChild(heading);
        card.appendChild(deleteButton);

        subjectContainer.appendChild(card);
    });

    populateTaskSubjects();

}

//Add new subject
addSubjectButton.addEventListener("click", function() {

    const subjectName = subjectInput.value.trim();

    if (subjectName === "") {
        alert("Please enter a subject!");
        return;
    }

    if (subjects.some(function(subject)
{
        return subject.toLowerCase() 
        === subjectName.toLowerCase();
    })) {
        alert("This subject already exists!");
        return;
    }

    subjects.push(subjectName);

    saveSubjects();
    subjectInput.value = "";

    displaySubjects();
});

//Display saved subjects 
displaySubjects();
displayTasks();