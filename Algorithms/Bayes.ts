module App.Algorithms {
    export class Bayes extends Algorithm {
        constructor(data: Array<Array<string>>){
            super(data);
        }
        public start():void{

        }
        public checkCase(data: Array<Array<string>>): boolean{
            return true;
        }
    }
}