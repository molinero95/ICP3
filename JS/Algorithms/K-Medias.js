var App;
(function (App) {
    var Algorithms;
    (function (Algorithms) {
        var KMedias = (function () {
            function KMedias(data) {
                this.b = 2;
                this.e = 0.01;
                this.data = data;
                this.numClases = this.getNumClasesFromData(data);
                this.numMuestras = data.length;
                this.numDatosMuestra = 0;
                if (this.data)
                    this.numDatosMuestra = data[0].length - 1;
                this.v = [];
                this.v[0] = [4.6, 3.0, 4.0, 0.0];
                this.v[1] = [6.8, 3.4, 4.6, 0.7];
            }
            KMedias.prototype.start = function () {
                var dist = this.getDistance();
                var U = this.getPertenence(dist);
                this.calculateNewCenters(U);
                while (!this.centersLessThanE()) {
                    dist = this.getDistance();
                    U = this.getPertenence(dist);
                    this.calculateNewCenters(U);
                }
                console.log(this.v);
            };
            KMedias.prototype.centersLessThanE = function () {
                var res = [];
                var centerLessE = true;
                var i = 0;
                while (centerLessE && i < this.numClases) {
                    res[i] = 0;
                    for (var j = 0; j < this.numDatosMuestra; j++)
                        res[i] += this.moduloDifCuad(this.vAnt[i][j], this.v[i][j]);
                    if (res[i] > this.e)
                        centerLessE = false;
                    i++;
                }
                return centerLessE;
            };
            KMedias.prototype.calculateNewCenters = function (U) {
                this.vAnt = [];
                for (var i = 0; i < this.v.length; i++)
                    this.vAnt[i] = this.v[i];
                for (var i = 0; i < this.numClases; i++)
                    this.v[i] = this.calculateCenter(U[i]);
            };
            KMedias.prototype.calculateCenter = function (Ui) {
                var numerador = [];
                var denom = [];
                var result = [];
                for (var i = 0; i < this.numDatosMuestra; i++) {
                    denom[i] = 0;
                    numerador[i] = 0;
                }
                for (var i = 0; i < this.numMuestras; i++) {
                    for (var j = 0; j < this.numDatosMuestra; j++) {
                        numerador[j] += Math.pow(Ui[i], this.b) * Number(this.data[i][j]);
                        denom[j] += Math.pow(Ui[i], this.b);
                    }
                }
                for (var i = 0; i < this.numDatosMuestra; i++)
                    result[i] = numerador[i] / denom[i];
                return result;
            };
            KMedias.prototype.getDistance = function () {
                var dist = [];
                for (var i = 0; i < this.numClases; i++)
                    for (var j = 0; j < this.data.length; j++) {
                        if (!dist[i])
                            dist[i] = [];
                        dist[i][j] = this.distancia(this.data[j], this.v[i]);
                    }
                return dist;
            };
            KMedias.prototype.getPertenence = function (dist) {
                var U = [];
                for (var i = 0; i < this.numClases; i++)
                    for (var j = 0; j < this.data.length; j++) {
                        if (!U[i])
                            U[i] = [];
                        U[i][j] = this.pertenencia(dist, i, j);
                    }
                return U;
            };
            KMedias.prototype.pertenencia = function (distance, row, col) {
                var numerador = Math.pow((1 / distance[row][col]), (1 / (this.b - 1)));
                var denominador = 0;
                for (var i = 0; i < this.b; i++)
                    denominador += Math.pow(1 / distance[i][col], (1 / (this.b - 1)));
                return numerador / denominador;
            };
            KMedias.prototype.distancia = function (x, v) {
                var res = 0;
                for (var i = 0; i < this.numDatosMuestra; i++)
                    res += this.moduloDifCuad(Number(x[i]), v[i]);
                return res;
            };
            KMedias.prototype.moduloDifCuad = function (xi, vi) {
                return Math.pow(Math.abs(xi - vi), 2);
            };
            KMedias.prototype.getNumClasesFromData = function (data) {
                var pos = 0;
                if (data[0])
                    pos = data[0].length - 1;
                var classes = [];
                for (var i = 0; i < data.length; i++) {
                    if (classes.indexOf(data[i][pos].trim()) === -1)
                        classes.push(data[i][pos].trim());
                }
                return classes.length;
            };
            return KMedias;
        }());
        Algorithms.KMedias = KMedias;
    })(Algorithms = App.Algorithms || (App.Algorithms = {}));
})(App || (App = {}));
//# sourceMappingURL=K-Medias.js.map