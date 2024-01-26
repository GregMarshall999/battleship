import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly API_URL = "http://localhost:8080";

    constructor(private httpClient: HttpClient) {}

    test() {
        return this.httpClient.get(this.API_URL + '/battleship/test');
    }

    newGame(grid: { value: string, placed: boolean, clazz: string }[][]) {
        var postGrid: string[][] = [];

        grid.forEach(r => {
            var row = r.map(c => {
                return c.value;
            });

            postGrid.push(row);
        });

        console.log(postGrid);

        return this.httpClient.post(this.API_URL + '/battleship/newGame', { cells: postGrid });
    }
}