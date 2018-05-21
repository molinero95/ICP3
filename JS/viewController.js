var App;
(function (App) {
    var Controllers;
    (function (Controllers) {
        var data;
        $(function () {
            showMainMenu();
            $(".btnCaseRead").on("click", readCaseFile);
            $("#kMediasBtn").on("click", initKMediasView);
            $("#bayesBtn").on("click", initBayesView);
            $("#LloydBtn").on("click", initLloydView);
            $("#reload").on("click", reloadPage);
        });
        var context = null;
        var view = null;
        function readCaseFile(event) {
            var file1 = $(".caseDatatxt").prop("files")[0];
            $(".caseDatatxt").each(function (index, item) {
                if (!$(item).is(":hidden"))
                    file1 = $(item).prop("files")[0];
            });
            if (file1) {
                var ext1 = file1.name.split(".")[file1.name.split(".").length - 1];
                if (String(ext1).toLowerCase() !== "txt") {
                    alert("Solo archivos .txt por favor");
                    $(".btnCaseRead").removeClass("correctRead");
                    $(".btnCaseRead").addClass("incorrectRead");
                }
                else {
                    var fr = new FileReader();
                    fr.readAsText(file1, 'ISO-8859-1');
                    fr.onloadend = caseReadEnd;
                }
            }
            else {
                alert("Introduzca un archivo");
                $(".btnCaseRead").removeClass("correctRead");
                $(".btnCaseRead").addClass("incorrectRead");
            }
        }
        function caseReadEnd() {
            var file = this.result;
            var muestra = [file.split(",")];
            $(".btnCaseRead").removeClass("incorrectRead");
            $(".btnCaseRead").addClass("correctRead");
            switch (view) {
                case "kMedias":
                    $("#lblKMedias").text("¿Pertenece a la clase " + muestra[0][muestra[0].length - 1] + "? ");
                    break;
                case "Bayes":
                    $("#lblBayes").text("¿Pertenece a la clase " + muestra[0][muestra[0].length - 1] + "? ");
                    break;
                case "Lloyd":
                    $("#lblLloyd").text("¿Pertenece a la clase " + muestra[0][muestra[0].length - 1] + "? ");
                    break;
            }
            setTimeout(function () {
                var res = context.checkCase(muestra);
                var strRes;
                res ? strRes = "Sí" : strRes = "No";
                switch (view) {
                    case "kMedias":
                        $("#lblKMedias").text($("#lblKMedias").text() + strRes);
                        break;
                    case "Bayes":
                        $("#lblBayes").text($("#lblBayes").text() + strRes);
                        break;
                    case "Lloyd":
                        $("#lblLloyd").text($("#lblLloyd").text() + strRes);
                        break;
                }
            }, 1000);
        }
        function init() {
            data = [
                [5.1, 3.5, 1.4, 0.2, "Iris-setosa"],
                [4.9, 3.0, 1.4, 0.2, "Iris-setosa"],
                [4.7, 3.2, 1.3, 0.2, "Iris-setosa"],
                [4.6, 3.1, 1.5, 0.2, "Iris-setosa"],
                [5.0, 3.6, 1.4, 0.2, "Iris-setosa"],
                [5.4, 3.9, 1.7, 0.4, "Iris-setosa"],
                [4.6, 3.4, 1.4, 0.3, "Iris-setosa"],
                [5.0, 3.4, 1.5, 0.2, "Iris-setosa"],
                [4.4, 2.9, 1.4, 0.2, "Iris-setosa"],
                [4.9, 3.1, 1.5, 0.1, "Iris-setosa"],
                [5.4, 3.7, 1.5, 0.2, "Iris-setosa"],
                [4.8, 3.4, 1.6, 0.2, "Iris-setosa"],
                [4.8, 3.0, 1.4, 0.1, "Iris-setosa"],
                [4.3, 3.0, 1.1, 0.1, "Iris-setosa"],
                [5.8, 4.0, 1.2, 0.2, "Iris-setosa"],
                [5.7, 4.4, 1.5, 0.4, "Iris-setosa"],
                [5.4, 3.9, 1.3, 0.4, "Iris-setosa"],
                [5.1, 3.5, 1.4, 0.3, "Iris-setosa"],
                [5.7, 3.8, 1.7, 0.3, "Iris-setosa"],
                [5.1, 3.8, 1.5, 0.3, "Iris-setosa"],
                [5.4, 3.4, 1.7, 0.2, "Iris-setosa"],
                [5.1, 3.7, 1.5, 0.4, "Iris-setosa"],
                [4.6, 3.6, 1.0, 0.2, "Iris-setosa"],
                [5.1, 3.3, 1.7, 0.5, "Iris-setosa"],
                [4.8, 3.4, 1.9, 0.2, "Iris-setosa"],
                [5.0, 3.0, 1.6, 0.2, "Iris-setosa"],
                [5.0, 3.4, 1.6, 0.4, "Iris-setosa"],
                [5.2, 3.5, 1.5, 0.2, "Iris-setosa"],
                [5.2, 3.4, 1.4, 0.2, "Iris-setosa"],
                [4.7, 3.2, 1.6, 0.2, "Iris-setosa"],
                [4.8, 3.1, 1.6, 0.2, "Iris-setosa"],
                [5.4, 3.4, 1.5, 0.4, "Iris-setosa"],
                [5.2, 4.1, 1.5, 0.1, "Iris-setosa"],
                [5.5, 4.2, 1.4, 0.2, "Iris-setosa"],
                [4.9, 3.1, 1.5, 0.1, "Iris-setosa"],
                [5.0, 3.2, 1.2, 0.2, "Iris-setosa"],
                [5.5, 3.5, 1.3, 0.2, "Iris-setosa"],
                [4.9, 3.1, 1.5, 0.1, "Iris-setosa"],
                [4.4, 3.0, 1.3, 0.2, "Iris-setosa"],
                [5.1, 3.4, 1.5, 0.2, "Iris-setosa"],
                [5.0, 3.5, 1.3, 0.3, "Iris-setosa"],
                [4.5, 2.3, 1.3, 0.3, "Iris-setosa"],
                [4.4, 3.2, 1.3, 0.2, "Iris-setosa"],
                [5.0, 3.5, 1.6, 0.6, "Iris-setosa"],
                [5.1, 3.8, 1.9, 0.4, "Iris-setosa"],
                [4.8, 3.0, 1.4, 0.3, "Iris-setosa"],
                [5.1, 3.8, 1.6, 0.2, "Iris-setosa"],
                [4.6, 3.2, 1.4, 0.2, "Iris-setosa"],
                [5.3, 3.7, 1.5, 0.2, "Iris-setosa"],
                [5.0, 3.3, 1.4, 0.2, "Iris-setosa"],
                [7.0, 3.2, 4.7, 1.4, "Iris-versicolor"],
                [6.4, 3.2, 4.5, 1.5, "Iris-versicolor"],
                [6.9, 3.1, 4.9, 1.5, "Iris-versicolor"],
                [5.5, 2.3, 4.0, 1.3, "Iris-versicolor"],
                [6.5, 2.8, 4.6, 1.5, "Iris-versicolor"],
                [5.7, 2.8, 4.5, 1.3, "Iris-versicolor"],
                [6.3, 3.3, 4.7, 1.6, "Iris-versicolor"],
                [4.9, 2.4, 3.3, 1.0, "Iris-versicolor"],
                [6.6, 2.9, 4.6, 1.3, "Iris-versicolor"],
                [5.2, 2.7, 3.9, 1.4, "Iris-versicolor"],
                [5.0, 2.0, 3.5, 1.0, "Iris-versicolor"],
                [5.9, 3.0, 4.2, 1.5, "Iris-versicolor"],
                [6.0, 2.2, 4.0, 1.0, "Iris-versicolor"],
                [6.1, 2.9, 4.7, 1.4, "Iris-versicolor"],
                [5.6, 2.9, 3.6, 1.3, "Iris-versicolor"],
                [6.7, 3.1, 4.4, 1.4, "Iris-versicolor"],
                [5.6, 3.0, 4.5, 1.5, "Iris-versicolor"],
                [5.8, 2.7, 4.1, 1.0, "Iris-versicolor"],
                [6.2, 2.2, 4.5, 1.5, "Iris-versicolor"],
                [5.6, 2.5, 3.9, 1.1, "Iris-versicolor"],
                [5.9, 3.2, 4.8, 1.8, "Iris-versicolor"],
                [6.1, 2.8, 4.0, 1.3, "Iris-versicolor"],
                [6.3, 2.5, 4.9, 1.5, "Iris-versicolor"],
                [6.1, 2.8, 4.7, 1.2, "Iris-versicolor"],
                [6.4, 2.9, 4.3, 1.3, "Iris-versicolor"],
                [6.6, 3.0, 4.4, 1.4, "Iris-versicolor"],
                [6.8, 2.8, 4.8, 1.4, "Iris-versicolor"],
                [6.7, 3.0, 5.0, 1.7, "Iris-versicolor"],
                [6.0, 2.9, 4.5, 1.5, "Iris-versicolor"],
                [5.7, 2.6, 3.5, 1.0, "Iris-versicolor"],
                [5.5, 2.4, 3.8, 1.1, "Iris-versicolor"],
                [5.5, 2.4, 3.7, 1.0, "Iris-versicolor"],
                [5.8, 2.7, 3.9, 1.2, "Iris-versicolor"],
                [6.0, 2.7, 5.1, 1.6, "Iris-versicolor"],
                [5.4, 3.0, 4.5, 1.5, "Iris-versicolor"],
                [6.0, 3.4, 4.5, 1.6, "Iris-versicolor"],
                [6.7, 3.1, 4.7, 1.5, "Iris-versicolor"],
                [6.3, 2.3, 4.4, 1.3, "Iris-versicolor"],
                [5.6, 3.0, 4.1, 1.3, "Iris-versicolor"],
                [5.5, 2.5, 4.0, 1.3, "Iris-versicolor"],
                [5.5, 2.6, 4.4, 1.2, "Iris-versicolor"],
                [6.1, 3.0, 4.6, 1.4, "Iris-versicolor"],
                [5.8, 2.6, 4.0, 1.2, "Iris-versicolor"],
                [5.0, 2.3, 3.3, 1.0, "Iris-versicolor"],
                [5.6, 2.7, 4.2, 1.3, "Iris-versicolor"],
                [5.7, 3.0, 4.2, 1.2, "Iris-versicolor"],
                [5.7, 2.9, 4.2, 1.3, "Iris-versicolor"],
                [6.2, 2.9, 4.3, 1.3, "Iris-versicolor"],
                [5.1, 2.5, 3.0, 1.1, "Iris-versicolor"],
                [5.7, 2.8, 4.1, 1.3, "Iris-versicolor"]
            ];
            switch (view) {
                case "kMedias":
                    context = new App.Algorithms.KMedias(data);
                    break;
                case "Bayes":
                    context = new App.Algorithms.Bayes(data);
                    break;
                case "Lloyd":
                    context = new App.Algorithms.Lloyd(data);
                    break;
            }
            context.start();
        }
        function initKMediasView() {
            view = "kMedias";
            showKMedias();
            init();
        }
        function initBayesView() {
            view = "Bayes";
            showBayes();
            init();
        }
        function initLloydView() {
            view = "Lloyd";
            showLLoyd();
            init();
        }
        function hideMainMenu() {
            $("#menuDiv").hide();
            $("#reload").show();
        }
        function showMainMenu() {
            data = [];
            hideKMedias();
            hideBayes();
            hideLloyd();
            $("#reload").hide();
            $("#menuDiv").show();
        }
        function showKMedias() {
            hideMainMenu();
            $("#lecturaKMedias").show();
            $("#KMediasDiv").show();
            $("#casoKMedias").hide();
        }
        function hideKMedias() {
            $("#KMediasDiv").hide();
        }
        function showBayes() {
            hideMainMenu();
            $("#lecturaKBayes").show();
            $("#BayesDiv").show();
            $("#casoBayes").hide();
        }
        function hideBayes() {
            $("#BayesDiv").hide();
        }
        function showLLoyd() {
            hideMainMenu();
            $("#lecturaLloyd").show();
            $("#LloydDiv").show();
            $("#casoLloyd").hide();
        }
        function hideLloyd() {
            $("#LloydDiv").hide();
        }
        function reloadPage() {
            location.reload();
        }
        function restoreReadButton() {
        }
    })(Controllers = App.Controllers || (App.Controllers = {}));
})(App || (App = {}));
//# sourceMappingURL=viewController.js.map