var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        $(function () {
            $("#btnRead").on("click", readFile);
            $("#kMediasBtn").on("click", initKMediasView);
        });
        function readFile(event) {
            var file1 = $("#datatxt").prop("files")[0];
            console.log(file1);
            if (file1) {
                var ext1 = file1.name.split(",")[file1.name.split(".").length - 1];
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
            var fileContent = this.result;
        }
        function initKMediasView() {
            hideMainMenu();
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