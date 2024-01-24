import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() grid: { value: string, placed: boolean, clazz: string }[][] = [];
  @Input() boardOwner = '';
  @Input() selectedShip = '';

  onCellClick(row: number, col: number) {
    this.setSelectedShipToCell(row, col);
    this.grid[row][col].placed = true;
    
    var letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ];

    console.log('Grid location: ' + letters[row-1] + '' + col + '\n', 
                'Grid owner: ' + this.boardOwner + '\n', 
                'Selected Ship: ' + this.selectedShip);
  }

  enter(x: number, y: number) {
    if(!this.grid[x][y].placed) {
      this.setSelectedShipToCell(x, y);
    }
  }

  leave(x: number, y: number) {
    if(!this.grid[x][y].placed) 
      this.grid[x][y].value = '';
  }

  private setSelectedShipToCell(x: number, y: number) {
    switch(this.selectedShip) {
      case 'carrier':
        this.grid[x][y].value = 'CV';
        break;
      case 'battleship':
        this.grid[x][y].value = 'BB';
        break;
      case 'cruiser':
        this.grid[x][y].value = 'CL';
        break;
      case 'sub':
        this.grid[x][y].value = 'SS';
        break;
      case 'destroyer':
        this.grid[x][y].value = 'DD';
        break;
      default: 
        break;
    }
  }
}
