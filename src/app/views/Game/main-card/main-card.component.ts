import { Component, EventEmitter, Input, OnChanges, Output, input, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Button, ButtonModule } from 'primeng/button';
import { PokemonDataDto } from '../../../Dtos/Pokemon/PokemonData/pokemon-dataDto';

@Component({
  selector: 'app-main-card',
  imports: [CardModule, Button, ButtonModule],
  template: `
  <div class="mb-4 p-8 flex items-center justify-center">
    <p-card [style]="{ width: '25rem', height: '75vh' , overflow: 'hidden', backgroundColor: 'black'}" class="text-center">
    <!-- Aca si saco el ng-template y solo dejo la img funciona correctamente, investigar -->
    
    <ng-template #header> 
    <div [style]="{height: '100%'}">
    @if(!isLoading()){
     <img alt="CardImg" class="w-full mx-auto m-1 pokeImg" [src]="'/PokedexImages/images/'+this.pokeNumberFormated+'.png'" /> }
    @else{
      <img alt="CardImg" class="w-full mx-auto m-1 pokeImg" src="/Img/icon-Pokeball.png"/>
    }
    </div>
  </ng-template>
  
   <ng-template #subtitle [style]="{height: '2rem'}"> 
    @if(!isLoading()){
      <p>#{{this.pokemonDataDto.id}}</p>
    }
    @else{
      <p>Subtitle</p>
    }
  </ng-template>
   <ng-template #title [style]="{height: '5rem'}"> 
    @if(!isLoading()){
      <p>{{this.pokemonDataDto.name}}</p>
      
    }
    @else if(this.pokemonDataDto){
      <p>Loading...</p>
    }
    @else{
      <p>-</p>
    }
  </ng-template>
      <!-- <ng-template #title> {{this.pokemonDataDto.name}}</ng-template> -->

      @if(!isLoading()){
      <ng-template class="flex justify-center gap-4" [style]="{height: '5rem'}">
      @for(type of this.pokemonDataDto.types; track type.slot){
        <p>
        <span>
        <img class="substitute" title="{{type.type.name}}" src="/PokedexImages/Type-Icons/types/{{type.type.name}}.png" alt="{{type.type.name}}">
        </span>
      </p>
      }
      </ng-template>}
      <!-- <ng-template #subtitle> #{{this.pokemonDataDto.id}}</ng-template>
   
      <ng-template #header class="flex justify-center">
      </ng-template>
      <ng-template #subtitle> Subtitle</ng-template> -->
    <ng-template class="flex justify-center gap-4" [style]="{height: '5rem'}" >

    @for(_ of [].constructor(lives); track $index) {
      <span><img class="substitute" src="/Img/substitute.png" alt=""></span>
    }
    </ng-template>
    <ng-template #footer>
        <div class="flex gap-4 mt-1">
            <p-button label="New Pokemon" (click)="triggerParentNewPokemon();" class="w-full" [outlined]="true" styleClass="w-full" />
            <p-button label="Save" class="w-full" styleClass="w-full" />
            <p-button label="Rules"(click)="sendShowRules(true)"/>
        </div>
    </ng-template>
</p-card>
  </div>
  `,
  styles: [`
  p-card{
    margin: 2rem;
  }
  .substitute{
    width: 2rem;
  }
  .pokeImg{
    width: 15rem;
  }
  `]
})

export class MainCardComponent {
  @Input() lives = 0;
  @Input() pokeNumber = 0;
  @Input() pokeNumberFormated = '';
  @Input() pokemonDataDto!: PokemonDataDto;
  @Input() pokeName = '';
  isLoading = input(true);
  @Output() show = new EventEmitter<boolean>();
  @Output() getNewPokemonApi = new EventEmitter<void>();

  shouldRender: boolean = true;

  ngOnChanges(changes: SimpleChanges): void { console.log('Changes detected:', this.isLoading); }



  sendShowRules(show: boolean) {
    this.show.emit(show);
    console.log("from rules: " + this.isLoading + " number: " + this.pokeNumber)
    console.log("data:", this.pokemonDataDto);
  }

  triggerParentNewPokemon() {
    this.getNewPokemonApi.emit();
  }

}
