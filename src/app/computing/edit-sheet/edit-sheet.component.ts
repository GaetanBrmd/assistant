import { Component, OnInit, Input } from '@angular/core';
import { TypeService } from '../type.service';
import { Sheet } from '../sheet.model';
import { SheetService } from '../sheet.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-sheet',
  templateUrl: './edit-sheet.component.html',
  styleUrls: ['./edit-sheet.component.scss'],
})
export class EditSheetComponent implements OnInit {
  @Input() clickedSheet: Sheet;

  constructor(
    private typeService: TypeService,
    private sheetService: SheetService
  ) {}

  ngOnInit(): void {}

  getBG(type: string) {
    return this.typeService.getBgColor(type);
  }
  getColor(type: string) {
    return this.typeService.getColor(type);
  }
  getIcon(type: string) {
    return this.typeService.getIcon(type);
  }
  getTypes() {
    return this.typeService.getTypes();
  }

  onEdit(form: NgForm) {
    console.log('contenu', form.value['contenu']);
    this.sheetService
      .editSheet(
        this.clickedSheet._id,
        form.value['titre'],
        form.value['description'],
        form.value['type'],
        form.value['contenu']
      )
      .then((res: Sheet) => {
        this.clickedSheet = res;
        this.sheetService.emitSheetSubject();
      });
  }

  onDel() {
    //alert('On supprime !');
    this.sheetService.deleteSheet(this.clickedSheet._id);
    this.clickedSheet = new Sheet(
      'Supprimé',
      'Cet élément a été supprimé !',
      'angular',
      '-1'
    );
  }
}
