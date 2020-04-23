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
      description:
        'Lorem bidule hipster Quaestione igitur per multiplices dilatata fortunas cum ambigerentur quaedam, non nulla levius actitata constaret, post multorum clades Apollinares',
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
        'Un bon starter pack pour un projet Node secure. lorem azeiohazeazuidasd zjkzgnfqe fef ef bqkzn <a href="http://google.com">Lien pour tester</a>',
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
      _id: 5,
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
      _id: 6,
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
