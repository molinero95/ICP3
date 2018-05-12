var App;
(function (App) {
    var Algorithms;
    (function (Algorithms) {
        var Algorithm = (function () {
            function Algorithm(data) {
                this.data = data;
                this.getNumClasesFromData(data);
                this.numClases = this.classes.length;
                this.numMuestras = data.length;
                this.numDatosMuestra = 0;
                if (this.data)
                    this.numDatosMuestra = data[0].length - 1;
            }
            Algorithm.prototype.getNumClasesFromData = function (data) {
                var pos = 0;
                if (data[0])
                    pos = data[0].length - 1;
                this.classes = [];
                for (var i = 0; i < data.length; i++) {
                    if (this.classes.indexOf(data[i][pos].trim()) === -1)
                        this.classes.push(data[i][pos].trim());
                }
                console.log(this.classes);
            };
            return Algorithm;
        }());
        Algorithms.Algorithm = Algorithm;
    })(Algorithms = App.Algorithms || (App.Algorithms = {}));
})(App || (App = {}));
//# sourceMappingURL=Algorithm.js.map