module App.Algorithms {
    export class KMedias {
        name: string;
        v: Array<Array<number>>;
        vAnt: Array<Array<number>>;
        b: number;
        e: number;
        numClases: number;
        numMuestras: number;
        numDatosMuestra: number;
        data: Array<Array<string>>;
        
        constructor(data: Array<Array<string>>) {
            this.b = 2; //peso exponencial
            this.e = 0.01;  //tolerancia
            this.data = data;
            //1. Extraer el numero de muestras a utilizar y el numero de clases
            this.numClases = this.getNumClasesFromData(data);
            this.numMuestras = data.length;
            this.numDatosMuestra = 0;
            if (this.data)
                this.numDatosMuestra = data[0].length - 1;
            //Inicializamos los centros V
            this.v = [];
            this.v[0] = [4.6, 3.0, 4.0, 0.0];
            this.v[1] = [6.8, 3.4, 4.6, 0.7];
        }

  

        public start(): void {
            //Primera vuelta
            let dist: Array<Array<number>> = this.getDistance();
            let U: Array<Array<number>> = this.getPertenence(dist);
            //Calculamos los nuevos centros
            this.calculateNewCenters(U);
            while (!this.centersLessThanE()) {
                dist = this.getDistance();
                U = this.getPertenence(dist);
                this.calculateNewCenters(U);
            }
            console.log(this.v);
            //U[i][j] = this.pertenencia(dist);

        }

        private centersLessThanE(): boolean {
            let res: Array<number> = [];
            let centerLessE: boolean = true;
            let i : number = 0;
            while(centerLessE && i < this.numClases) {
                res[i] = 0;
                for (let j = 0; j < this.numDatosMuestra; j++)
                    res[i] += this.moduloDifCuad(this.vAnt[i][j], this.v[i][j]);
                if(res[i] > this.e)
                    centerLessE = false;
                i++;
            }
            return centerLessE;
        }

        private calculateNewCenters(U: Array<Array<number>>): void {
            this.vAnt = []
            for(let i = 0;i < this.v.length; i++)
                this.vAnt[i] = this.v[i];
                
            for (let i = 0; i < this.numClases; i++)
                this.v[i] = this.calculateCenter(U[i]);
        }

        private calculateCenter(Ui: Array<number>): Array<number> {
            let numerador: Array<number> = [];
            let denom: Array<number> = [];
            let result: Array<number> = [];
            //Inicializamos a 0
            for (let i = 0; i < this.numDatosMuestra; i++) {
                denom[i] = 0;
                numerador[i] = 0;
            }
            //Calculamos numerador y denom
            for (let i = 0; i < this.numMuestras; i++) {
                for (let j = 0; j < this.numDatosMuestra; j++) {
                    numerador[j] += Math.pow(Ui[i], this.b) * Number(this.data[i][j]);
                    denom[j] += Math.pow(Ui[i], this.b);
                }
            }
            for (let i = 0; i < this.numDatosMuestra; i++)
                result[i] = numerador[i] / denom[i];

            return result;
        }

        private getDistance(): Array<Array<number>> {
            let dist: Array<Array<number>> = [];
            for (let i = 0; i < this.numClases; i++)
                for (let j = 0; j < this.data.length; j++) {
                    if (!dist[i])
                        dist[i] = [];
                    dist[i][j] = this.distancia(this.data[j], this.v[i]);
                }
            return dist;
        }

        private getPertenence(dist: Array<Array<number>>) {
            let U: Array<Array<number>> = [];
            for (let i = 0; i < this.numClases; i++)
                for (let j = 0; j < this.data.length; j++) {
                    if (!U[i])
                        U[i] = [];
                    U[i][j] = this.pertenencia(dist, i, j);
                }
            return U;
        }

        private pertenencia(distance: Array<Array<number>>, row: number, col: number): number {
            let numerador = Math.pow((1 / distance[row][col]), (1 / (this.b - 1)));
            let denominador = 0;
            for (let i = 0; i < this.b; i++)
                denominador += Math.pow(1 / distance[i][col], (1 / (this.b - 1)));

            return numerador / denominador;
        }

        private distancia(x: Array<string>, v: Array<number>): number {
            let res = 0;
            for (let i = 0; i < this.numDatosMuestra; i++)
                res += this.moduloDifCuad(Number(x[i]), v[i]);
            return res;
        }

        private moduloDifCuad(xi: number, vi: number): number {
            return Math.pow(Math.abs(xi - vi), 2);
        }


        //Obtenemos el numero de clases K
        private getNumClasesFromData(data: Array<Array<string>>): number {
            let pos = 0;
            if (data[0])
                pos = data[0].length - 1;
            let classes: Array<string> = [];
            for (let i = 0; i < data.length; i++) {
                if (classes.indexOf(data[i][pos].trim()) === -1)
                    classes.push(data[i][pos].trim());
            }

            return classes.length;
        }

    }


}
