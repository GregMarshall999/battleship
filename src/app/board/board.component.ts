import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../service/api-service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  @Input() grid: { value: string, placed: boolean, clazz: string }[][] = [];
  @Input() boardOwner = '';
  @Input() selectedShip: string = '';
  @Input() ready = false;
  
  @Output() placingEmitter = new EventEmitter<boolean>();
  @Output() placedEmitter = new EventEmitter<{ ship: number, placed: boolean }>();

  placing: boolean = false;
  currentX = 0;
  currentY = 0;

  constructor(private service: ApiService) {}

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
      else if(this.placing && this.grid[row][col].value != '') {
        if(this.checkAvailablePosition(row, col)) {
          this.grid[row][col].placed = true;

          if(row == this.currentX) {
            if(col < this.currentY) {
              for (let i = this.currentY-1; i > col; i--) {
                this.setSelectedShipToCell(row, i);
                this.grid[row][i].placed = true;
              }
            }
            else {
              for (let i = this.currentY+1; i < col; i++) {
                this.setSelectedShipToCell(row, i);
                this.grid[row][i].placed = true;
              }
            }
          }

          if(col == this.currentY) {
            if(row < this.currentX) {
              for (let i = this.currentX-1; i > row; i--) {
                this.setSelectedShipToCell(i, col);
                this.grid[i][col].placed = true;
              }
            }
            else {
              for (let i = this.currentX+1; i < row; i++) {
                this.setSelectedShipToCell(i, col);
                this.grid[i][col].placed = true;
              }
            }
          }

          switch(this.selectedShip) {
            case 'carrier':
              this.placedEmitter.emit({ ship: 0, placed: true });
              break;
            case 'battleship':
              this.placedEmitter.emit({ ship: 1, placed: true });
              break;
            case 'cruiser':
              this.placedEmitter.emit({ ship: 2, placed: true });
              break;
            case 'sub':
              this.placedEmitter.emit({ ship: 3, placed: true });
              break;
            case 'destroyer':
              this.placedEmitter.emit({ ship: 4, placed: true });
              break;
            default: 
              break;
          }          
        }
        else {
          this.grid[this.currentX][this.currentY].value = '';
          this.grid[this.currentX][this.currentY].placed = false;
        }
    
        this.placing = false;
        this.placingEmitter.emit(false);

        this.enter(row, col);
      }
    }

    if(this.boardOwner == 'opponent') {//&& this.ready) {
      this.service.test().subscribe(d => {
        console.log(d);
      });
    }
  }

  enter(x: number, y: number) {
    if(this.boardOwner == 'player') {      
      if(!this.grid[x][y].placed) {
        if(this.placing) {
          var shipSize = 0;
          switch(this.selectedShip) {
            case 'carrier':
              shipSize = 4;
              break;
            case 'battleship':
              shipSize = 3;
              break;
            case 'cruiser':
              shipSize = 2;
              break;
            case 'sub':
              shipSize = 2;
              break;
            case 'destroyer':
              shipSize = 1;
              break;
            default: 
              break;
          }
  
          if( x == this.currentX && (y == this.currentY-shipSize || y == this.currentY+shipSize) || 
              y == this.currentY && (x == this.currentX-shipSize || x == this.currentX+shipSize)) {
            this.setSelectedShipToCell(x, y);
          }
        }
        else {
          this.setSelectedShipToCell(x, y);
        }
      }
    }
    
    if(this.boardOwner == 'opponent') {//&& this.ready) {
      if(!this.grid[x][y].placed) {
        this.grid[x][y].value = 'X';
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

  private checkAvailablePosition(x: number, y: number): boolean {
    if(x == this.currentX) {
      if(y < this.currentY) {
        for (let i = y+1; i < this.currentY; i++) {
          if(this.grid[x][i].placed) {
            return false;
          }
        }
      }

      if(y > this.currentY) {
        for (let i = y-1; i > this.currentY; i--) {
          if(this.grid[x][i].placed) {
            return false;
          }
        }
      }
    }

    if(y == this.currentY) {
      if(x < this.currentX) {
        for (let i = x+1; i < this.currentX; i++) {
          if(this.grid[i][y].placed) {
            return false;
          }
        }
      }

      if(x > this.currentX) {
        for (let i = x-1; i > this.currentX; i--) {
          if(this.grid[i][y].placed) {
            return false;
          }
        }
      }
    }

    return true;
  }
}
