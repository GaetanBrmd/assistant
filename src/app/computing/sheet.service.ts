import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Sheet } from './sheet.model';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  sheetsSubject = new Subject<Sheet[]>();
  private sheets: Sheet[] = [
    {
      _id: 0,
      titre: 'Basics',
      description: 'Lorem bidule hipster',
      type: 'git',
    },
    {
      _id: 1,
      titre: 'Starter',
      description: 'Un bon starter pack pour un projet Node secure.',
      type: 'nodejs',
    },
    {
      _id: 2,
      titre: 'Select',
      description:
        'Un bon starter pack pour un projet Node secure. lorem azeiohazeazuidasd zjkzgnfqe fef ef bqkzn',
      type: 'sql',
    },
    {
      _id: 3,
      titre: 'Ng Server',
      description:
        'Quaestione igitur per multiplices dilatata fortunas cum ambigerentur quaedam, non nulla levius actitata constaret, post multorum clades Apollinares ambo pater et filius in exilium acti cum ad locum Crateras nomine pervenissent, villam scilicet suam quae ab Antiochia vicensimo et quarto disiungitur lapide, ut mandatum est, fractis cruribus occiduntur.',
      type: 'angular',
    },
    {
      _id: 4,
      titre: 'Printing',
      description:
        'Dein Syria per speciosam interpatet diffusa planitiem. hanc nobilitat Antiochia, mundo cognita civitas, cui non certaverit alia advecticiis ita adfluere copiis et internis, et Laodicia et Apamia itidemque Seleucia iam inde a primis auspiciis florentissimae.',
      type: 'python',
    },
    {
      _id: 5,
      titre: 'Interface',
      description:
        'Nemo quaeso miretur, si post exsudatos labores itinerum longos congestosque adfatim commeatus fiducia vestri ductante barbaricos pagos adventans velut mutato repente consilio ad placidiora deverti.',
      type: 'java',
    },
    {
      _id: 6,
      titre: 'Scripting avancé',
      description:
        'Nemo quaeso miretur, si post exsudatos labores itinerum longos congestosque adfatim commeatus fiducia vestri ductante barbaricos pagos adventans velut mutato repente consilio ad placidiora deverti.',
      type: 'bash',
    },
    {
      _id: 7,
      titre: 'Bidule',
      description: `<h1>Titre </h1> 
<pre><code class="language-typescript">emitSheetSubject() {
  this.sheetsSubject.next(this.sheets.slice('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
}</code></pre>`,
      type: 'c',
    },
  ];

  constructor() {}

  emitSheetSubject() {
    this.sheetsSubject.next(this.sheets.slice());
  }

  addSheet(titre: string, description: string, type: string) {
    const newSheet: Sheet = new Sheet(
      this.sheets.length,
      titre,
      description,
      type
    );
    this.sheets.push(newSheet);
    this.emitSheetSubject();
  }

  editSheet(id: number, titre: string, description: string, type: string) {
    for (let s of this.sheets) {
      if (s._id === id) {
        if (titre !== '') s.titre = titre;
        if (type !== '') s.type = type;
        if (description !== '') s.description = description;
        this.emitSheetSubject();
        return s;
      }
    }
  }

  deleteSheet(id: number) {
    this.sheets = this.sheets.filter(function (value, index, arr) {
      return value._id !== id;
    });
    this.emitSheetSubject();
  }
}
