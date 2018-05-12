module App.Algorithms {
    export abstract class Algorithm{
        numClases: number;
        numMuestras: number;
        numDatosMuestra: number;
        data: Array<Array<string>>;
        classes: Array<string>;

        constructor(data:Array<Array<string>>){
            this.data = data;
            this.getNumClasesFromData(data);
            this.numClases = this.classes.length;
            this.numMuestras = data.length;
            this.numDatosMuestra = 0;
            if (this.data)
                this.numDatosMuestra = data[0].length - 1;
        }

        //Obtenemos el numero de clases K
        private getNumClasesFromData(data: Array<Array<string>>): void {
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
        abstract checkCase(data: Array<Array<string>>): boolean
    }
}