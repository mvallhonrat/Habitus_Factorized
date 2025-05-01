export class DataManager {
  constructor(prefix) {
    this.prefix = prefix;
    this.roles = [];
    this.tasks = [];
    this.metrics = [];
    this.tasksLog = [];
    this.lastReviewText = '';
    this.lastResetTime = null;
  }

  key(k) { return `${this.prefix}_${k}`; }

  loadAll() {
    this.roles = this._load('roles') || [];
    this.tasks = this._load('tasks') || [];
    this.metrics = this._load('metrics') || [];
    this.tasksLog = this._load('tasksLog') || [];
    this.lastReviewText = this._load('lastReview') || '';
    this.lastResetTime = this._load('lastReset', 'int') || Date.now();
  }

  _load(name, type = 'json') {
    const raw = localStorage.getItem(this.key(name));
    if (!raw) return null;
    return type === 'int' ? parseInt(raw, 10) : JSON.parse(raw);
  }

  save(name, data) {
    const value = typeof data === 'string' ? data : JSON.stringify(data);
    localStorage.setItem(this.key(name), value);
  }
}