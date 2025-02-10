import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient){ }

  getData(pokeId: number): Observable<any> {
    const myUrl = '${this.apiUrl}${pokeId}';
    return this.http.get<any>(myUrl);
  }
}
