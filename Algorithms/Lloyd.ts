module App.Algorithms {
    export class Lloyd extends Algorithm {
        e: number;
        maxIter: number;
        y: number;
        constructor(data: Array<Array<any>>){
            super(data);
            $("#LloydClases").text("Número de clases: "+this.numClases);
            $("#LloydMuestras").text("Número de muestras: "+this.numMuestras);
            $("#LloydDatos").text("Número de datos por muestra: "+this.numDatosMuestra);
            this.e = 0.0000000001;
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
                for(let j = 0; j < this.data.length; j++){ //por cada muestra calculamos los nuevos centros con los centros
                    minValue = Number.MAX_VALUE;
                    minValIndex = 0;
                    for(let k = 0; k < this.v.length; k++) {    //Obtenemos la distancia al centro mas cercano y el centro
                       let data = this.distance(this.data[j], this.v[k]);
                       if(data < minValue){
                           minValIndex = k;
                           minValue = data;
                       }
                    }
                    //Una vez obtenido el menor valor calculamos el nuevo centro segun el minVal   
                    this.v[minValIndex] = this.calculateNewCenter(this.data[j], this.v[minValIndex]);
                }
                //Comprobamos los nuevos centros con los antiguos
                stop = this.centersLessThanE(vAnt);
                i++;
            }
            $("#casoLloyd").show();               
        }
        public checkCase(data: Array<Array<any>>): boolean{
            let distances = [];
            let minD = Number.MAX_VALUE;
            let index = 0;
            for(let i = 0; i < this.numClases; i++){
                let d = this.distance(data[0], this.v[i]);
                if(d < minD){
                    minD = d;
                    index = i;
                }
            }
            alert("Resultado: "  + this.classes[index]);
            return this.classes[index] === data[0][this.numDatosMuestra].toString();
        }


        private calculateNewCenter(xi: any[], vi: number[]): number[]{
            let res = [];
            for(let pos = 0; pos < this.numDatosMuestra; pos++){
                res[pos] = ((Number(xi[pos]) - vi[pos] )* this.y) + vi[pos];
            }
            return res;
        }
        
    }
}