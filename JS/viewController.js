var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        $(function () {
            showMainMenu();
            $(".btnRead").on("click", readDataFile);
            $(".btnCaseRead").on("click", readCaseFile);
            $("#kMediasBtn").on("click", initKMediasView);
            $("#bayesBtn").on("click", initBayesView);
            $("#reload").on("click", reloadPage);
        });
        var data = [];
        var context = null;
        var view = null;
        function readDataFile(event) {
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
        function readCaseFile(event) {
            var file1 = $(".caseDatatxt").prop("files")[0];
            $(".caseDatatxt").each(function (index, item) {
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
                    fr.onloadend = caseReadEnd;
                }
            }
            else
                alert("Introduzca un archivo");
        }
        function caseReadEnd() {
            var file = this.result;
            var muestra = [file.split(",")];
            $(".btnCaseRead").addClass("correctRead");
            switch (view) {
                case "kMedias":
                    $("#lblKMedias").text("¿" + muestra[0][muestra[0].length - 1] + "?");
                    break;
                case "Bayes":
                    $("#lblBayes").text("¿" + muestra[0][muestra[0].length - 1] + "?");
                    break;
            }
            setTimeout(function () {
                context.checkCase(muestra);
            }, 1000);
        }
        function readEnd() {
            var file = this.result.split("\n");
            for (var i = 0; i < file.length; i++) {
                data[i] = file[i].split(",");
            }
            $(".btnRead").addClass("correctRead");
            switch (view) {
                case "kMedias":
                    context = new App.Algorithms.KMedias(data);
                    break;
                case "Bayes":
                    context = new App.Algorithms.Bayes(data);
                    break;
            }
            context.start();
        }
        function initKMediasView() {
            view = "kMedias";
            showKMedias();
        }
        function initBayesView() {
            view = "Bayes";
            showBayes();
        }
        function hideMainMenu() {
            $("#menuDiv").hide();
            $("#reload").show();
        }
        function showMainMenu() {
            data = [];
            hideKMedias();
            hideBayes();
            $("#reload").hide();
            $("#menuDiv").show();
        }
        function showKMedias() {
            hideMainMenu();
            $("#lecturaKMedias").show();
            $("#kMediasDiv").show();
            $("#casoKMedias").hide();
        }
        function hideKMedias() {
            $("#kMediasDiv").hide();
        }
        function showBayes() {
            hideMainMenu();
            $("#lecturaKBayes").show();
            $("#bayesDiv").show();
            $("#casoBayes").hide();
        }
        function hideBayes() {
            $("#bayesDiv").hide();
        }
        function reloadPage() {
            location.reload();
        }
        function restoreReadButton() {
        }
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=viewController.js.map