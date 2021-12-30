import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorAppComponent } from './calculator-app/calculator-app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
const routes: Routes = [
  {path:'app', component:CalculatorAppComponent},
  {path:'main', component:MainMenuComponent},
  { path: '', redirectTo: 'main', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
