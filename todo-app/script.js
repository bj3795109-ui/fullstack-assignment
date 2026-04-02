document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
    const taskCount = document.getElementById('task-count');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('minimal-tasks')) || [];

    function saveTasks() {
        localStorage.setItem('minimal-tasks', JSON.stringify(tasks));
        updateTaskCount();
    }

    function updateTaskCount() {
        const remaining = tasks.filter(t => !t.completed).length;
        taskCount.textContent = `${remaining} task${remaining !== 1 ? 's' : ''}`;
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;

        li.innerHTML = `
            <label class="checkbox-wrapper">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="checkmark"></span>
            </label>
            <span class="task-text">${escapeHTML(task.text)}</span>
            <button class="delete-btn" aria-label="Delete task">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        `;

        // Toggle state logic
        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            li.classList.toggle('completed', task.completed);
            saveTasks();
        });

        // Deletion logic with animation
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            li.style.transform = 'scale(0.95)';
            li.style.opacity = '0';
            setTimeout(() => {
                tasks = tasks.filter(t => t.id !== task.id);
                li.remove();
                saveTasks();
            }, 300); // Wait for CSS transition
        });

        taskList.appendChild(li);
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            const newTask = {
                id: Date.now().toString(),
                text: text,
                completed: false
            };
            tasks.push(newTask);
            renderTask(newTask);
            saveTasks();
            taskInput.value = '';
            taskInput.focus();
        }
    }

    function init() {
        taskList.innerHTML = '';
        tasks.forEach(renderTask);
        updateTaskCount();
    }

    // Event Listeners
    addBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Prevent XSS
    function escapeHTML(str) {
        let div = document.createElement('div');
        div.innerText = str;
        return div.innerHTML;
    }

    // Initialize UI
    init();
});
