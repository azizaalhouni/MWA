//Dependencis with Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
//Dependencis with my code
import { AppComponent } from './app.component';
import { GamesListComponent } from './games-list/games-list.component';
import { OrderPipe } from './order.pipe';
import { HomePageComponent } from './home-page/home-page.component';
import {GamesDetailsComponent} from './games-details/games-details.component';

//Decorator
@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    OrderPipe,
    HomePageComponent,
    GamesDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path:"",
        component: HomePageComponent
      },
      {
        path:"games",
        component: GamesListComponent
      },
      {
      path:"game/:gameId",
      component: GamesDetailsComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
//What my comoponant export
export class AppModule { }
