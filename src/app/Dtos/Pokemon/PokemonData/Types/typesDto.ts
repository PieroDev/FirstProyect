import { TypeDto } from "../../PokemonTypes/Types/typeDto";

export class TypesDto {
    slot: number;
    type: TypeDto;

    constructor(slot: number, type: TypeDto) {
        this.slot = slot;
        this.type = type;
      }


    
}
