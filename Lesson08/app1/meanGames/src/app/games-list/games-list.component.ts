//This on has no dependencis on other 
//has Dependencis on Angular
import { Component, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';

import {GamesDataService } from "../games-data.service";


export class Game{
  // _id: number =1;
  title: string="";
  price!:number ; //if we don't want to initialize we can do price!:number
  // minPlayers!: number;
  // maxPlayers!: number;
  // minAge!: number;

}
//Decorator
@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
//Export
export class GamesListComponent implements OnInit {
title: string = "Mean Games";
//To create an instance
// game1: Game = {
//   _id:123,
//   title: "Game One",
//   price: 10.99

// }
// game2: Game = {
//   _id:125,
//   title: "Game Two",
//   price: 20.99

// }
checkoutForm = this.formBuilder.group({
  title:"",
  // price:''
});
games: Game[]=[] ;//= [this.game1, this.game2];
  constructor(
    private gamesDataService: GamesDataService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getGames();
  }

  private getGames(): void{
    this.gamesDataService.getGames().then((response)=>this.gotGames(response)).catch(this.handleError);
  }
  private gotGames( response: Game[]){
    console.log(response);
    this.games = response;
  }
  private handleError(error:any){
    console.log(error);
  }
   addGame():void{
    alert("Game Title is : "+ this.checkoutForm.value)
    // this.games.push({title:this.newGameTitle, price:this.newGamePrice})
  }
}
