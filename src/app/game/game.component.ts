import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  playerGrid: { value: string, placed: boolean, clazz: string }[][] = this.generateEmptyGrid();
  opponentGrid: { value: string, placed: boolean, clazz: string }[][] = this.generateEmptyGrid();

  ships: string[] = ['carrier', 'battleship', 'cruiser', 'sub', 'destroyer'];
  shipDirection: string = 'vertical';
  selectedShip: string = this.ships[0];

  selectedButton: string[] = ['accent', 'primary', 'primary', 'primary', 'primary'];

  generateEmptyGrid(): { value: string, placed: boolean, clazz: string }[][] {
    var grid: { value: string, placed: boolean, clazz: string }[][] = [];
    var row: { value: string, placed: boolean, clazz: string }[] = [];
    var gridSize = 11;
    var letters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ];

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        
        if(i == 0) {
          if(j == 0)
            row.push({ value: "/", placed: false, clazz: 'no-hover' });
          else
            row.push({ value: ""+j, placed: false, clazz: 'no-hover' })
        }
        else if(j == 0) {
          row.push({ value: letters[i-1], placed: false, clazz: 'no-hover' });
        }
        else
          row.push({ value: "", placed: false, clazz: "" });

      }
      
      grid.push(row);
      row = [];
    }
    
    return grid;
  }

  shipSelect(shipType: string, buttonIndex: number) {
    this.selectedShip = shipType;

    this.selectedButton = ['primary', 'primary', 'primary', 'primary', 'primary'];
    this.selectedButton[buttonIndex] = 'accent';
  }

  capShip(ship: string): string {
    return ship.charAt(0).toUpperCase() + ship.substring(1);
  }
}