var App;
(function (App) {
    var Entities;
    (function (Entities) {
        var KMedias = (function () {
            function KMedias(data) {
                this.v = [];
                this.v[0] = [4.6, 3.0, 4.0, 0.0];
                this.v[1] = [6.8, 3.4, 4.6, 0.7];
                this.b = 2;
                this.e = 0.01;
                this.c = 2;
                this.data = data;
            }
            KMedias.prototype.start = function () {
            };
            KMedias.prototype.pertenencia = function (x, v, c) {
                var res = 0;
                for (var i = 0; i < c; i++)
                    res += this.moduloDifCuad(x[i], v[i]);
                return res;
            };
            KMedias.prototype.moduloDifCuad = function (xi, vi) {
                return Math.pow(Math.abs(xi - vi), 2);
            };
            return KMedias;
        }());
        Entities.KMedias = KMedias;
    })(Entities = App.Entities || (App.Entities = {}));
})(App || (App = {}));
//# sourceMappingURL=K-Medias.js.map