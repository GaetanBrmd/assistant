import { Component, OnInit, OnChanges } from '@angular/core';
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
    titre: '',
    description: '',
    type: 'global',
    _id: '0',
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
    this.clickedSheet = new Sheet('', '', 'global');
  }

  ngOnInit(): void {
    this.sheetsSubscription = this.sheetService.sheetsSubject.subscribe(
      (sheets: Sheet[]) => {
        this.sheets = sheets;
        console.log('bidule');
        this.resizeAllGridItems();
      }
    );
    this.sheetService.getSheets();
    this.sheetService.emitSheetSubject();

    this.typesSubscription = this.typeService.typesSubject.subscribe(
      (types: any) => {
        this.types = types;
      }
    );
    this.typeService.emitTypeSubject();
  }

  getBG(type: string) {
    return this.typeService.getBgColor(type);
  }
  getColor(type: string) {
    return this.typeService.getColor(type);
  }
  getIcon(type: string) {
    return this.typeService.getIcon(type);
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

  onAddType(type: string) {
    this.filterApplied = true;
    setTimeout(() => (this.filterApplied = false), 1000);
    const index = this.searchType.indexOf(type);
    if (index > -1) {
      this.searchType.splice(index, 1);
    } else {
      this.searchType.push(type);
    }
    this.sheetService.emitSheetSubject();
  }

  onClick(s: Sheet) {
    this.clickedSheet = s;
    setTimeout(() => this.highlightService.highlightAll());
  }
}
