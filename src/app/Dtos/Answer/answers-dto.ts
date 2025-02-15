export class AnswersDto {
    id!: number;
    correct!: boolean;
    idFormated!: string; 

    constructor(data?: IAnswerDto) {
        if (data) {
          for (var property in data) {
            if (data.hasOwnProperty(property))
              (<any>this)[property] = (<any>data)[property];
          }
        }
      }
}

interface IAnswerDto{
    id: number;
    correct: boolean;
    idFormated: string
}
