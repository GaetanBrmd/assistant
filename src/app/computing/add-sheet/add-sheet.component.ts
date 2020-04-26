import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TypeService } from '../type.service';
import { SheetService } from '../sheet.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-sheet',
  templateUrl: './add-sheet.component.html',
  styleUrls: ['./add-sheet.component.scss'],
})
export class AddSheetComponent implements OnInit {
  types: any;
  typesSubscription: Subscription;

  constructor(
    private typeService: TypeService,
    private sheetService: SheetService
  ) {}

  ngOnInit(): void {
    this.typesSubscription = this.typeService.typesSubject.subscribe(
      (types: any) => {
        this.types = types;
      }
    );
    this.typeService.emitTypeSubject();
  }

  onAdd(f: NgForm) {
    this.sheetService.addSheet(
      f.value['titre'],
      f.value['description'],
      f.value['type']
    );
  }
}
