document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('taskList');
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskCount = document.getElementById('taskCount');
  
    // Check if there are any tasks in local storage and load them
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach(function (task, index) {
        const li = document.createElement('li');
        li.innerHTML = `
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
          <span class="${task.completed ? 'task-completed' : ''}">${task.text}</span>
          <button class="deleteBtn">Delete</button>
        `;
        taskList.appendChild(li);
  
        // Add event listener to delete button
        const deleteBtn = li.querySelector('.deleteBtn');
        deleteBtn.addEventListener('click', function () {
          tasks.splice(index, 1);
          renderTasks();
          updateTaskCount();
          saveTasks();
        });
  
        // Add event listener to checkbox
        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', function () {
          task.completed = this.checked;
          renderTasks();
          updateTaskCount();
          saveTasks();
        });
      });
      updateTaskCount();
    }
  
    function addTask() {
      const text = newTaskInput.value.trim();
      if (text !== '') {
        tasks.push({ text, completed: false });
        newTaskInput.value = '';
        renderTasks();
        saveTasks();
      }
    }
  
    function updateTaskCount() {
      const remainingTasks = tasks.filter(task => !task.completed).length;
      taskCount.textContent = `${remainingTasks} ${remainingTasks === 1 ? 'task' : 'tasks'} remaining`;
    }
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    addTaskBtn.addEventListener('click', addTask);
  
    newTaskInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        addTask();
      }
    });
  
    renderTasks();
  });
  