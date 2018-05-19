module App.Algorithms {
    export class Bayes extends Algorithm {
        d: number;
        f: number[][];
        constructor(data: Array<Array<string>>){
            super(data);
        }
        public start():void{
            for(let i = 0; i < this.numDatosMuestra; i++){
                for(let j = 0; j < this.numClases; j++){
                    //this.f[i][j] = 
                }
            }
        }
        public checkCase(data: Array<Array<string>>): boolean{
            return true;
        }
        
    }
}