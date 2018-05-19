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
                return _super.call(this, data) || this;
            }
            Bayes.prototype.start = function () {
                for (var i = 0; i < this.numDatosMuestra; i++) {
                    for (var j = 0; j < this.numClases; j++) {
                    }
                }
            };
            Bayes.prototype.checkCase = function (data) {
                return true;
            };
            return Bayes;
        }(Algorithms.Algorithm));
        Algorithms.Bayes = Bayes;
    })(Algorithms = App.Algorithms || (App.Algorithms = {}));
})(App || (App = {}));
//# sourceMappingURL=Bayes.js.map