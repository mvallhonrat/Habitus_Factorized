export class UI {
  constructor(dm) {
    this.dm = dm;
    this.elements = this._cacheElements();
    this._bindEvents();
  }

  init() {
    this._renderRoles();
    this._renderTasks();
    this._showLastReview();
  }

  _cacheElements() {
    return {
      roleSelect: document.getElementById('roleSelect'),
      newWeekBtn: document.getElementById('newWeekBtn'),
      taskInput: document.getElementById('taskInput'),
      addTaskBtn: document.getElementById('addTaskBtn'),
      taskList: document.getElementById('taskList'),
      lastReviewBox: document.getElementById('lastReviewBox'),
      lastReviewText: document.getElementById('lastReviewText'),
      showHistoryBtn: document.getElementById('showHistoryBtn'),
      historyModal: document.getElementById('historyModal')
    };
  }

  _bindEvents() {
    const { newWeekBtn, addTaskBtn, showHistoryBtn, taskInput } = this.elements;
    newWeekBtn.addEventListener('click', () => this._onNewWeek());
    addTaskBtn.addEventListener('click', () => this._onAddTask());
    taskInput.addEventListener('keyup', e => {
      if (e.key === 'Enter') this._onAddTask();
    });
    showHistoryBtn.addEventListener('click', () => this._onShowHistory());
  }

  _renderRoles() {
    const opts = this.dm.roles.map(r => `<option value="${r}">${r}</option>`).join('');
    this.elements.roleSelect.innerHTML = opts;
  }

  _renderTasks() {
    const items = this.dm.tasks.map((t, i) =>
      `<li data-id="${i}"><input type="checkbox" ${t.done ? 'checked' : ''}/><span>${t.title}</span></li>`
    ).join('');
    this.elements.taskList.innerHTML = items;
    this.elements.taskList.addEventListener('change', e => {
      if (e.target.matches('input[type="checkbox"]')) {
        const id = e.target.closest('li').dataset.id;
        this.dm.tasks[id].done = e.target.checked;
        this.dm.save('tasks', this.dm.tasks);
      }
    });
  }

  _showLastReview() {
    if (this.dm.lastReviewText.trim()) {
      this.elements.lastReviewBox.style.display = 'block';
      this.elements.lastReviewText.textContent = this.dm.lastReviewText;
    }
  }

  _onNewWeek() {
    if (confirm('¿Empezar una nueva semana? Se reiniciarán tareas y métricas.')) {
      this.dm.tasksLog.push(...this.dm.tasks);
      this.dm.tasks = [];
      this.dm.metrics = [];
      this.dm.lastResetTime = Date.now();
      this.dm.save('tasks', this.dm.tasks);
      this.dm.save('metrics', this.dm.metrics);
      this.dm.save('tasksLog', this.dm.tasksLog);
      this.dm.save('lastReset', this.dm.lastResetTime);
      this._renderTasks();
    }
  }

  _onAddTask() {
    const title = this.elements.taskInput.value.trim();
    if (!title) return;
    this.dm.tasks.push({ title, done: false, role: this.elements.roleSelect.value });
    this.dm.save('tasks', this.dm.tasks);
    this.elements.taskInput.value = '';
    this._renderTasks();
  }

  _onShowHistory() {
    const list = this.dm.tasksLog.map(t => `<div>${t.title}</div>`).join('');
    this.elements.historyModal.innerHTML = list;
    this.elements.historyModal.classList.remove('hidden');
  }
}