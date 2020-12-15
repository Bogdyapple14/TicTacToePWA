import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  winner: string;
  xIsNext: boolean;
  squares: any[];

  constructor() {}

  // Executes the newGame() function on start
  ngOnInit(): void {
    this.newGame();
  }

  // Everytime we begin a new game, we empty the board, the winner and we begin with X
  newGame() {
    this.winner = null;
    // Takes a random 1 digit number, divides it by 5. If it's > 1, X begins, else, O begins
    Math.floor(Math.random() * 10) / 5 > 1
      ? (this.xIsNext = true)
      : (this.xIsNext = false);
    this.squares = Array(9).fill(null);
  }

  // if xIsNext === true, the value on the board will be X, otherwise, it will be O
  get player() {
    if (this.xIsNext) return 'X';
    else return 'O';
  }

  // We press on a square, take it's index from the html (from *ngFor) and input the X/O value into that square
  // Then, we change the xIsNext boolean, for the next value to be different.
  makeMove(index: number) {
    if (!this.squares[index] && !this.winner) {
      this.squares[index] = this.player;
      this.xIsNext = !this.xIsNext;
    }
    // Everytime we  make a move, we also calculate to see if someone won, if true, we return the value which won
    this.winner = this.calculateWinner();
    const tableIsFull: boolean = this.squares.every((square) => {
      return square != null;
    });
    if (tableIsFull && !this.winner) {
      this.winner = 'NOBODY';
    }
  }

  // An algorithm used to decide if someone won, based on the winning moves and the boards' squares
  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
