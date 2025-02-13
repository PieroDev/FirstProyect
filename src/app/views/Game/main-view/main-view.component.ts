import { BrowserModule } from '@angular/platform-browser';
import { effect, NgModule } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Component, inject, resource } from '@angular/core';
import { MainCardComponent } from '../main-card/main-card.component';
import { FlexTestComponent } from '../flex-test/flex-test.component';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../../services/api.service';
import { PokemonDataDto } from '../../../Dtos/Pokemon/PokemonData/pokemon-dataDto';
import { Observable, timeout} from 'rxjs';

@Component({
  selector: 'app-main-view',
  imports: [MainCardComponent, FlexTestComponent, DrawerModule, ButtonModule],
  providers: [],
  template: `
  <body>
    <div class="flex-column-container">
    <h1><img src="/Img/logo.png" alt=""></h1>
      <app-main-card
      [lives] = "lives"
      [pokeNumber] ="pokeNumber"
      [pokeNumberFormated] ='pokeNumberFormated'
      [pokeName] = 'pokeName'
      [pokemonDataDto] = "pokeNewDataDto"
      (show)="getShowRules($event)"
      (getNewPokemonApi)="getNewPokemonByApi()"
      [isLoading] = 'isLoadingData'
      >
      </app-main-card>
      
    </div>
    <div class="flex-row-container">
    <app-flex-test></app-flex-test>
    <div class="card flex justify-center">

    <p-drawer [(visible)]="showRule" header="Game Rules" styleClass="!w-full md:!w-80 lg:!w-[30rem]" >
    <ul class="list-disc">
      <li class="mt-2">Every time you fail a guess, you lose 1 life out of 3</li>
      <li class="mt-2">You have 3 clues for each pokemon, you can ask a clue pressing the "clue" button</li>
      <li class="mt-2">Each five pokemon that you guess, you'll advance to the next generation.</li>
      <li class="mt-2">Press ⏎ (Enter) or the <span><img class="pokeballRule" src="/Img/icon-Pokeball.png" alt=""></span> to make your guess</li>
      <li class="mt-2">Some pokemon has especial characters, like Nidoran-f and Nidoran-m, another examples are Mr-mime and Tapu-Koko</li>
      <li class="mt-2">Don't worry about capital letters.</li>
      <li class="mt-2">Have fun!</li>
    </ul>
    <img class="psyRules" src="/Img/PsyRules.png" alt="">
    </p-drawer>
</div>

</div>
    
  </body>
  `,
  styles: [`
  body{ 
    margin: 0;
    background-image: url(/Img/nightBackground.webp); 
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
  }
  .flex-column-container{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .flex-row-container{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pokeballRule{
    height: 2rem;
    display: inline-block;
  }
  
  `]
  
}
)
export class MainViewComponent {
  private getNewPokemon = inject(ApiService);
  showRule = false;
  Generation = 1;
  lives = 3;
  clues = 3;
  level = 1;
  pokeNumber = 0;
  pokeNumberFormated = '';
  pokeName = '';
  asd = `/PokedexImages/images/${this.pokeNumberFormated}.png`
  pokemonData$!: Observable<PokemonDataDto>;
  pokeNewDataDto!: PokemonDataDto;
  isLoadingData = true; 
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  getShowRules(show: boolean){
    this.showRule = show;
  }

  getNewPokemonByApi(){
    this.isLoadingData = true;
    this.pokeNumber = Math.floor(Math.random() * (151 - 1 + 1)) + 1;
    this.pokeNumberFormated = String(this.pokeNumber).padStart(3, '0');
    this.pokemonData$  = this.getNewPokemon.getPokemonData(this.pokeNumber);
    this.pokemonData$.subscribe(data => {
      this.isLoadingData = false;
      this.pokeNewDataDto = data;

      //console.log(this.pokeNewDataDto.name)
    })
    
    //console.log(this.pokeNewDataDto.name+" - " + this.pokeNewDataDto.url+ " - "+ this.asd )   
     // this.pokemon.reload()
  }

  // getGoodPracticePokemon(){
  //   this.pokeNumber = Math.floor(Math.random() * (151 - 1 + 1)) + 1;
  //   this.pokeNumberFormated = String(this.pokeNumber).padStart(3, '0');
  //   this.pokemonData$ = this.getNewPokemon.getPokeGoodPractice(this.pokeNumber);
  //   this.pokemonData$.subscribe(data => {
  //     this.pokeNewDataDto = data;
  //     this.pokeNewDataDto.url = `/PokedexImages/images/${this.pokeNumberFormated}.png`
  //     console.log(this.pokeNewDataDto.name+" - " + this.pokeNewDataDto.url+ " - "+ this.asd )
  //   })
  //   //this.pokemon.reload()
  // }
}
