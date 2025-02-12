import { TypesDto } from "./Types/typesDto";

export class PokemonDataDto {
    id: number;
    name: string;
    types: TypesDto[];
    url: string

  constructor(id: number, name: string, types: TypesDto[], url: string) {
    this.id = id;
    this.name = name;
    this.types = types;
    this.url = url
  }
}
