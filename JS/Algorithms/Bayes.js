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
        var Bayes = (function (_super) {
            __extends(Bayes, _super);
            function Bayes(data) {
                var _this = _super.call(this, data) || this;
                _this.C = [];
                for (var i = 0; i < _this.numClases; i++)
                    _this.C[i] = [];
                _this.m = [];
                $("#BayesClases").text("Número de clases: " + _this.numClases);
                $("#BayesMuestras").text("Número de muestras: " + _this.numMuestras);
                $("#BayesDatos").text("Número de datos por muestra: " + _this.numDatosMuestra);
                return _this;
            }
            Bayes.prototype.start = function () {
                for (var i = 0; i < this.numClases; i++) {
                    this.m[i] = this.calculateMi(this.classes[i]);
                    this.C[i] = this.calculateCi(this.classes[i]);
                }
                this.showMs();
                this.showCov();
                $("#casoBayes").show();
            };
            Bayes.prototype.showMs = function () {
                var text1 = "m1: ";
                var text2 = "m2: ";
                for (var i = 0; i < this.m[0].length; i++) {
                    if (i == this.m[0].length - 1) {
                        text1 += this.m[0][i].toFixed(3);
                        text2 += this.m[1][i].toFixed(3);
                    }
                    else {
                        text1 += this.m[0][i].toFixed(3) + ", ";
                        text2 += this.m[1][i].toFixed(3) + ", ";
                    }
                }
                $("#m1Bayes").text(text1);
                $("#m2Bayes").text(text2);
            };
            Bayes.prototype.showCov = function () {
                var table1 = $("#CovarianzaBayes1");
                var table2 = $("#CovarianzaBayes2");
                for (var i = 0; i < this.C[0].length; i++) {
                    var tr1 = $("<tr>");
                    var tr2 = $("<tr>");
                    for (var j = 0; j < this.C[0][0].length; j++) {
                        var td1 = $("<td>");
                        var td2 = $("<td>");
                        td1.text(this.C[0][i][j].toFixed(3));
                        td2.text(this.C[1][i][j].toFixed(3));
                        tr1.append(td1);
                        tr2.append(td2);
                    }
                    table1.append(tr1);
                    table2.append(tr2);
                }
            };
            Bayes.prototype.calculateMi = function (className) {
                var mi = [];
                for (var i = 0; i < this.numDatosMuestra; i++)
                    mi[i] = 0;
                var count = 0;
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i][this.numDatosMuestra] === className) {
                        for (var j = 0; j < this.numDatosMuestra; j++)
                            mi[j] += this.data[i][j];
                        count++;
                    }
                }
                for (var i = 0; i < this.numDatosMuestra; i++) {
                    mi[i] = mi[i] / count;
                }
                return mi;
            };
            Bayes.prototype.calculateCi = function (className) {
                var C = [];
                for (var i = 0; i < this.numDatosMuestra; i++)
                    for (var j = 0; j < this.numDatosMuestra; j++) {
                        if (!C[i])
                            C[i] = [];
                        C[i][j] = 0;
                    }
                var count = 0;
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i][this.numDatosMuestra] === className) {
                        C = this.matrixAddmatrix(C, this.calculateCiHelper(className, this.data[i]));
                        count++;
                    }
                }
                for (var i = 0; i < C.length; i++)
                    for (var j = 0; j < C.length; j++)
                        C[i][j] = C[i][j] / count;
                return C;
            };
            Bayes.prototype.matrixAddmatrix = function (m1, m2) {
                var res = [];
                for (var i = 0; i < m1.length; i++) {
                    res[i] = [];
                    for (var j = 0; j < m1.length; j++)
                        res[i][j] = m1[i][j] + m2[i][j];
                }
                return res;
            };
            Bayes.prototype.calculateCiHelper = function (className, xi) {
                var xilessmi;
                var classIndx = this.classes.indexOf(className);
                xilessmi = this.getXiLessMc(xi, this.m[classIndx]);
                var res = [];
                for (var i = 0; i < this.numDatosMuestra; i++) {
                    for (var j = 0; j < this.numDatosMuestra; j++) {
                        if (!res[i])
                            res[i] = [];
                        res[i][j] = Number(xilessmi[i]) * Number(xilessmi[j]);
                    }
                }
                return res;
            };
            Bayes.prototype.getXiLessMc = function (xi, mc) {
                var xilessmi = [];
                for (var i = 0; i < this.numDatosMuestra; i++)
                    xilessmi[i] = Number(xi[i]) - mc[i];
                return xilessmi;
            };
            Bayes.prototype.checkCase = function (data) {
                var max = Number.MIN_VALUE;
                var index = 0;
                var d;
                for (var i = 0; i < this.numClases; i++) {
                    d = this.estimateMaxVer(i, data[0]);
                    if (d > max) {
                        max = d;
                        index = i;
                    }
                }
                alert("Resultado: " + this.classes[index]);
                var classIndx = this.classes.indexOf(data[0][this.numDatosMuestra]);
                return index === classIndx;
            };
            Bayes.prototype.estimateMaxVer = function (classIndex, data) {
                return this.getBase(classIndex) * Math.pow(Math.E, this.getExp(classIndex, data));
            };
            Bayes.prototype.getBase = function (classIndex) {
                return 1 / (Math.pow(2 * Math.PI, (this.numDatosMuestra / 2)) * Math.pow(math.det(this.C[classIndex]), 1 / 2));
            };
            Bayes.prototype.getExp = function (classIndex, data) {
                var xiLessM = this.getXiLessMc(data, this.m[classIndex]);
                var CInverse = math.inv(this.C[classIndex]);
                var temp = [];
                for (var i = 0; i < xiLessM.length; i++) {
                    temp[i] = 0;
                    for (var j = 0; j < xiLessM.length; j++) {
                        temp[i] += xiLessM[j] * CInverse[j][i];
                    }
                }
                var result = 0;
                for (var i = 0; i < temp.length; i++)
                    result += temp[i] * xiLessM[i];
                return -result / 2;
            };
            return Bayes;
        }(Algorithms.Algorithm));
        Algorithms.Bayes = Bayes;
    })(Algorithms = App.Algorithms || (App.Algorithms = {}));
})(App || (App = {}));
//# sourceMappingURL=Bayes.js.map