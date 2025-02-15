import { Component, EventEmitter, Input, Output, input} from '@angular/core';
import { CardModule } from 'primeng/card';
import { Button, ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { PokemonDataDto } from '../../../Dtos/Pokemon/PokemonData/pokemon-dataDto';
import { AnswersDto } from '../../../Dtos/Answer/answers-dto';
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-card',
  imports: [CardModule, Button, ButtonModule, ImageModule, InputOtpModule, FormsModule],
  template: `
  <div class="p-2 flex items-center justify-center">
    <p-card  class="text-center" [style]="{ width: '30rem', overflow: 'hidden', backgroundColor: 'rgba(95, 99, 125, 0.31)'}">
    <!-- Aca si saco el ng-template y solo dejo la img funciona correctamente, investigar -->
    <!-- Comenzar a implementar botones de pistas y eventhandler para el Enter -->
    <!-- <p class="pokeData">Level: {{level}}</p>
    <p class="pokeData ">Clues: {{clues}}</p> -->
    @if(level > 0 && lives > 0){
      @if(!isLoading() && pokemonDataDto){
      <div class="flex items-center justify-center pokeImgContainer">
        <p-image  alt="CardImg" [class]="{'silhouette': this.guessResult == 'unanswered', 'correctAnswer': this.guessResult == 'ok', 'errorAnswer': this.guessResult == 'fail'}" class="w-full mx-auto m-1 pokeImg " 
        src= "assets/PokedexImages/images/{{this.pokeNumberFormated}}.png" /> 
      </div>
      <div class="card flex items-center flex-col justify-center inputsContainer" >
      <!-- ngModel es el que relaciona el valor del input a la variable declarada -->
       @if(loadGuess){
          <p-inputotp name="guessInput" type="text" [(ngModel)]="this.childGuess" [length]="pokeNameFormated.length" size="small" (keydown)="keydownDetect($event, this.childGuess)" [autofocus]="true" ></p-inputotp>
          <p-inputotp name="cluesInput" class="mt-2" type="text" [(ngModel)]="this.actualClue" [length]="pokeNameFormated.length" size="small" [disabled]="true"></p-inputotp>
        }
        <!-- <p class="pokeData pokemonNameP">{{pokeNameFormated}}</p>
        <p class="pokeData pokemonDataP">#{{pokemonDataDto.id}}</p> -->
        <p class="pokeData pokemonDataP">Clues left: {{clues}}</p>
        <p class="pokeData pokemonDataP">Generation: {{generation}}</p>
      </div>

      
      }
    @else{
      <div class="flex items-center justify-center pokeImgContainer">
      <p class="pokeData pokemonDataP"></p>
      <p class="pokeData pokemonDataP"></p>
      </div>
      <div class="card flex items-center flex-col justify-center inputsContainer" >
        <p class="pokeData pokemonDataP"></p>
        <p class="pokeData pokemonDataP"></p>
      </div>


    }
    <!-- asd -->
    <div class="flex flex-col justify-center gap-4 mt-4" [style]="{height: '5rem'}">
      <p class="pokemonDataP">{{level > 0 ? 'Types:': ''}}</p>
      <div class="flex flex-row justify-center gap-4" [style]="{height: '5rem'}">
        @if(!isLoading() && this.pokemonDataDto){
          @for(type of this.pokemonDataDto.types; track type.slot){
            <p class="pokemonDataP">
              <span>
                <img class="pokemonTypesIcon" title="{{type.type.name}}" src="assets/PokedexImages/Type-Icons/types/{{type.type.name}}.png" alt="{{type.type.name}}">
              </span>
            </p>
          }
        }
      </div>
    </div>
    <div class="flex flex-col justify-center gap-4" [style]="{height: '10rem'}" >
      @if(!startLevel() && level > 0){
        <p class="pokeData">Lifes: </p>
      <div class="flex flex-row justify-center gap-4">
      @for(_ of [].constructor(lives); track $index) {
        <span><img class="substitute" src="assets/Img/substitute.png" alt=""></span>
      }
      </div>
      }
    </div>

    <div class="flex gap-4 mt-2 justify-center">
            <p-button variant="text" [rounded]="true" label="" (click)="sendGuess(this.childGuess);"  [outlined]="true" styleClass="w-full">
              <span>
                <img class="GameIcon" src="assets/Img/icon-Pokeball.png" alt="Guess icon" title="Make guess">
              </span>
            </p-button>
            <p-button variant="text" [rounded]="true" label="" (click)="pressGetClue();"  [outlined]="true" styleClass="w-full" [disabled]="this.clues > 0 ? false : true">
              <span>
                <img class="GameIcon" src="assets/Img/lens.webp" alt="Clue icon" title="Get Clue">
              </span>
            </p-button>
        </div>
        <div class="flex gap-4 mt-2 justify-center">
          <p-button label="Rules"(click)="sendShowRules(true)"/>
        </div>
    }
    @else if(lives == 0){
      <h1 style="font-size: 50px; font-family: 'dogica'">Game Over</h1>
      <h3>Your Answers: </h3>
      <div class="flex gap-4 mt-2 flex-wrap justify-center">
        @for(answer of this.answersData; track answer.id){
          <p-image class="anwerItemImg" [class]="{'correctAnswer': answer.correct, 'errorAnswer': !answer.correct}" src= "assets/PokedexImages/images/{{answer.idFormated}}.png" alt="Image" width="250" />
        }
      </div>
      <p-button label="Retry" class="w-full" (click)="restart()"/>
    }
    @else{
      <h1>Start Game</h1>
      <p-button label="Start" class="w-full" (click)="start()"/>
    }
    </p-card>
  </div>

  `,
  styles: [`
  .substitute{
    width: 4rem;
  }
  .pokeImgContainer{
    height: 15rem;
  }
  .inputsContainer{
    height: 15rem
  }
  .pokeImg{
    width: 15rem;
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
  .anwerItemImg{
    width: 25%
  }
  .GameIcon{
    height: 4rem;
  }
  `]
})

export class MainCardComponent {
  @Input() generation = 0;
  @Input() lives = 0;
  @Input() level = 0;
  @Input() clues = 0;
  @Input() pokeNumber = 0;
  @Input() pokeNumberFormated = '';
  @Input() pokemonDataDto!: PokemonDataDto;
  @Input() pokeName = '';
  @Input() answersData: AnswersDto[] = [];
  @Input() pokeNameFormated = '';
  @Input() guess = '';
  @Input() actualClue = '';
  @Input() guessResult = '';
  startLevel = input(true);
  isLoading = input(true);
  @Output() show = new EventEmitter<boolean>();
  @Output() nextPokemonLevel = new EventEmitter<void>();
  @Output() retry = new EventEmitter<void>(); 
  @Output() startGame = new EventEmitter<void>();
  @Output() addPokeAnswer = new EventEmitter<AnswersDto>();
  @Output() getGuess = new EventEmitter<string>();
  @Output() getClue = new EventEmitter<void>();
  childGuess = '';
  silhouette = false;
  correct = true;
  answer = 'unanswered';
  loadGuess = true;

  pressGetClue(){
    this.getClue.emit();
  };

  sendGuess(input: string){
    console.log("Input: ", this.childGuess);
    this.childGuess = '';
    
    this.getGuess.emit(input);
  }

  keydownDetect(event: KeyboardEvent, value: string){
    if(event.key == "Enter"){
      this.childGuess = '';
      this.getGuess.emit(value);
    }
  }

  start(){
    this.startGame.emit();
  }

  restart(){
    this.answer = 'unanswered'
    this.retry.emit();
  }

  sendShowRules(show: boolean) {
    this.show.emit(show);
  }

  triggerParentNewPokemon() {
    this.answer = 'unanswered'
    const answerDto = new AnswersDto({
      id: this.pokeNumber,
      correct: true,
      idFormated: this.pokeNumberFormated
    })
    this.addPokeAnswer.emit(answerDto);
    this.nextPokemonLevel.emit();
  }
}
