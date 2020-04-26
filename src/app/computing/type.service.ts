import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  typesSubject = new Subject<any[]>();
  private types = [
    {
      global: {
        lang: 'Global',
        icon: 'sourcetree',
        bg: '#007bff',
        color: 'white',
      },
      bash: {
        lang: 'Bash',
        icon: 'slack',
        bg: '#f8f9fa',
        color: 'dark',
      },
      python: {
        lang: 'Python',
        icon: 'python',
        bg: '#ffc107',
        color: 'white',
      },
      git: {
        lang: 'Git',
        icon: 'git',
        bg: '#111',
        color: 'white',
      },
      nodejs: {
        lang: 'NodeJS',
        icon: 'nodejs',
        bg: '#28a745',
        color: 'white',
      },
      angular: {
        lang: 'Angular',
        icon: 'angularjs',
        bg: '#dc3545',
        color: 'white',
      },
      c: {
        lang: 'C',
        icon: 'c',
        bg: '#6c757d',
        color: 'white',
      },
      java: {
        lang: 'Java',
        icon: 'java',
        bg: '#17a2b8',
        color: 'white',
      },
      sql: {
        lang: 'SQL',
        icon: 'mysql',
        bg: '#6f42c1',
        color: 'white',
      },
    },
  ];

  constructor() {}

  emitTypeSubject() {
    this.typesSubject.next(this.types.slice());
  }

  getTypes() {
    return this.types[0];
  }

  getBgColor(type: string) {
    return this.types[0][type].lang;
  }

  getColor(type: string) {
    return this.types[0][type].color;
  }

  getIcon(type: string) {
    return this.types[0][type].icon;
  }
}
