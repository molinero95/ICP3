module App.Algorithms {
    export class Bayes extends Algorithm {
        d: number;
        f: number[][];
        constructor(data: Array<Array<any>>){
            super(data);
            $("#BayesClases").text("Número de clases: "+this.numClases);
            $("#BayesMuestras").text("Número de muestras: "+this.numMuestras);
            $("#BayesDatos").text("Número de datos por muestra: "+this.numDatosMuestra);
        }
        public start():void{
            for(let i = 0; i < this.numDatosMuestra; i++){
                for(let j = 0; j < this.numClases; j++){
                    //this.f[i][j] = 
                }
            }
        }
        public checkCase(data: Array<Array<any>>): boolean{
            return true;
        }
        
    }
}