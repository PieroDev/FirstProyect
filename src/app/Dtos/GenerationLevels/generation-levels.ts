export class GenerationLevels {
    readonly generation: number;
    readonly start: number;
    readonly end: number; 

    constructor(generation: number, start: number, end: number){
        this.generation = generation
        this.start = start
        this.end = end
    }
}

export const myData: GenerationLevels[]= [
    new GenerationLevels(1, 1, 151),
    new GenerationLevels(2, 152, 251),
    new GenerationLevels(3, 252, 386),
    new GenerationLevels(4, 387, 493),
    new GenerationLevels(5, 494, 649),
    new GenerationLevels(6, 650, 721),
    new GenerationLevels(7, 722, 809),
    new GenerationLevels(8, 810, 898),
    new GenerationLevels(9, 899, 905),
]
    
