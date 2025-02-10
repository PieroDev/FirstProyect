import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card, CardModule } from 'primeng/card';
import { Button, ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-main-card',
  imports: [CardModule, Button, ButtonModule],
  template: `
    <p-card [style]="{ width: '25rem', overflow: 'hidden', backgroundColor: '#F7F9F9'}" class="text-center">
    <ng-template #header>
      @if(pokeNumber !== 0) 
      {
        <img alt="Card" class="w-full" src="/PokedexImages/images/{{pokeNumberFormated}}.png" />
      }
      @else {
        <img alt="Card" class="w-full" src="/PokedexImages/images/{{pokeNumberFormated}}.png" />
      }
        
    </ng-template>
    <ng-template #title> {{pokeName + "#"+pokeNumber}}</ng-template>
    <ng-template #subtitle> Subtitle </ng-template>
    <div class="flex justify-center gap-4">
    @for(_ of [].constructor(lives); track _) {
      <span><img class="substitute" src="/Img/substitute.png" alt=""></span>
    }
    </div>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
        quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
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
export class MainCardComponent {
  @Input() lives = 0;
  @Input() pokeNumber = 0;
  @Input() pokeNumberFormated = '';
  @Input() pokeName = '';
  @Output() show = new EventEmitter<boolean>();
  @Output() getNewPokemonApi = new EventEmitter<void>();

  shouldRender: boolean = true;
  

  sendShowRules(show: boolean) {
    console.log(show);
    this.show.emit(show);
  }

  triggerParentNewPokemon(){
    this.getNewPokemonApi.emit();
  }

}
