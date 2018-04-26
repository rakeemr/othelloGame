import { Component, OnInit } from '@angular/core';

interface BoardSpace {
    boardView: number;
    boardControl: number;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
    board = [];
    window = 650;
    alt = 8;
    lon = 8;
    tempbtn = '';
    size = this.alt * this.lon;
    spaces: BoardSpace[] = [];
    ngOnInit() {
        this.fillBoard();
        this.setInitialChip();
    }
    add(boaView, boaCont): void {
        this.spaces.push({boardView: boaView, boardControl: boaCont});
    }

    fillBoard(): void {
        let i = 0;
        // Div array that contents the board spaces
        const arrayDiv = new Array();
        // Get the html area element
        const area = document.getElementsByClassName('area');
        // Loop that creates the board spaces dynamically
        for (; i <= this.size - 1; i++) {
            // Creates a new DIV
            arrayDiv[i] = document.createElement('div');
            // Sets class name and style to the created DIV
            arrayDiv[i].id = i;
            arrayDiv[i].className = 'space';
            arrayDiv[i].style.height = '11.30%';
            arrayDiv[i].style.width = '12.1%';
            arrayDiv[i].style.border = '1px solid black';
            arrayDiv[i].style.textAlign = 'center';
            arrayDiv[i].style.display = 'inline-block';
            arrayDiv[i].style.background = 'peru';
            arrayDiv[i].style.overflow = 'auto';
            arrayDiv[i].onmouseup = e => {
                e = e || window.event;
                e = e.target || e.srcElement;
                this.setChipPos(e.id, this.tempbtn);

            };
            arrayDiv[i].onmousedown = e => {
                e = e || window.event;
                let btnCode;

                if ('object' === typeof e) {
                    btnCode = e.button;

                    switch (btnCode) {
                        case 0:
                            this.tempbtn = '1';
                            break;

                        case 1:
                            this.tempbtn = '3';
                            break;

                        case 2:
                            this.tempbtn = '2';
                            break;

                    }
                }
            }

            area[0].appendChild(arrayDiv[i]);
            this.spaces.push({boardView: 0, boardControl: 0});
            this.board.push('');
        }
    }

    setInitialChip(): void {
        // Save positions in index
        const position1 = ( (this.size / 2) - (this.lon / 2) ) - 1;
        const position2 = ( (this.size / 2) -  (this.lon / 2) );
        const position3 = ( ( (this.size / 2) + this.alt) - (this.lon / 2) ) - 1;
        const position4 = ( (this.size / 2) + this.alt) - (this.lon / 2) ;
        // Sets initial chips in the board
        this.spaces[position1] = {boardView: 1, boardControl: 1};
        this.spaces[position2] = {boardView: 2, boardControl: 2};
        this.spaces[position3] = {boardView: 2, boardControl: 2};
        this.spaces[position4] = {boardView: 1, boardControl: 1};

        this.board[position1] = '1';
        this.board[position2] = '2';
        this.board[position3] = '2';
        this.board[position4] = '1';

        this.setChipPos(position1, this.board[position1]);
        this.setChipPos(position2, this.board[position2]);
        this.setChipPos(position3, this.board[position3]);
        this.setChipPos(position4, this.board[position4]);
    }

    setChipPos(id, idPlay): void {
        if (!document.getElementById(id)[0]) {
            const chip = document.createElement('div');
            chip.className = 'box';
            chip.id = 's' + id;
            chip.style.height = '50px';
            chip.style.width = '50px';
            chip.style.border = '1px solid black';
            chip.style.margin = 'auto';
            if (idPlay === '1') {
                chip.style.background = 'white';
            } else if (idPlay === '2') {
                chip.style.background = 'black';
            }
            document.getElementById(id).appendChild(chip);
        } else {
            const tempChild = document.getElementById('s' + id);
            document.getElementById(id)[0].removeChild(tempChild);
        }
    }

    jugada(id, idPlay): void {
        this.board[id] = idPlay;
        this.spaces[id] = {boardView: idPlay, boardControl: idPlay};
        this.setChipPos(id, idPlay);
    }
}
