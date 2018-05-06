module App.Entities {

    export class KMedias implements Algorithm {
        v: Array<Array<number>>;
        b: number;
        e: number;
        c: number;
        data: Array<number>;
        constructor(data: Array<number>) {
            //Inicializamos los valores.
            this.v = [];
            this.v[0] = [4.6, 3.0, 4.0, 0.0];
            this.v[1] = [6.8, 3.4, 4.6, 0.7];
            this.b = 2;
            this.e = 0.01;
            this.c = 2;
            this.data = data;
        }

        start(): void {
            
        }

        private pertenencia(x: Array<number>, v: Array<number>, c: number): number {
            let res = 0;
            for(let i = 0;i < c; i++)
                res += this.moduloDifCuad(x[i], v[i]);
            return res;
        }

        private moduloDifCuad(xi: number, vi: number): number {
            return Math.pow(Math.abs(xi - vi),2);
        }
    }
}