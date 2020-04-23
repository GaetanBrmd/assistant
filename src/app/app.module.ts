import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheatsheetComponent } from './computing/cheatsheet/cheatsheet.component';
import { FilterPipe } from './computing/filter.pipe';
import { TypePipe } from './computing/select.pipe';
import { HighlightService } from './computing/highlight.service';
import { SheetService } from './computing/sheet.service';
import { TypeService } from './computing/type.service';

@NgModule({
  declarations: [AppComponent, CheatsheetComponent, FilterPipe, TypePipe],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [HighlightService, SheetService, TypeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
