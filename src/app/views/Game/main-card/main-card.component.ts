import { Component, EventEmitter, Input, OnChanges, Output, ChangeDetectorRef, SimpleChanges} from '@angular/core';
import { CardModule } from 'primeng/card';
import { Button, ButtonModule } from 'primeng/button';
import { PokemonDataDto } from '../../../Dtos/Pokemon/PokemonData/pokemon-dataDto';

@Component({
  selector: 'app-main-card',
  imports: [CardModule, Button, ButtonModule],
  template: `
    <p-card [style]="{ width: '25rem', overflow: 'hidden', backgroundColor: 'black'}" class="text-center">
    @if(!isLoading){
    <!-- Aca si saco el ng-template y solo dejo la img funciona correctamente, investigar -->
      <ng-template #header>
        <img alt="Card" class="w-full" [src]="'/PokedexImages/images/'+this.pokeNumberFormated+'.png'" />
      </ng-template>
      <ng-template #title> {{this.pokemonDataDto.name}}</ng-template>

      <div class="flex justify-center gap-4">
      @for(type of this.pokemonDataDto.types; track type.slot){
        <p>
        <span>
        <img class="substitute" src="/PokedexImages/Type-Icons/types/{{type.type.name}}.png" alt="">
        </span>
      </p>
      }
      </div>
      <ng-template #subtitle> #{{this.pokemonDataDto.id}}</ng-template>
    }
    @else{
      <ng-template #header>
      <img alt="Card" class="w-full" src="/Img/icon-Pokeball.png" />
      </ng-template>
      <ng-template #subtitle> Subtitle</ng-template>
    }
    <div class="flex justify-center gap-4">

    @for(_ of [].constructor(lives); track $index) {
      <span><img class="substitute" src="/Img/substitute.png" alt=""></span>
    }
    </div>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
    </p>
    <ng-template #footer>
        <div class="flex gap-4 mt-1">
            <p-button label="New Pokemon" (click)="triggerParentNewPokemon();" class="w-full" [outlined]="true" styleClass="w-full" />
            <p-button label="Save" class="w-full" styleClass="w-full" />
            <p-button label="Rules"(click)="sendShowRules(true)"/>
        </div>
    </ng-template>
</p-card>
  `,
  styles: [`
  p-card{
    margin: 2rem;
  }
  .substitute{
    width: 5rem;
  }
  `]
})

export class MainCardComponent{
  @Input() lives = 0;
  @Input() pokeNumber = 0;
  @Input() pokeNumberFormated = '';
  @Input() pokemonDataDto!: PokemonDataDto;
  @Input() pokeName = '';
  @Input() isLoading: boolean = true;
  @Output() show = new EventEmitter<boolean>();
  @Output() getNewPokemonApi = new EventEmitter<void>();

  shouldRender: boolean = true;
  

  sendShowRules(show: boolean) {
    this.show.emit(show);
    console.log("from rules: "+this.isLoading+" number: "+this.pokeNumber)
  }

 triggerParentNewPokemon(){
    this.getNewPokemonApi.emit();
  }

}
