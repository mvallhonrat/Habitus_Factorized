import Chart from 'https://cdn.jsdelivr.net/npm/chart.js';

export class ChartManager {
  constructor(dm) {
    this.dm = dm;
  }

  init() {
    this._renderQuadrant();
    this._renderCompletion();
  }

  _createChart(ctxId, config) {
    const ctx = document.getElementById(ctxId).getContext('2d');
    return new Chart(ctx, config);
  }

  _renderQuadrant() {
    const data = this._computeQuadrantData();
    this._createChart('quadrantChart', {
      type: 'doughnut',
      data,
      options: { responsive: true }
    });
  }

  _renderCompletion() {
    const data = this._computeCompletionData();
    this._createChart('completionChart', {
      type: 'bar',
      data,
      options: { responsive: true }
    });
  }

  _computeQuadrantData() {
    // TODO: implement actual quadrant logic (Eisenhower matrix)
    return {
      labels: ['Importante', 'Urgente', 'Evitable', 'No Importante'],
      datasets: [{ data: [0, 0, 0, 0] }]
    };
  }

  _computeCompletionData() {
    const done = this.dm.tasks.filter(t => t.done).length;
    const total = this.dm.tasks.length;
    return {
      labels: ['Completadas', 'Pendientes'],
      datasets: [{ data: [done, total - done] }]
    };
  }
}