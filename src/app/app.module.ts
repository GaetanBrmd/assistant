import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheatsheetComponent } from './computing/cheatsheet/cheatsheet.component';
import { FilterPipe } from './computing/filter.pipe';
import { TypePipe } from './computing/select.pipe';
import { HighlightService } from './computing/highlight.service';
import { SheetService } from './computing/sheet.service';
import { TypeService } from './computing/type.service';
import { AuthService } from './services/auth.service';
import { WebRequestService } from './services/web-request.service';
import { AuthGuard } from './services/auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { AddSheetComponent } from './computing/add-sheet/add-sheet.component';
import { EditSheetComponent } from './computing/edit-sheet/edit-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    CheatsheetComponent,
    FilterPipe,
    TypePipe,
    LoginComponent,
    AddSheetComponent,
    EditSheetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    HighlightService,
    SheetService,
    TypeService,
    AuthService,
    AuthGuard,
    WebRequestService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
