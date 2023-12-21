function addTask() { const task = document.getElementById("newTask").value; if (task) { const li = document.createElement("li"); const deleteBtn = document.createElement("button"); deleteBtn.innerHTML = "Удалить"; deleteBtn.onclick = function() { li.remove(); }; li.innerText = task; li.appendChild(deleteBtn); document.getElementById("taskList").appendChild(li); document.getElementById("newTask").value = ""; saveTasks(); } } function saveTasks() { const tasks = document.getElementById("taskList").innerHTML; localStorage.setItem("myTasks", tasks); } function clearTasks() { const list = document.getElementById("taskList"); while (list.firstChild) { list.removeChild(list.firstChild); } localStorage.removeItem("myTasks"); } function loadTasks() { const tasks = localStorage.getItem("myTasks"); if (tasks) { document.getElementById("taskList").innerHTML = tasks; const deleteBtns = document.querySelectorAll("#taskList button"); for (const deleteBtn of deleteBtns) { deleteBtn.onclick = function() { deleteBtn.parentNode.remove(); saveTasks(); }; } } } loadTasks(); 