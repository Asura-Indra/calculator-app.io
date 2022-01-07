import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDataService } from '../app-data.service';
import { CustomButtonDirective } from '../custom-button.directive';
@Component({
  selector: 'app-calculator-app',
  templateUrl: './calculator-app.component.html',
  styleUrls: ['./calculator-app.component.css']
})
export class CalculatorAppComponent implements OnInit {
radio_data: string='';

  constructor(private service: AppDataService, private router: Router) { }

  ngOnInit(): void {
this.radio_data=this.service.radio_data;
  }

result: any | undefined;
input='';
count_d=0;
get_num:string='';
get_operator:string[]=[];
num: number[] = [];
arrnum_l: number =0;
arroper_l: number=0;
//counting symbol
divide_count:number=0;
multiple_count:number=0;
subtraction_count:number=0;
addition_count:number=0;
// clearing all Value from App
allClear()
{
  this.input='';
  this.result= undefined;
  this.count_d=0;
  this.get_num='';
  this.arrnum_l=0;
  this.num=[]; // num key operator
  this.get_operator=[]; // operator key array
  this.arroper_l=0;
  this.addition_count=0;
  this.divide_count=0;
  this.multiple_count=0;
  this.subtraction_count=0;

}
// getting decimal value

decimalKey(d:string)
{
  let index=this.input.length-1;
if(this.count_d==0 && this.input.charAt(index)!='.' && this.input.charAt(0)!='' && this.input.charAt(index)!='+' && this.input.charAt(index)!='-' && this.input.charAt(index)!='*' && this.input.charAt(index)!='/' )
{
  this.input=this.input+d;
  this.get_num=this.get_num+d;
  this.count_d=1;
}
else if(this.input.charAt(0)=='' || this.input.charAt(index)=='+' || this.input.charAt(index)=='-' || this.input.charAt(index)=='*' || this.input.charAt(index)=='/' )
{
  this.input=this.input+'0'+d;
  this.get_num=this.get_num+'0'+d;
  this.count_d=1;
}
}

// getting numeric key in Array
numKey(i:string)
{
    this.input=this.input+i;
    this.get_num=this.get_num+i;
    this.num[this.arrnum_l]=parseFloat(this.get_num);
this.Arithmatic();

}
// getting operator KEY IN array
operatorKey(symbol:string)
{
  let index=this.input.length-1;
  let temp=this.input.charAt(index);
  if(temp=='1' || temp=='2' || temp=='3'||temp=='4'||temp=='5'||temp=='6'||temp=='7'||temp=='8'||temp=='9'||temp=='0' && this.input.charAt(0)!='')
  {
    this.get_operator[this.arroper_l]=symbol;
    this.input=this.input+symbol;
    this.count_d=0
    this.arroper_l++;
    this.arrnum_l++;
    this.get_num='';
    if(symbol=='/')
    {
      this.divide_count++;
    }
    else if(symbol=='*')
    {
this.multiple_count++;
    }
    else if(symbol=='-')
    {
      this.subtraction_count++;
    }
    else if(symbol=='+')
    {
      this.addition_count++;
    }

  }
  else if (temp=='/' || temp=='+' || temp=='-'||temp=='*'&& this.input.charAt(0)!=''){
    this.arroper_l--;
    if(this.get_operator[this.arroper_l]=='/')
    {
      this.divide_count--;
    }
    else if(this.get_operator[this.arroper_l]=='*')
    {
this.multiple_count--;
    }
    else if(this.get_operator[this.arroper_l]=='-')
    {
      this.subtraction_count--;
    }
    else if(this.get_operator[this.arroper_l]=='+')
    {
      this.addition_count--;
    }
    // updating new opperator
    this.input= this.input.slice(0,index);
    this.input=this.input+symbol;
    this.get_operator[this.arroper_l]=symbol;
    this.arroper_l++;
    if(symbol=='/')
    {
      this.divide_count++;
    }
    else if(symbol=='*')
    {
this.multiple_count++;
    }
    else if(symbol=='-')
    {
      this.subtraction_count++;
    }
    else if(symbol=='+')
    {
      this.addition_count++;
    }
  }
}
// function of executing arithmatic operation
Arithmatic()
{

  if(this.num.length==this.get_operator.length+1 && this.get_operator.length!=0)
  {
    if(this.radio_data=='Sequence')
    {
  this.result=this.math_logic().toFixed(1);
    }
    else if(this.radio_data=='Operator')
    {
  this.result=this.math_logic1().toFixed(1);
    }
    else{
      this.router.navigateByUrl('main');
    }

  }

}


// Sequence Operation algorithm
math_logic(): number
{
  let result:number=0;
let loop_l=this.get_operator.length;
let l:number=2;
for(let i=0; i<loop_l; i++)
{
if(this.get_operator[i]=='+')
{
if(i==0)
{
  result=this.num[0]+this.num[1];
}
else{
  result=result+this.num[l];
  l++;
}
}
else if(this.get_operator[i]=='-')
{
if(i==0)
{
  result=this.num[0]-this.num[1];
}
else{
  result=result-this.num[l];
  l++;
}
}
else if(this.get_operator[i]=='*')
{
if(i==0)
{
  result=this.num[0]*this.num[1];
}
else{
  result=result*this.num[l];
  l++;
}
}
else if(this.get_operator[i]=='/')
{
if(i==0)
{
  result=this.num[0]/this.num[1];
}
else{
  result=result/this.num[l];
  l++;
}
}

}
// sending output
return result;
}


// Operator Higher Priority(/,*,-,+) operation algorithm
math_logic1():number
{

let temp_arr_num:number[]=[];
let temp_arr_operator:string[]=[];
for (let i of this.num)
{
  temp_arr_num.push(i);
}
for (let i of this.get_operator)
{
  temp_arr_operator.push(i);
}

  let index=0;
  // divide
if(this.divide_count>0)
    {
      while(index<temp_arr_operator.length)
      {
        if(temp_arr_operator[index]=='/')
        {
  temp_arr_num[index]=temp_arr_num[index]/temp_arr_num[index+1];

  for(let j=index+1; j<temp_arr_num.length; j++)
  {
  temp_arr_num[j]=temp_arr_num[j+1];
  }
  temp_arr_num.pop();
  for(let j=index; j<temp_arr_operator.length; j++)
  {
  temp_arr_operator[j]=temp_arr_operator[j+1];
  }
 temp_arr_operator.pop()
  index=index;
        }
        else{
          index++;
        }
  }

    }
    //multiplication
 if(this.multiple_count>0)
{
  index=0;
  while(index<temp_arr_operator.length)
  {
    if(temp_arr_operator[index]=='*')
    {
temp_arr_num[index]=temp_arr_num[index]*temp_arr_num[index+1];

for(let j=index+1; j<temp_arr_num.length; j++)
{
temp_arr_num[j]=temp_arr_num[j+1];
}
temp_arr_num.pop();
for(let j=index; j<temp_arr_operator.length; j++)
{
temp_arr_operator[j]=temp_arr_operator[j+1];
}
temp_arr_operator.pop()
index=index;
    }
    else{
      index++;
    }
}
}
//subtraction
 if(this.subtraction_count>0)
{
  index=0;
  while(index<temp_arr_operator.length)
      {
        if(temp_arr_operator[index]=='-')
        {
  temp_arr_num[index]=temp_arr_num[index]-temp_arr_num[index+1];

  for(let j=index+1; j<temp_arr_num.length; j++)
  {
  temp_arr_num[j]=temp_arr_num[j+1];
  }
  temp_arr_num.pop();
  for(let j=index; j<temp_arr_operator.length; j++)
  {
  temp_arr_operator[j]=temp_arr_operator[j+1];
  }
 temp_arr_operator.pop()
  index=index;
        }
        else{
          index++;
        }
  }
}
//addition
 if(this.addition_count>0)
{
  index=0;
  while(index<temp_arr_operator.length)
  {
    if(temp_arr_operator[index]=='+')
    {
temp_arr_num[index]=temp_arr_num[index]+temp_arr_num[index+1];

for(let j=index+1; j<temp_arr_num.length; j++)
{
temp_arr_num[j]=temp_arr_num[j+1];
}
temp_arr_num.pop();
for(let j=index; j<temp_arr_operator.length; j++)
{
temp_arr_operator[j]=temp_arr_operator[j+1];
}
temp_arr_operator.pop()
index=index;
    }
    else{
      index++;
    }
}

}
//sending outout
return temp_arr_num[0];

}

}
