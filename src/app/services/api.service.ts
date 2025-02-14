import { HttpClient, withFetch } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { resource } from '@angular/core';
import { PokemonDataDto } from '../Dtos/Pokemon/PokemonData/pokemon-dataDto';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient){
    withFetch()
  }

  // getPokemonData(pokeId: number){
  //   const myUrl = `${this.apiUrl}${pokeId}`;

  //   this.http.get<PokemonDataDto>(myUrl, {observe: 'response'}).subscribe(pokeData => {
  //     var pokeDataDto: PokemonDataDto;
  //     if(pokeData.ok){
  //       const pokeDataDto =
  //       // var jsonResponse = pokeData.body?.name;
  //       // console.log(jsonResponse);
  //       //pokeDataDto = pokeData
  //       return pokeDataDto;
  //     }
      
  //   });    
  // }

  getPokemonData(pokeId: number){
    const myUrl = `${this.apiUrl}${pokeId}`;
    return this.http.get<PokemonDataDto>(myUrl, {observe: 'response'})
    .pipe(
      map(pokeData => {
      if(pokeData.ok && pokeData.body){
        const pokeDataDto: PokemonDataDto = PokemonDataDto.fromJS(pokeData.body)
        return pokeDataDto;
      }
      else{
        throw new Error('Failed to fetch data');
      }
    }));
  }


  getPokeGoodPractice(id: number): Observable<PokemonDataDto> {
    return this.http.get<PokemonDataDto>(`${this.apiUrl}${id}`)
  }
}
