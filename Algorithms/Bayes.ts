module App.Algorithms {
    declare var math: any;
    export class Bayes extends Algorithm {
        d: number;
        f: number[][];
        C: number[][][];
        m: number[][];
        estimation: number[];
        constructor(data: Array<Array<any>>) {
            super(data);
            this.C = [];
            for (let i = 0; i < this.numClases; i++)
                this.C[i] = [];
            this.m = [];
            $("#BayesClases").text("Número de clases: " + this.numClases);
            $("#BayesMuestras").text("Número de muestras: " + this.numMuestras);
            $("#BayesDatos").text("Número de datos por muestra: " + this.numDatosMuestra);
        }
        public start(): void {
            for (let i = 0; i < this.numClases; i++) {
                this.m[i] = this.calculateMi(this.classes[i]);
                this.C[i] = this.calculateCi(this.classes[i]);
            }
            this.showMs();
            this.showCov();
            $("#casoBayes").show();
        }

        private showMs(){
            let text1 = "m1: ";
            let text2 = "m2: ";
            for(let i = 0; i < this.m[0].length; i++){
                if(i == this.m[0].length - 1){
                    text1+= this.m[0][i].toFixed(3);
                    text2+= this.m[1][i].toFixed(3);
                }
                else{
                    text1+= this.m[0][i].toFixed(3) + ", "
                    text2+= this.m[1][i].toFixed(3) + ", "
                }
                
            }
            $("#m1Bayes").text(text1);
            $("#m2Bayes").text(text2);
        }

        private showCov(){
            let table1 = $("#CovarianzaBayes1");
            let table2 = $("#CovarianzaBayes2");
            for(let i = 0; i < this.C[0].length; i++){
                let tr1 = $("<tr>");
                let tr2 = $("<tr>");
                for(let j = 0; j < this.C[0][0].length; j++){
                    let td1 = $("<td>");
                    let td2 = $("<td>");
                    td1.text(this.C[0][i][j].toFixed(3));
                    td2.text(this.C[1][i][j].toFixed(3));
                    tr1.append(td1);
                    tr2.append(td2);
                }
                table1.append(tr1);
                table2.append(tr2);
            }
        }
        

        private calculateMi(className: string): number[] {
            let mi: number[] = [];
            for (let i = 0; i < this.numDatosMuestra; i++)
                mi[i] = 0;
            let count = 0;
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i][this.numDatosMuestra] === className) {
                    for (let j = 0; j < this.numDatosMuestra; j++)
                        mi[j] += this.data[i][j];
                    count++;
                }
            }
            for (let i = 0; i < this.numDatosMuestra; i++) {
                mi[i] = mi[i] / count;
            }
            return mi;
        }

        //Obtenemos C        
        //Matriz de 3x3
        private calculateCi(className: string): number[][] {
            let C: number[][] = [];
            for (let i = 0; i < this.numDatosMuestra; i++)
                for (let j = 0; j < this.numDatosMuestra; j++) {
                    if (!C[i])
                        C[i] = [];
                    C[i][j] = 0;
                }

            let count = 0;
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i][this.numDatosMuestra] === className) {
                    //ir sumando a la matriz C
                    C = this.matrixAddmatrix(C, this.calculateCiHelper(className, this.data[i]));
                    count++;
                }
            }
            for (let i = 0; i < C.length; i++)
                for (let j = 0; j < C.length; j++)
                    C[i][j] = C[i][j] / count;
            return C;
        }



        private matrixAddmatrix(m1: number[][], m2: number[][]): number[][] {
            let res: number[][] = [];
            //matriz cuadrada
            for (let i = 0; i < m1.length; i++) {
                res[i] = [];
                for (let j = 0; j < m1.length; j++)
                    res[i][j] = m1[i][j] + m2[i][j];
            }
            return res;
        }

        private calculateCiHelper(className: string, xi: number[]): number[][] {
            let xilessmi: number[];
            let classIndx = this.classes.indexOf(className);
            //calcular xi - mclase
            xilessmi = this.getXiLessMc(xi, this.m[classIndx]);
            //multiplicar
            let res: number[][] = [];
            for (let i = 0; i < this.numDatosMuestra; i++) {
                for (let j = 0; j < this.numDatosMuestra; j++) {
                    if (!res[i])
                        res[i] = [];
                    res[i][j] = Number(xilessmi[i]) * Number(xilessmi[j]);
                }
            }
            return res;
        }

        private getXiLessMc(xi: number[], mc: number[]): number[] {
            let xilessmi: number[] = [];
            for (let i = 0; i < this.numDatosMuestra; i++)
                xilessmi[i] = Number(xi[i]) - mc[i];
            return xilessmi;
        }

        public checkCase(data: Array<Array<any>>): boolean {
            let max = Number.MIN_VALUE;//ojito
            let index = 0;
            let d;
            for (let i = 0; i < this.numClases; i++) {
                d = this.estimateMaxVer(i, data[0]);
                if (d > max) {
                    max = d;
                    index = i;
                }
            }
            alert("Resultado: "  + this.classes[index]);

            let classIndx = this.classes.indexOf(data[0][this.numDatosMuestra]);
            return index === classIndx;
        }

        private estimateMaxVer(classIndex: number, data: any[]): number {
            return this.getBase(classIndex) * Math.pow(Math.E, this.getExp(classIndex, data));
        }

        private getBase(classIndex: number): number {
            return 1 / (Math.pow(2 * Math.PI, (this.numDatosMuestra / 2)) * Math.pow(math.det(this.C[classIndex]), 1 / 2))
        }

        private getExp(classIndex: number, data: any[]): number {
            let xiLessM = this.getXiLessMc(data, this.m[classIndex]);
            let CInverse = math.inv(this.C[classIndex]);
            //multiplicar horizontal por inversa por vertical aqui:
            let temp: number[] = [];
            for(let i = 0; i < xiLessM.length; i++){
                temp[i] = 0;
                for(let j = 0; j < xiLessM.length; j++){
                    temp[i] += xiLessM[j]*CInverse[j][i];
                }
            }
            let result:number = 0;
            for(let i = 0; i < temp.length; i++)
                result += temp[i]*xiLessM[i];
            return -result / 2;
        }

    }
}