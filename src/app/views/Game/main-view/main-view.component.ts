import { BrowserModule } from '@angular/platform-browser';
import { effect, NgModule, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Component, inject, resource } from '@angular/core';
import { MainCardComponent } from '../main-card/main-card.component';
import { FlexTestComponent } from '../flex-test/flex-test.component';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../../../services/api.service';
import { PokemonDataDto } from '../../../Dtos/Pokemon/PokemonData/pokemon-dataDto';
import { AnswersDto } from '../../../Dtos/Answer/answers-dto';
import { GenerationLevels, myData } from '../../../Dtos/GenerationLevels/generation-levels';

@Component({
  selector: 'app-main-view',
  imports: [MainCardComponent, DrawerModule, ButtonModule],
  providers: [],
  template: `
  <body>
    <div class="flex-column-container">
    <img class="logo" src="/Img/logo.png" alt="">
    <app-main-card
          [generation]=generation
          [lives]=lives
          [level]=level
          [clues]=clues
          [pokeNumber]=pokeNumber
          [pokeNumberFormated] =pokeNumberFormated
          [pokeName] = pokeName
          [pokemonDataDto] = pokeNewDataDto
          (show)=getShowRules($event)
          (nextPokemonLevel)=nextPokemonLevel()
          [isLoading] = isLoadingData()
          (retry)=retry()
          (startGame)=start()
          [startLevel]=startLevel()
          (addPokeAnswer)="addPokeAnswer($event)"
          [answersData]=pokeAnswers
          [pokeNameFormated]=pokeNameFormated
          (getClue)="getClue()"
          (getGuess)="getGuess($event)"
          [actualClue]="actualClue"
          [guessResult]="guessResult"
        >
      </app-main-card>
      
      
    </div>
    <div class="flex-row-container">
    <!-- <app-flex-test></app-flex-test> -->
  <div class="card flex justify-center">
    <p-drawer [(visible)]="showRule" header="Game Rules" styleClass="!w-full md:!w-80 lg:!w-[30rem]" >
    <ul class="list-disc">
      <li class="mt-2">Every time you fail a guess, you lose 1 life out of 3</li>
      <li class="mt-2">You have 3 
      <span>
          <img class="rulesIcon" src="/Img/substitute.png" alt="Lives Icon">
        </span>
        (clues) for each pokemon, you can get a clue pressing the 
        <span>
          <img class="rulesIcon" src="/Img/lens.webp" alt="Clue Icon">
        </span> button
      </li>
      <li class="mt-2">Each three pokemon that you guess, you'll advance to the next generation.</li>
      <li class="mt-2">Press ⏎ (Enter) or the 
        <span>
          <img class="rulesIcon" src="/Img/icon-Pokeball.png" alt="Guess Icon">
        </span> to make your guess.
      </li>
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
    height: 100vh;
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
  .rulesIcon{
    height: 2rem;
    display: inline-block;
  }
  .logo{
    width: 25rem;
  }
  
  `]

}
)
export class MainViewComponent {
  private getNewPokemon = inject(ApiService);
  public generationsArray: GenerationLevels[];
  showRule = signal(false);
  isLoadingData = signal(true);
  startAgain = signal(true);
  startLevel = signal(true);
  generation = 1;
  lives = 3;
  clues = 3;
  level = 0;
  pokeNumber = 0;
  pokeNumberFormated = '';
  pokeNameFormated = '';
  pokeName = '';
  pokeNewDataDto!: PokemonDataDto;
  pokeAnswers: AnswersDto[] = []
  guess = '';
  actualClue='';
  guessResult = 'unanswered'

  constructor(){
    this.generationsArray = myData
  }

  start(){
    this.resetGameData();
  }

  retry(){
    this.resetGameData();
  }

  resetGameData(){
    this.generation = 1;
    this.clues = 3;
    this.lives = 3;
    this.level = 0;
    this.isLoadingData.set(true);
    this.pokeNumber = 0;
    this.pokeNumberFormated = '';
    this.pokeNameFormated = '';
    this.pokeAnswers = [];
    this.nextPokemonLevel();
    this.startLevel.set(false);
  }

  getClue(){
    if(this.pokeNewDataDto.name != this.actualClue && this.clues > 0){
      this.clues--;
      console.log(this.pokeNewDataDto.name);
      if(this.actualClue == ''){
        this.actualClue = this.initializeCreatedString(this.pokeNewDataDto.name)
        console.log(this.actualClue)
      }
      this.actualClue = this.revealRandomCharacter(this.pokeNewDataDto.name, this.actualClue);
      console.log(this.actualClue);
    }
  }

  getShowRules(show: boolean) {
    this.showRule.set(show);
  }

  nextPokemonLevel(){
    this.actualClue='';
    this.clues = 3;
    if(this.level > 0 && this.level%3 == 0 ){
      this.generation++;
      console.log("generation: ", this.generation)
    }
    this.level++;
    this.startLevel.set(false);
    this.isLoadingData.set(true);
    this.getNewPokemonByApi();
  }

  getNewPokemonByApi() {
    let newPokeNumber = 0;
    let actualGenerationLevel = myData.find(x => x.generation == this.generation)
    do{
      newPokeNumber = Math.floor(Math.random() * (actualGenerationLevel?.end! - actualGenerationLevel?.start! + 1)) + actualGenerationLevel?.start!
    }
    while(newPokeNumber > 0 && this.pokeAnswers.some(x => x.id === newPokeNumber))

    this.pokeNumber = newPokeNumber;
    this.pokeNumberFormated = String(this.pokeNumber).padStart(3, '0');
    this.getNewPokemon
      .getPokemonData(this.pokeNumber)
      .subscribe(data => {
        this.pokeNewDataDto = data;
        this.pokeNameFormated = this.formatPokeName(this.pokeNewDataDto.name)
        this.isLoadingData.set(false);
      })
  }

  addPokeAnswer(answerDto: AnswersDto){
    this.pokeAnswers.push(answerDto);
  }

  formatPokeName(input: string){
    return input.replace(/./g, "_");
  }

  getGuess(input: string){
    console.log("getGuess: ",this.pokeNewDataDto.name);
    this.actualClue = this.pokeNewDataDto.name;
    const answerDto = new AnswersDto({
      id: this.pokeNumber,
      correct: true,
      idFormated: this.pokeNumberFormated
    })
    console.log("getGuess: ",input);
    if(input == this.pokeNewDataDto.name){
      this.setResponseResult('ok')
    }
    else{
      answerDto.correct = false;
      if(this.lives > 0){
        this.setResponseResult('fail')
        this.lives--;
      }
    }
    this.pokeAnswers.push(answerDto);
  }

  revealRandomCharacter(original: string, created: string): string {
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * original.length);
    } while (original[randomIndex] === created[randomIndex] || original[randomIndex] === ' ');
  
    return original.split('').map((char, i) => (i === randomIndex ? char : created[i])).join('');
  }

  initializeCreatedString(original: string): string {
    return original.split('').map(char => (char === ' ' ? ' ' : ' ')).join('');
  }

  setResponseResult(input: string){
    this.guessResult = input
    setTimeout(() => {
      this.guessResult = 'unanswered'
      this.nextPokemonLevel();
    }, 3000)
  }
}