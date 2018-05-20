var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var App;
(function (App) {
    var Algorithms;
    (function (Algorithms) {
        var KMedias = (function (_super) {
            __extends(KMedias, _super);
            function KMedias(data) {
                var _this = _super.call(this, data) || this;
                $("#kMediasClases").text("Número de clases: " + _this.numClases);
                $("#kMediasMuestras").text("Número de muestras: " + _this.numMuestras);
                $("#kMediasDatos").text("Número de datos por muestra: " + _this.numDatosMuestra);
                _this.b = 2;
                _this.e = 0.01;
                _this.v = [];
                _this.v[0] = [4.6, 3.0, 4.0, 0.0];
                _this.v[1] = [6.8, 3.4, 4.6, 0.7];
                return _this;
            }
            KMedias.prototype.start = function () {
                var dist = this.getDistance(this.data);
                var U = this.getPertenence(dist, this.data);
                this.calculateNewCenters(U);
                while (!this.centersLessThanE(this.vAnt)) {
                    dist = this.getDistance(this.data);
                    U = this.getPertenence(dist, this.data);
                    this.calculateNewCenters(U);
                }
                $("#casoKMedias").show();
            };
            KMedias.prototype.checkCase = function (data) {
                var dist = this.getDistance(data);
                var pertenence = this.getPertenence(dist, data);
                console.log(pertenence);
                var index = this.getClass(pertenence);
                console.log(index);
                alert("Resultado: " + this.classes[index]);
                return data[0][data[0].length - 1] === this.classes[index];
            };
            KMedias.prototype.getClass = function (array) {
                var max = 0;
                var index = 0;
                for (var i = 0; i < array.length; i++) {
                    if (array[i][0] > max) {
                        max = array[i][0];
                        index = i;
                    }
                }
                return index;
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
            KMedias.prototype.getDistance = function (data) {
                var dist = [];
                for (var i = 0; i < this.numClases; i++)
                    for (var j = 0; j < data.length; j++) {
                        if (!dist[i])
                            dist[i] = [];
                        dist[i][j] = this.distance(data[j], this.v[i]);
                    }
                return dist;
            };
            KMedias.prototype.getPertenence = function (dist, data) {
                var U = [];
                for (var i = 0; i < this.numClases; i++)
                    for (var j = 0; j < data.length; j++) {
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
            return KMedias;
        }(Algorithms.Algorithm));
        Algorithms.KMedias = KMedias;
    })(Algorithms = App.Algorithms || (App.Algorithms = {}));
})(App || (App = {}));
//# sourceMappingURL=K-Medias.js.map