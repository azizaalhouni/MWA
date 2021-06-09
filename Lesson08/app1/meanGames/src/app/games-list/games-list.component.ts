//This on has no dependencis on other 
//has Dependencis on Angular
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {FormBuilder} from '@angular/forms';
import {NgForm} from '@angular/forms';

import {GamesDataService } from "../games-data.service";


export class Game{
  _id: number =1;
  title: string="";
  price!:number ; //if we don't want to initialize we can do price!:number
  // rate!:number;
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
title: string = "";
// title:any;
   price:any;
   rate:any;
// checkoutForm = this.formBuilder.group({
//   title:"",
//   // price:''
// });
games: Game[]=[] ;//= [this.game1, this.game2];
  constructor(
    private gamesDataService: GamesDataService){}
   public createGame!:Game;
    // private formBuilder: FormBuilder) { }

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
   addGame(form:NgForm){
     console.log(this.title);
     let game: any ={
       title: this.title,
       price: this.price,
       rate:this.rate
     }
     console.log(game);
    this.gamesDataService.creatGame(game).then(response=>this.createGame=response);
  }
}
