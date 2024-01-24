import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() grid: { value: string, placed: boolean, clazz: string }[][] = [];
  @Input() boardOwner = '';
  @Input() selectedShip = '';
  
  @Output() placingEmitter = new EventEmitter<boolean>();

  placing: boolean = false;
  currentX = 0;
  currentY = 0;

  onCellClick(row: number, col: number) {
    if(this.boardOwner == 'player') {
      if(!this.placing && !this.grid[row][col].placed) {
        this.setSelectedShipToCell(row, col);
        this.grid[row][col].placed = true;
  
        this.placing = true;
        this.placingEmitter.emit(true);
  
        this.currentX = row;
        this.currentY = col;
      }
      else if(this.placing) {
        this.placing = false;
        this.placingEmitter.emit(false);
      }
    }
  }

  enter(x: number, y: number) {
    if(!this.grid[x][y].placed) {
      if(this.placing) {
        if( x == this.currentX && (y == this.currentY-4 || y == this.currentY+4) || 
            y == this.currentY && (x == this.currentX-4 || x == this.currentX+4)) {
          this.setSelectedShipToCell(x, y);
        }
      }
      else {
        this.setSelectedShipToCell(x, y);
      }
    }
  }

  leave(x: number, y: number) {
    if(!this.grid[x][y].placed) 
      this.grid[x][y].value = '';
  }

  public reset() {
    this.placing = false;
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
