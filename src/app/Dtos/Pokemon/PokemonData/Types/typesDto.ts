import { TypeDto } from "../../PokemonTypes/Types/typeDto";

export class TypesDto {
  slot!: number;
  type!: TypeDto;

  constructor(data?: ITypesDto) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.slot = _data["slot"];
      this.type = _data["type"];
    }
  }

  static fromJS(data: any): TypesDto {
    data = typeof data === 'object' ? data : {};
    let result = new TypesDto();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["slot"] = this.slot;
    data["type"] = this.type;
    return data;
  }

  clone(): TypesDto {
    const json = this.toJSON();
    let result = new TypesDto();
    result.init(json);
    return result;
  }
}


interface ITypesDto {
  slot: number;
  type: TypeDto;
}