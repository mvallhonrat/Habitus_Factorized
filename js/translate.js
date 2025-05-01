export class Translator {
  constructor() {
    this.translations = {
      es: {
        'Nueva Semana': 'Nueva Semana',
        'Añadir': 'Añadir',
        'Histórico de Tareas': 'Histórico de Tareas'
      },
      en: {
        'Nueva Semana': 'New Week',
        'Añadir': 'Add',
        'Histórico de Tareas': 'Task History'
      }
    };
  }

  init() {
    const lang = navigator.language.startsWith('en') ? 'en' : 'es';
    this._translatePage(lang);
  }

  _translatePage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (this.translations[lang][key]) {
        el.textContent = this.translations[lang][key];
      }
    });
  }
}