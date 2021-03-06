import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Sheet } from './sheet.model';
import { WebRequestService } from '../services/web-request.service';

@Injectable({
  providedIn: 'root',
})
export class SheetService {
  sheetsSubject = new Subject<Sheet[]>();
  private sheets: Sheet[] = []; /*= [
    {
      _id: '0',
      titre: 'Basics',
      description:
        'Lorem bidule hipster Quaestione igitur per multiplices dilatata fortunas cum ambigerentur quaedam, non nulla levius actitata constaret, post multorum clades Apollinares',
      type: 'git',
    },
    {
      _id: '1',
      titre: 'Starter',
      description: 'Un bon starter pack pour un projet Node secure.',
      type: 'nodejs',
    },
    {
      _id: '2',
      titre: 'Select',
      description:
        'Un bon starter pack pour un projet Node secure. lorem azeiohazeazuidasd zjkzgnfqe fef ef bqkzn <a href="http://google.com">Lien pour tester</a>',
      type: 'sql',
    },
    {
      _id: '3',
      titre: 'Ng Server',
      description:
        'Quaestione igitur per multiplices dilatata fortunas cum ambigerentur quaedam, non nulla levius actitata constaret, post multorum clades Apollinares ambo pater et filius in exilium acti cum ad locum Crateras nomine pervenissent, villam scilicet suam quae ab Antiochia vicensimo et quarto disiungitur lapide, ut mandatum est, fractis cruribus occiduntur.',
      type: 'angular',
    },
    {
      _id: '4',
      titre: 'Printing',
      description: `<pre><code class="language-python"># Multiplication table (from 1 to 10) in Python
num = 12
        
# To take input from the user
# num = int(input("Display multiplication table of? "))
        
# Iterate 10 times from i = 1 to 10
for i in range(1, 11):
  print(num, 'x', i, '=', num*i)</code></pre>`,
      type: 'python',
    },
    {
      _id: '5',
      titre: 'Interface',
      description: `<h1>Titre </h1> 
      <pre><code class="language-java">public class GCD {

        public static void main(String[] args) {
    
            int n1 = 81, n2 = 153, gcd = 1;
    
            for(int i = 1; i <= n1 && i <= n2; ++i)
            {
                // Checks if i is factor of both integers
                if(n1 % i==0 && n2 % i==0)
                    gcd = i;
            }
    
            System.out.printf("G.C.D of %d and %d is %d", n1, n2, gcd);
        }
}</code></pre>`,
      type: 'java',
    },
    {
      _id: '6',
      titre: 'Scripting avancé',
      description: `<h1>Titre </h1> 
<pre><code class="language-bash">#!/bin/bash
valid=true
count=1
while [ $valid ]
do
echo $count
if [ $count -eq 5 ];
then
break
fi
((count++))
done
</code></pre>`,
      type: 'bash',
    },
    {
      _id: '7',
      titre: 'Bidule',
      description: `<h1>Titre </h1>
<pre><code class="language-typescript">emitSheetSubject() {
  this.sheetsSubject.next(this.sheets.slice('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'));
}</code></pre>`,
      type: 'c',
    },
  ];*/
  appareils: Sheet[] = [];

  constructor(private webService: WebRequestService) {}

  emitSheetSubject() {
    this.sheetsSubject.next(this.sheets.slice());
  }

  addSheet(titre: string, description: string, type: string, contenu: string) {
    const newSheet: Sheet = new Sheet(titre, description, type, contenu);
    console.log("Envoi d'une nvl sheet", newSheet);
    this.webService.post('computing/sheet', newSheet).subscribe(
      (res: any) => {
        this.sheets.push(res);
        this.emitSheetSubject();
        console.log('Ajout réussi !');
      },
      (error) => {
        console.log("Erreur lors de l'ajout", error);
      }
    );
    this.emitSheetSubject();
  }

  editSheet(
    id: string,
    titre: string,
    description: string,
    type: string,
    contenu: string
  ) {
    let edit = {
      _id: id,
      ...(titre !== '' && { titre: titre }),
      ...(type !== '' && { type: type }),
      ...(description !== '' && { description: description }),
      ...(contenu !== '' && { contenu: contenu }),
    };
    console.log('Envoi pour la modif :', edit);

    return new Promise((resolve, reject) => {
      this.webService.patch('computing/sheet', edit).subscribe(
        (res: Sheet) => {
          console.log('Recu en réponse du back :', res);

          for (let i = 0; i < this.sheets.length; i++) {
            if (this.sheets[i]._id === res._id) {
              this.sheets[i] = res;
              break;
            }
          }

          this.emitSheetSubject();
          console.log('Maj réussi !');
          resolve(res);
        },
        (error) => {
          reject();
          console.log('Erreur lors de la maj', error);
        }
      );
    });
  }

  deleteSheet(id: string) {
    this.webService.post('computing/sheet/del', { _id: id }).subscribe(
      (res: any) => {
        this.sheets = this.sheets.filter((s) => {
          return s._id != id;
        });

        this.emitSheetSubject();
        console.log('Suppresion réussi !');
      },
      (error) => {
        console.log('Erreur lors de suppression', error);
      }
    );
    this.emitSheetSubject();
  }

  getSheets() {
    this.webService.get('computing/sheet').subscribe(
      (res: any[]) => {
        console.log('Chargement des fiches :', res);
        this.sheets = res;
        this.emitSheetSubject();
        console.log('Chargement réussi !');
      },
      (error) => {
        console.log('Erreur lors du chargement', error);
      }
    );
  }
}
