import { Injectable } from '@angular/core';
import { MainMenuComponent } from './main-menu/main-menu.component';
@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor() { }
  radio_data: string=''

getdata(radio_value:string)
{
  this.radio_data=radio_value;
}
send_data()
{

}


}
