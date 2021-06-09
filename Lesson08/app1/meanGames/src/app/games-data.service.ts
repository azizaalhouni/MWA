//1 import system dependncis
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//2import application dependencis
import {Game} from "./games-list/games-list.component";
//3
@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

  private  baseURL: string = "http://localhost:3000/api";

  constructor(private http: HttpClient) { }
  
  public getGames() : Promise<Game[]>{
    //1- Build URL
    const url: string = this.baseURL+"/games";
    //2-Tell HTTP service to make a request
    //3-convert the Observable to a Promise
    //4-convert the response to JSON
    //5-return the response
    //6-Catch and handle errors
    //http wants the server wants to use HttpClient
    return this.http.get(url).toPromise().then(this.gotGames).catch(this.handleError);
  }
  private gotGames(response: any):Game[]{
    return response as Game[];
  }
  private handleError(error: any):Game[]{
    console.log("Error", error);
    return [];
  }
  public getGame(gameId: string) : Promise<Game>{
   
    const url: string = this.baseURL+"/games/"+gameId;
    
    return this.http.get(url).toPromise().then(this.gotGame).catch(this.handleErrorGame);
  }
  private gotGame(response: any): Game{
    return response as Game;
  }
  private handleErrorGame(error: any){
    console.log("Error", error);
    return error;
  }
  //Add game
   creatGame(addOneGame:any) : Promise<Game>{
   
    const url: string = this.baseURL+"/games/";
    const headers = {'content-type' : 'application/json'}
    return this.http.post(url,addOneGame,{headers}).toPromise().then(this.gotGame).catch(this.handleErrorGame);
  }
  deleteOneGame(gameId:any): Promise<Game>{
    const url: string = this.baseURL+"/games/"+gameId;
    return this.http.delete(url).toPromise().then(this.deleteOnce).catch(this.handleErrorGame);
  }
  private deleteOnce(response: any):Game{
    return response as Game;
  }
  // private handleErrorGame(error: any){
  //   console.log("Error", error);
  //   return error;
  // }
}
