import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent implements OnInit {
  // We input squareValue as a prop from the parent component
  @Input() squareValue: 'O' | 'X';

  constructor() {}

  ngOnInit(): void {}
}
