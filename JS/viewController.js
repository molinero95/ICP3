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
            $("#LloydBtn").on("click", initLloydView);
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
                if (String(ext1).toLowerCase() !== "txt") {
                    alert("Solo archivos .txt por favor");
                    $(".btnRead").removeClass("correctRead");
                    $(".btnRead").addClass("incorrectRead");
                }
                else {
                    var fr = new FileReader();
                    fr.readAsText(file1, 'ISO-8859-1');
                    fr.onloadend = readEnd;
                }
            }
            else {
                alert("Introduzca un archivo");
                $(".btnRead").removeClass("correctRead");
                $(".btnRead").addClass("incorrectRead");
            }
        }
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
                        $("#lblBayes").text($("#lblBayes").text());
                        break;
                }
            }, 1000);
        }
        function readEnd() {
            var file = this.result.split("\n");
            for (var i = 0; i < file.length; i++) {
                data[i] = file[i].split(",");
            }
            $(".btnRead").removeClass("incorrectRead");
            $(".btnRead").addClass("correctRead");
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
        }
        function initBayesView() {
            view = "Bayes";
            showBayes();
        }
        function initLloydView() {
            view = "Lloyd";
            showLLoyd();
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