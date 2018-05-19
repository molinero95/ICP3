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
        var Lloyd = (function (_super) {
            __extends(Lloyd, _super);
            function Lloyd(data) {
                var _this = _super.call(this, data) || this;
                $("#LloydClases").text("Número de clases: " + _this.numClases);
                $("#LloydMuestras").text("Número de muestras: " + _this.numMuestras);
                $("#LloydDatos").text("Número de datos por muestra: " + _this.numDatosMuestra);
                _this.e = Math.pow(10, -10);
                _this.maxIter = 10;
                _this.y = 0.1;
                _this.v = [];
                _this.v[0] = [4.6, 3.0, 4.0, 0.0];
                _this.v[1] = [6.8, 3.4, 4.6, 0.7];
                return _this;
            }
            Lloyd.prototype.start = function () {
                var i = 0;
                var minValue;
                var minValIndex;
                var stop = false;
                var vAnt;
                while (i < this.maxIter && !stop) {
                    vAnt = this.v.slice();
                    for (var j = 0; j < this.data.length; j++) {
                        minValue = Number.MAX_VALUE;
                        minValIndex = 0;
                        for (var k = 0; k < this.v.length; k++) {
                            var data = this.getDistance(this.data[j], this.v[k]);
                            if (data < minValue) {
                                minValIndex = k;
                                minValue = data;
                            }
                        }
                        this.v[minValIndex] = this.calculateNewCenter(this.data[minValIndex], this.v[minValIndex]);
                    }
                    stop = this.anyCenterLessThanE(vAnt);
                    i++;
                }
            };
            Lloyd.prototype.checkCase = function (data) {
                return true;
            };
            Lloyd.prototype.anyCenterLessThanE = function (vAnt) {
                var lessThanE = false;
                var cal = 0;
                var i = 0;
                while (i < this.numClases && !lessThanE) {
                    cal = 0;
                    for (var pos = 0; pos < this.numDatosMuestra; pos++) {
                        cal += Math.pow((this.v[i][pos] - vAnt[i][pos]), 2);
                    }
                    cal < this.e ? lessThanE = true : lessThanE = false;
                    i++;
                }
                return lessThanE;
            };
            Lloyd.prototype.calculateNewCenter = function (xi, vi) {
                var res = [];
                for (var pos = 0; pos < this.numDatosMuestra; pos++) {
                    res[pos] = ((Number(xi[pos]) - vi[pos]) * this.y) + vi[pos];
                }
                return res;
            };
            Lloyd.prototype.getDistance = function (xi, vi) {
                var res = 0;
                for (var pos = 0; pos < this.numDatosMuestra; pos++) {
                    res += Math.pow((Number(xi[pos]) - vi[pos]), 2);
                }
                return Math.pow(res, 1 / 2);
            };
            return Lloyd;
        }(Algorithms.Algorithm));
        Algorithms.Lloyd = Lloyd;
    })(Algorithms = App.Algorithms || (App.Algorithms = {}));
})(App || (App = {}));
//# sourceMappingURL=Lloyd.js.map