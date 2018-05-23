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
            Algorithm.prototype.distance = function (x, v) {
                var res = 0;
                for (var i = 0; i < this.numDatosMuestra; i++)
                    res += this.moduloDifCuad(Number(x[i]), v[i]);
                return res;
            };
            Algorithm.prototype.moduloDifCuad = function (xi, vi) {
                return Math.pow(Math.abs(xi - vi), 2);
            };
            Algorithm.prototype.centersLessThanE = function (vAnt) {
                var res = [];
                var centerLessE = true;
                var i = 0;
                while (centerLessE && i < this.numClases) {
                    res[i] = 0;
                    for (var j = 0; j < this.numDatosMuestra; j++)
                        res[i] += this.moduloDifCuad(vAnt[i][j], this.v[i][j]);
                    res[i] = Math.sqrt(res[i]);
                    if (res[i] > this.e)
                        centerLessE = false;
                    i++;
                }
                return centerLessE;
            };
            return Algorithm;
        }());
        Algorithms.Algorithm = Algorithm;
    })(Algorithms = App.Algorithms || (App.Algorithms = {}));
})(App || (App = {}));
//# sourceMappingURL=Algorithm.js.map