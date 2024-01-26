import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly API_URL = "http://localhost:8080";

    constructor(private httpClient: HttpClient) {}

    newGame() {
        return this.httpClient.get(this.API_URL + '/battleship/newGame');
    }
}