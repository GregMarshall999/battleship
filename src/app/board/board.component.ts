import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() grid: { value: string, clazz: string }[][] = [];
  @Input() boardOwner = '';

  onCellClick(row: number, col: number) {
    var letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ];
    
    console.log(letters[row-1], col, this.boardOwner);
  }
}
