var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var kMedias = App.Algorithms.KMedias;
        $(function () {
            showMainMenu();
            $(".btnRead").on("click", readFile);
            $("#kMediasBtn").on("click", initKMediasView);
        });
        var data = [];
        var context = null;
        var view = null;
        function readFile(event) {
            var file1 = $(".datatxt").prop("files")[0];
            $(".datatxt").each(function (index, item) {
                if (!$(item).is(":hidden"))
                    file1 = $(item).prop("files")[0];
            });
            if (file1) {
                var ext1 = file1.name.split(".")[file1.name.split(".").length - 1];
                if (String(ext1).toLowerCase() !== "txt")
                    alert("Solo archivos .txt por favor");
                else {
                    var fr = new FileReader();
                    fr.readAsText(file1, 'ISO-8859-1');
                    fr.onloadend = readEnd;
                }
            }
            else
                alert("Introduzca un archivo");
        }
        function readEnd() {
            var file = this.result.split("\n");
            for (var i = 0; i < file.length; i++) {
                data[i] = file[i].split(",");
            }
            $(".btnRead").addClass("correctRead");
            switch (view) {
                case "kMedias": context = new kMedias(data).start();
            }
        }
        function initKMediasView() {
            view = "kMedias";
            showKMedias();
        }
        function hideMainMenu() {
            $("#menuDiv").hide();
        }
        function showMainMenu() {
            data = [];
            hideKMedias();
            $("#menuDiv").show();
        }
        function showKMedias() {
            hideMainMenu();
            $("#lecturaKMedias").show();
            $("#kMediasDiv").show();
        }
        function hideKMedias() {
            $("#kMediasDiv").hide();
        }
        function restoreReadButton() {
        }
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=viewController.js.map