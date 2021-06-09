import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../games-list/games-list.component';
import {GamesDataService } from "../games-data.service";

@Component({
  selector: 'app-games-details',
  templateUrl: './games-details.component.html',
  styleUrls: ['./games-details.component.css']
})
export class GamesDetailsComponent implements OnInit {
  game:Game ={} as Game;
  gameId!:string;

  constructor(private gamesDataService: GamesDataService, private route: ActivatedRoute){

  } 

  ngOnInit(): void {
    const gameId:string = this.route.snapshot.params.gameId;
    this.getGame(gameId);
  }
  private getGame(gameId: string):void{
    this.gamesDataService.getGame(gameId).then((response)=>this.gotGame(response)).catch(this.handleError); 
  }
 
  private gotGame(response: Game){
    console.log(response);
    this.game = response;
  }
 
  private handleError(error:any){
    console.log(error);
  }

}
