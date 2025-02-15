import { TypesDto } from "./Types/typesDto";

export class PokemonDataDto {
  id!: number;
  name!: string;
  types!: TypesDto[];
  url!: string;

  constructor(data?: IPokemonDataDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.id = _data["id"];
      this.name = _data["name"];
      this.url = _data["url"];
      if (Array.isArray(_data["types"])) {
        this.types = [] as any;
        for (let item of _data["types"])
          this.types!.push(new TypesDto(item));
      }
    }
  }

  static fromJS(data: any): PokemonDataDto {
    data = typeof data === 'object' ? data : {};
    let result = new PokemonDataDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["url"] = this.url;
    if (Array.isArray(this.types)) {
      data["types"] = [];
      for (let item of this.types)
        data["types"].push(item);
    }
    return data;
  }

  clone(): PokemonDataDto {
    const json = this.toJSON();
    let result = new PokemonDataDto();
    result.init(json);
    return result;
  }
}

interface IPokemonDataDto {
  id: number;
  name: string;
  types: TypesDto[];
  url: string
}