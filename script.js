// script.js

let taskList = [];

function addTask() {
  const taskText = document.getElementById("taskText").value.trim();
  const taskDateTime = document.getElementById("taskDateTime").value;

  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    datetime: taskDateTime,
    completed: false
  };

  taskList.push(task);
  document.getElementById("taskText").value = "";
  document.getElementById("taskDateTime").value = "";

  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  taskList.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const taskContent = document.createElement("div");
    taskContent.innerHTML = `<strong>${task.text}</strong><br><small>${task.datetime}</small>`;
    li.appendChild(taskContent);

    const actionDiv = document.createElement("div");
    actionDiv.className = "task-actions";

    // ✅ Complete Button
    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.onclick = () => toggleComplete(task.id);
    actionDiv.appendChild(completeBtn);

    // ✏️ Edit Button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTask(task.id);
    actionDiv.appendChild(editBtn);

    // 🗑️ Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(task.id);
    actionDiv.appendChild(deleteBtn);

    li.appendChild(actionDiv);
    list.appendChild(li);
  });
}

function toggleComplete(id) {
  taskList = taskList.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    taskList = taskList.filter(task => task.id !== id);
    renderTasks();
  }
}

function editTask(id) {
  const task = taskList.find(t => t.id === id);
  const newText = prompt("Edit Task Text:", task.text);
  const newDate = prompt("Edit Task Date & Time:", task.datetime);

  function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

  if (newText !== null && newDate !== null) {
    task.text = newText.trim();
    task.datetime = newDate;
    renderTasks();
  }
}
