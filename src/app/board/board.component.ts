import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() grid: { value: string, clazz: string }[][] = [];
  @Input() boardOwner = '';
  @Input() selectedShip = '';
  @Input() shipDirection = '';

  onCellClick(row: number, col: number) {
    var letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ];
    
    console.log('Grid: ', this.grid);

    console.log('Grid location: ' + letters[row-1] + '' + col + '\n', 
                'Grid owner: ' + this.boardOwner + '\n', 
                'Selected Ship: ' + this.selectedShip + '\n', 
                'Ship direction: ' + this.shipDirection);
  }

  enter(x: number, y: number) {
    this.grid[x][y].value = 'T';
  }

  leave(x: number, y: number) {
    this.grid[x][y].value = '';
  }
}
