import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Sheet } from '../sheet.model';
import { Subscription } from 'rxjs';
import { SheetService } from '../sheet.service';
import { TypeService } from '../type.service';
import { HighlightService } from '../highlight.service';

@Component({
  selector: 'app-cheatsheet',
  templateUrl: './cheatsheet.component.html',
  styleUrls: ['./cheatsheet.component.scss'],
})
export class CheatsheetComponent implements OnInit {
  sheets: Sheet[];
  sheetsSubscription: Subscription;
  types: any;
  typesSubscription: Subscription;

  clickedSheet: Sheet = {
    _id: 0,
    titre: '',
    description: '',
    type: 'global',
  };

  searchText: string;
  searchType: string[];
  filterApplied: boolean;

  highlighted: boolean = false;

  constructor(
    private sheetService: SheetService,
    private typeService: TypeService,
    private highlightService: HighlightService
  ) {
    this.searchType = [];
  }

  ngOnInit(): void {
    this.sheetsSubscription = this.sheetService.sheetsSubject.subscribe(
      (sheets: Sheet[]) => {
        this.sheets = sheets;
      }
    );
    this.sheetService.emitSheetSubject();
    this.clickedSheet = this.sheets[0];

    this.typesSubscription = this.typeService.typesSubject.subscribe(
      (types: any) => {
        this.types = types;
      }
    );
    this.typeService.emitTypeSubject();
    this.types = this.types[0];
    this.resizeAllGridItems();
  }

  ngAfterViewChecked() {
    if (!this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

  resizeGridItem(item) {
    let grid = document.getElementsByClassName('grid')[0];
    let rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')
    );
    let rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue('grid-row-gap')
    );
    let rowSpan = Math.ceil(
      (item.querySelector('.content').getBoundingClientRect().height + rowGap) /
        (rowHeight + rowGap)
    );
    item.style.gridRowEnd = 'span ' + rowSpan;
  }

  resizeAllGridItems() {
    let allItems = document.getElementsByClassName('card');
    for (let x = 0; x < allItems.length; x++) {
      this.resizeGridItem(allItems[x]);
    }
  }

  onAdd(form: NgForm) {
    this.sheetService.addSheet(
      form.value['titre'],
      form.value['description'],
      form.value['type']
    );
    this.resizeAllGridItems();
  }

  onEdit(form: NgForm) {
    this.clickedSheet = this.sheetService.editSheet(
      this.clickedSheet._id,
      form.value['titre'],
      form.value['description'],
      form.value['type']
    );
  }

  onDel() {
    //alert('On supprime !');
    this.sheetService.deleteSheet(this.clickedSheet._id);
    this.clickedSheet = new Sheet(
      -1,
      'Supprimé',
      'Cet élément a été supprimé !',
      'angular'
    );
  }

  onAddType(type: string) {
    this.filterApplied = true;
    setTimeout(() => (this.filterApplied = false), 1000);
    const index = this.searchType.indexOf(type);
    if (index > -1) {
      this.searchType.splice(index, 1);
    } else {
      this.searchType.push(type);
    }
    console.log(this.searchType);
    this.sheetService.emitSheetSubject();
  }

  onClick(s: Sheet) {
    this.clickedSheet = new Sheet(s._id, s.titre, s.description, s.type);
    console.log('ClickedSheet', this.clickedSheet);
    setTimeout(() => this.highlightService.highlightAll());
  }
}
