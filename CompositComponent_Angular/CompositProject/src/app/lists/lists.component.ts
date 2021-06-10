import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// export class Customer{
//   customerNo!: number;
//   name!:string ; 
 
// }
class Advice {
  public setup: string;
  public punchline: string;
  public hide: boolean;

  constructor(setup: string, punchline: string) {
    this.setup = setup;
    this.punchline = punchline;
    this.hide = true;
  }

  toggle() {
    this.hide = !this.hide;
  }
}

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  advices: Advice[];

  constructor() { 
    this.advices = [
      
      new Advice("Secret#1", "Don't Promise When you're happy"),
      new Advice("Secret#2", "Don't Reply when You're angry"),
      new Advice("Secret#3", "Don't decide when you are sad"),
    ];
  }

  ngOnInit(): void {
  }

}
