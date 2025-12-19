const input = document.getElementById('todoInput');
const list = document.getElementById('todoList');

let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
let currentFilter = 'all';

function saveToLocal() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks(currentFilter);
}

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && input.value.trim() !== "") {
        const now = new Date();
        const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth()+1).toString().padStart(2, '0')}.${now.getFullYear().toString().slice(-2)}, ${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        const newTask = {
            id: Date.now(),
            text: input.value,
            date: formattedDate,
            completed: false
        };
        
        tasks.push(newTask);
        input.value = "";
        saveToLocal();
    }
});

function renderTasks(filter = 'all') {
    currentFilter = filter;
    list.innerHTML = "";
    
    let filteredTasks = tasks;
    if (filter === 'active') filteredTasks = tasks.filter(t => !t.completed);
    if (filter === 'completed') filteredTasks = tasks.filter(t => t.completed);

    filteredTasks.forEach(task => {
        const li = document.createElement('li');

        if (!task.completed) {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.onclick = () => {
                task.completed = true;
                saveToLocal();
            };
            li.appendChild(checkbox);
        }

        const span = document.createElement('span');
        span.className = `task-text ${task.completed ? 'completed-text' : ''}`;
        span.textContent = task.text;
        
        span.ondblclick = () => {
            if (task.completed) return;
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = task.text;
            editInput.className = 'edit-input';
            
            li.replaceChild(editInput, span);
            editInput.focus();

            editInput.onblur = () => {
                task.text = editInput.value;
                saveToLocal();
            };
            
            editInput.onkeypress = (e) => {
                if (e.key === 'Enter') editInput.blur();
            };
        };

        const dateSpan = document.createElement('span');
        dateSpan.className = 'task-date';
        dateSpan.textContent = task.date;

        const delBtn = document.createElement('div');
        delBtn.className = 'delete-btn';
        delBtn.textContent = 'X';
        delBtn.onclick = () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveToLocal();
        };

        li.appendChild(span);
        li.appendChild(dateSpan);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}


renderTasks();