import { DataManager } from './storage.js';
import { UI } from './ui.js';
import { ChartManager } from './charts.js';
import { Translator } from './translate.js';

window.addEventListener('DOMContentLoaded', () => {
  const dm = new DataManager('habitus');
  const ui = new UI(dm);
  const charts = new ChartManager(dm);
  const translator = new Translator();

  translator.init();
  dm.loadAll();
  ui.init();
  charts.init();
});