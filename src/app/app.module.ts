import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {DraggableModule} from './draggable/draggable.module';
import { BoardComponent } from './board/board.component';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    DraggableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
