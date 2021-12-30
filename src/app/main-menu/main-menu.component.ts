import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../app-data.service';
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

constructor(private router: Router, private service: AppDataService ) { }

  ngOnInit(): void {
  }

input_radio:string='';

btnClick()
{
  if(this.input_radio=='')
  {
    window.alert("Bad Expression");
  }
  else {
    this.service.getdata(this.input_radio);
    this.router.navigateByUrl('app');
  }

}


}
