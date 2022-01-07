import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorAppComponent } from './calculator-app/calculator-app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { CustomButtonDirective } from './custom-button.directive';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorAppComponent,
    MainMenuComponent,
    CustomButtonDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
