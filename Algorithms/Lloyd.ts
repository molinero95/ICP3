module App.Algorithms {
    export class Lloyd extends Algorithm {
        e: number;
        maxIter: number;
        y: number;
        v: number[][];
        constructor(data: Array<Array<string>>){
            super(data);
            $("#LloydClases").text("Número de clases: "+this.numClases);
            $("#LloydMuestras").text("Número de muestras: "+this.numMuestras);
            $("#LloydDatos").text("Número de datos por muestra: "+this.numDatosMuestra);
            this.e = Math.pow(10, -10);
            this.maxIter = 10;
            this.y = 0.1;
            this.v = [];
            this.v[0] = [4.6, 3.0, 4.0, 0.0];
            this.v[1] = [6.8, 3.4, 4.6, 0.7];
        }
        public start():void{
            let i: number = 0;
            let minValue: number;
            let minValIndex: number;
            let stop: boolean = false;
            let vAnt: number[][];
            while(i < this.maxIter && !stop){    //cada iteracion se compone en un paso por cada muestra
                vAnt = this.v.slice();
                for(let j = 0; j < this.data.length; j++){ //por cada muestra calculamos los centros con los centros
                    minValue = Number.MAX_VALUE;
                    minValIndex = 0;
                    for(let k = 0; k < this.v.length; k++) {
                       let data = this.getDistance(this.data[j], this.v[k]);
                       if(data < minValue){
                           minValIndex = k;
                           minValue = data;
                       }
                    }
                    //Una vez obtenido el menor valor calculamos el nuevo centro segun el minVal   
                    this.v[minValIndex] = this.calculateNewCenter(this.data[minValIndex], this.v[minValIndex]);
                }
                //Comprobamos los nuevos centros con los antiguos
                stop = this.anyCenterLessThanE(vAnt);
                i++;
            }
        }
        public checkCase(data: Array<Array<string>>): boolean{
            return true;
        }

        private anyCenterLessThanE(vAnt: number[][]): boolean {
            let lessThanE:boolean = false;
            let cal = 0;
            let i = 0;
            while(i < this.numClases && !lessThanE){
                cal = 0;
                for(let pos = 0; pos < this.numDatosMuestra; pos++){
                    cal += Math.pow((this.v[i][pos] - vAnt[i][pos]),2);
                }
                cal < this.e? lessThanE=true:lessThanE=false;
                i++;
            }
            return lessThanE;
        }

        private calculateNewCenter(xi: string[], vi: number[]): number[]{
            let res = [];
            for(let pos = 0; pos < this.numDatosMuestra; pos++){
                res[pos] = ((Number(xi[pos]) - vi[pos] )* this.y) + vi[pos];
            }
            return res;
        }
        private getDistance(xi:string[], vi:number[]):number{
            let res = 0;
            for(let pos = 0; pos < this.numDatosMuestra; pos++){
                res += Math.pow((Number(xi[pos]) - vi[pos]), 2)
            }
            return Math.pow(res, 1/2);
        }
        
    }
}