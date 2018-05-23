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
                _this.e = 0.0000000001;
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
                            var data = this.distance(this.data[j], this.v[k]);
                            if (data < minValue) {
                                minValIndex = k;
                                minValue = data;
                            }
                        }
                        this.v[minValIndex] = this.calculateNewCenter(this.data[j], this.v[minValIndex]);
                    }
                    stop = this.centersLessThanE(vAnt);
                    i++;
                }
                this.showVs();
                $("#casoLloyd").show();
            };
            Lloyd.prototype.checkCase = function (data) {
                var distances = [];
                var minD = Number.MAX_VALUE;
                var index = 0;
                for (var i = 0; i < this.numClases; i++) {
                    var d = this.distance(data[0], this.v[i]);
                    if (d < minD) {
                        minD = d;
                        index = i;
                    }
                }
                alert("Resultado: " + this.classes[index]);
                return this.classes[index] === data[0][this.numDatosMuestra].toString();
            };
            Lloyd.prototype.showVs = function () {
                var text1 = "v1: ";
                var text2 = "v2: ";
                for (var i = 0; i < this.v[0].length; i++) {
                    if (i == this.v[0].length - 1) {
                        text1 += this.v[0][i].toFixed(3);
                        text2 += this.v[1][i].toFixed(3);
                    }
                    else {
                        text1 += this.v[0][i].toFixed(3) + ", ";
                        text2 += this.v[1][i].toFixed(3) + ", ";
                    }
                }
                $("#v1Lloyd").text(text1);
                $("#v2Lloyd").text(text2);
            };
            Lloyd.prototype.calculateNewCenter = function (xi, vi) {
                var res = [];
                for (var pos = 0; pos < this.numDatosMuestra; pos++) {
                    res[pos] = ((Number(xi[pos]) - vi[pos]) * this.y) + vi[pos];
                }
                return res;
            };
            return Lloyd;
        }(Algorithms.Algorithm));
        Algorithms.Lloyd = Lloyd;
    })(Algorithms = App.Algorithms || (App.Algorithms = {}));
})(App || (App = {}));
//# sourceMappingURL=Lloyd.js.map