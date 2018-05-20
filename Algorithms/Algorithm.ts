module App.Algorithms {
    export abstract class Algorithm{
        numClases: number;
        numMuestras: number;
        numDatosMuestra: number;
        data: Array<Array<any>>;
        classes: Array<string>;
        e: number;
        v: number[][];
        constructor(data:Array<Array<any>>){
            this.data = data;
            this.getNumClasesFromData(data);
            this.numClases = this.classes.length;
            this.numMuestras = data.length;
            this.numDatosMuestra = 0;
            if (this.data)
                this.numDatosMuestra = data[0].length - 1;
        }

        //Obtenemos el numero de clases K
        private getNumClasesFromData(data: Array<Array<any>>): void {
            let pos = 0;
            if (data[0])
                pos = data[0].length - 1;
            this.classes = [];
            for (let i = 0; i < data.length; i++) {
                if (this.classes.indexOf(data[i][pos].trim()) === -1)
                this.classes.push(data[i][pos].trim());
            } 
            console.log(this.classes);
        }

        abstract start():void;
        abstract checkCase(data: Array<Array<any>>): boolean
        protected distance(x: Array<any>, v: Array<number>): number {
            let res = 0;
            for (let i = 0; i < this.numDatosMuestra; i++)
                res += this.moduloDifCuad(Number(x[i]), v[i]);
            return res;
        }

        protected moduloDifCuad(xi: number, vi: number): number {
            return Math.pow(Math.abs(xi - vi), 2);
        }

        protected centersLessThanE(vAnt: number[][]): boolean {
            let res: Array<number> = [];
            let centerLessE: boolean = true;
            let i: number = 0;
            while (centerLessE && i < this.numClases) {
                res[i] = 0;
                for (let j = 0; j < this.numDatosMuestra; j++)
                    res[i] += this.moduloDifCuad(vAnt[i][j], this.v[i][j]);
                if (res[i] > this.e)
                    centerLessE = false;
                i++;
            }
            return centerLessE;
        }
    }
}