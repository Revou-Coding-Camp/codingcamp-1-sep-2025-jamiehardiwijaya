document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const dateInput = document.getElementById('date-input');
    const todoList = document.getElementById('todo-list');
    const filterInput = document.getElementById('filter-input');
    const deleteAllBtn = document.getElementById('delete-all');

    // Add Task
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const task = todoInput.value.trim();
        const date = dateInput.value;

        if (task && date) {
            addTodoItem(task, date);
            todoInput.value = '';
            dateInput.value = '';
        }
    });

    // Filter Tasks
    filterInput.addEventListener('input', function () {
        const filter = this.value.toLowerCase();
        const items = document.querySelectorAll('#todo-list li');

        items.forEach(item => {
            const text = item.querySelector('span').textContent.toLowerCase();
            item.style.display = text.includes(filter) ? '' : 'none';
        });
    });

    // Delete All Tasks
    deleteAllBtn.addEventListener('click', function () {
        if (confirm("Are you sure you want to delete all tasks?")) {
            todoList.innerHTML = '';
        }
    });

    // Add To-Do Item to the List
    function addTodoItem(task, date) {
        const li = document.createElement('li');

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';

        // Create task text
        const span = document.createElement('span');
        span.textContent = `${task} (Due: ${date})`;

        // Mark task as done/undone
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                span.classList.add('done');
            } else {
                span.classList.remove('done');
            }
        });

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => li.remove();

        // Append elements
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
    }
});
