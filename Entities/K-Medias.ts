module App.Entities {

    export class KMedias implements Algorithm {
        v: Array<Array<number>>;
        b: number;
        e: number;
        c: number;
        constructor() {
            //Inicializamos los valores.
            this.v = [];
            this.v[0] = [4.6, 3.0, 4.0, 0.0];
            this.v[1] = [6.8, 3.4, 4.6, 0.7];
            this.b = 2;
            this.e = 0.01;
            this.c = 2;
        }

        start(): void {

        }

        private pertenencia(x: Array<number>, v: Array<number>): number {
            return this.moduloDifCuad(x[0], v[0]) + this.moduloDifCuad(x[1], v[1]);
        }

        private moduloDifCuad(xi: number, vi: number): number {
            return Math.pow(Math.abs(xi - vi),2);
        }
    }
}