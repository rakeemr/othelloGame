import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() {
  }
  ngOnInit() {
    let i = 0;
    for (; i < 8; i++) {
      const x = document.createElement('DIV');
      x.className = 'space';
    }
  }

}
