"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Algorithms;
(function (Algorithms) {
    var KMedias = (function () {
        function KMedias(data) {
            this.v = [];
            this.v[0] = [4.6, 3.0, 4.0, 0.0];
            this.v[1] = [6.8, 3.4, 4.6, 0.7];
            this.b = 2;
            this.e = 0.01;
            this.numJ = 4;
            this.data = data;
        }
        KMedias.prototype.start = function () {
            var dist = this.getDistance();
            var U = this.getPertenence(dist);
        };
        KMedias.prototype.getDistance = function () {
            var dist = [];
            for (var i = 0; i < this.numJ; i++)
                for (var j = 0; j < this.data.length; j++)
                    dist[i][j] = this.distancia(this.data[j], this.v[i], this.numJ);
            return dist;
        };
        KMedias.prototype.getPertenence = function (dist) {
            var U = [];
            for (var i = 0; i < this.numJ; i++)
                for (var j = 0; j < this.data.length; j++)
                    U[i][j] = this.pertenencia(dist, i, j);
            return U;
        };
        KMedias.prototype.pertenencia = function (distance, row, col) {
            var numerador = Math.pow((1 / distance[row][col]), (1 / (this.b - 1)));
            var denominador = 0;
            for (var i = 0; i < this.data.length; i++)
                denominador += Math.pow(distance[i][col], (1 / (this.b - 1)));
            return numerador / denominador;
        };
        KMedias.prototype.distancia = function (x, v, c) {
            var res = 0;
            for (var i = 0; i < c; i++)
                res += this.moduloDifCuad(Number(x[i]), v[i]);
            return res;
        };
        KMedias.prototype.moduloDifCuad = function (xi, vi) {
            return Math.pow(Math.abs(xi - vi), 2);
        };
        return KMedias;
    }());
    Algorithms.KMedias = KMedias;
})(Algorithms = exports.Algorithms || (exports.Algorithms = {}));
//# sourceMappingURL=K-Medias.js.map