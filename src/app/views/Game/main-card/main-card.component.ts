import { Component, EventEmitter, Input, Output, input} from '@angular/core';
import { CardModule } from 'primeng/card';
import { Button, ButtonModule } from 'primeng/button';
import { PokemonDataDto } from '../../../Dtos/Pokemon/PokemonData/pokemon-dataDto';

@Component({
  selector: 'app-main-card',
  imports: [CardModule, Button, ButtonModule],
  template: `
  <div class="mb-4 p-2 flex items-center justify-center">
    <p-card  class="text-center" [style]="{ width: '25rem', overflow: 'hidden', backgroundColor: 'rgba(95, 99, 125, 0.31)'}">
    <!-- Aca si saco el ng-template y solo dejo la img funciona correctamente, investigar -->
    <!-- Comenzar a implementar botones de pistas y eventhandler para el Enter -->
    <p class="pokeData">Level: {{this.level}}</p>
    <p class="pokeData ">Clues: {{this.clues}}</p>
    @if(this.lives > 0){
      @if(!isLoading() && this.pokemonDataDto){
        
      <div class="flex items-center justify-center pokeImgContainer">
        <img alt="CardImg" [class]="{'silhouette': this.answer == 'unanswered', 'correctAnswer': this.answer == 'ok', 'errorAnswer': this.answer == 'fail'}" class="w-full mx-auto m-1 pokeImg " [src]="'/PokedexImages/images/'+this.pokeNumberFormated+'.png'" /> 
      </div>
      <p class="pokeData pokemonNameP">{{this.pokemonDataDto.name}}</p>
      <p class="pokeData pokemonDataP">#{{this.pokemonDataDto.id}}</p>
      }
    @else{
      <div class="flex items-center justify-center pokeImgContainer">
        <img alt="CardImg" class="w-full mx-auto m-1 pokeImg" src="/Img/icon-Pokeball.png"/>
      </div>
      <p class="pokeData pokemonNameP"></p>
      <p class="pokeData pokemonDataP"></p>

    }
      <!-- <ng-template #title> {{this.pokemonDataDto.name}}</ng-template> -->
    <div class="flex flex-col justify-center gap-4 mt-4" [style]="{height: '5rem'}">
      <p class="pokemonDataP">{{level > 0 ? 'Types:': ''}}</p>
      <div class="flex flex-row justify-center gap-4" [style]="{height: '5rem'}">
        @if(!isLoading() && this.pokemonDataDto){
          @for(type of this.pokemonDataDto.types; track type.slot){
            <p class="pokemonDataP">
              <span>
                <img class="pokemonTypesIcon" title="{{type.type.name}}" src="/PokedexImages/Type-Icons/types/{{type.type.name}}.png" alt="{{type.type.name}}">
              </span>
            </p>
          }
        }
      </div>
    </div>
    <div class="flex flex-col justify-center gap-4" [style]="{height: '10rem'}" >
      @if(!startLevel && level > 0){
        <p class="pokeData">Lifes: </p>
      <div class="flex flex-row justify-center gap-4">
      @for(_ of [].constructor(lives); track $index) {
        <span><img class="substitute" src="/Img/substitute.png" alt=""></span>
      }
      </div>
      }
    </div>
    
    <div class="flex gap-4 mt-2">
            <p-button label="New Pokemon" (click)="triggerParentNewPokemon();" class="w-full" [outlined]="true" styleClass="w-full" />
            <!-- <p-button label="Save" (click)="changeSilhouette()" class="w-full" styleClass="w-full" /> -->
            <p-button label="Rules"(click)="sendShowRules(true)"/>
            
        </div>
        <div class="flex gap-4 mt-2">
            <p-button label="correct" class="w-full" (click)="correctAnswer()"/>
            <p-button label="fail" class="w-full" (click)="incorrectAnswer()"/>
        </div>
    }
    @else {
      <h1>Game Over</h1>
      <p-button label="Retry" class="w-full" (click)="restart()"/>
    }

    
</p-card>
  </div>
  `,
  styles: [`
  p-card{
    margin: 2rem;
  }
  .substitute{
    width: 4rem;
  }
  .pokeImgContainer{
    height: 20rem;
  }
  .pokeImg{
    width: 20rem;
  }
  .pokeData{
    margin: 1rem;
  }
  .pokemonNameP{
    height: 2rem;
    font-size: 2rem;
  }
  .pokemonDataP{
    height: 2rem;
  }
  .pokemonTypesIcon{
    width: 3rem;
  }
  .silhouette{
    filter: brightness(0%); 
  }
  .correctAnswer{
    filter: brightness(100%);
    -webkit-transition : -webkit-filter 500ms linear
  }
  .errorAnswer{
    filter: grayscale(80%);
    filter: brightness(25%); 
    -webkit-transition : -webkit-filter 500ms linear
  }
  `]
})

export class MainCardComponent {
  @Input() lives = 0;
  @Input() level = 0;
  @Input() clues = 0;
  @Input() pokeNumber = 0;
  @Input() pokeNumberFormated = '';
  @Input() pokemonDataDto!: PokemonDataDto;
  @Input() pokeName = '';
  isLoading = input(true);
  @Output() show = new EventEmitter<boolean>();
  @Output() getNewPokemonApi = new EventEmitter<void>();
  @Output() retry = new EventEmitter<void>(); 
  startLevel = true;
  silhouette = false;
  correct = true;
  answer = 'unanswered'
  shouldRender: boolean = true;

  sendShowRules(show: boolean) {
    this.show.emit(show);
  }

  triggerParentNewPokemon() {
    this.startLevel = false;
    this.getNewPokemonApi.emit();
    this.answer = 'unanswered'
  }

  correctAnswer(){
    this.answer = 'ok';
    if(this.clues > 0){
      this.clues--;
    }

  }

  incorrectAnswer(){
    this.answer = 'fail';
    if(this.lives > 0){
      this.lives--;
    }
  }

  restart(){
    this.retry.emit();
    this.lives = 3;
    console.log(this.lives);
  }

}
