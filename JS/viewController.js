var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var kMedias = Algorithms.KMedias;
        $(function () {
            $("#btnRead").on("click", readFile);
            $("#kMediasBtn").on("click", initKMediasView);
        });
        var data = [];
        function readFile(event) {
            var file1 = $("#datatxt").prop("files")[0];
            if (file1) {
                var ext1 = file1.name.split(".")[file1.name.split(".").length - 1];
                if (String(ext1).toLowerCase() !== "txt")
                    alert("Solo archivos .txt por favor");
                var fr = new FileReader();
                fr.readAsText(file1, 'ISO-8859-1');
                fr.onloadend = readEnd;
            }
            else
                alert("Introduzca un archivo");
        }
        function readEnd() {
            var file = this.result.split("\n");
            for (var i = 0; i < file.length; i++) {
                data[i] = file[i].split(",");
            }
            console.log(data);
        }
        function initKMediasView() {
            hideMainMenu();
            var kmed = new kMedias(data).start();
        }
        function hideMainMenu() {
            $("#menuDiv").hide();
        }
        function showMainMenu() {
            $("#menuDiv").show();
        }
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=viewController.js.map