
module App.Controllers {
    $(() => {
        showMainMenu();
        $(".btnRead").on("click", readDataFile);
        $(".btnCaseRead").on("click", readCaseFile);
        $("#kMediasBtn").on("click", initKMediasView);
        $("#bayesBtn").on("click", initBayesView);
        $("#LloydBtn").on("click", initLloydView);
        $("#reload").on("click", reloadPage);
    })

    let data: Array<Array<string>> = [];
    let context: Algorithms.Algorithm = null;
    let view: string = null;
    function readDataFile(event: Event): void {
        let file1 = $(".datatxt").prop("files")[0];
        $(".datatxt").each((index, item) => {
            if(!$(item).is(":hidden"))
                file1 = $(item).prop("files")[0];
        })
        if (file1) {
            let ext1 = file1.name.split(".")[file1.name.split(".").length - 1];
            if (String(ext1).toLowerCase() !== "txt"){
                alert("Solo archivos .txt por favor");
                $(".btnRead").removeClass("correctRead");
                $(".btnRead").addClass("incorrectRead");
            }
            else{
                let fr = new FileReader();
                fr.readAsText(file1, 'ISO-8859-1');
                fr.onloadend = readEnd;
            }
        }
        else{
            alert("Introduzca un archivo");
            $(".btnRead").removeClass("correctRead");
            $(".btnRead").addClass("incorrectRead");
        }
    }

    function readCaseFile(event: Event): void {
        let file1 = $(".caseDatatxt").prop("files")[0];
        $(".caseDatatxt").each((index, item) => {
            if(!$(item).is(":hidden"))
                file1 = $(item).prop("files")[0];
        })
        if (file1) {
            let ext1 = file1.name.split(".")[file1.name.split(".").length - 1];
            if (String(ext1).toLowerCase() !== "txt"){
                alert("Solo archivos .txt por favor");
                $(".btnCaseRead").removeClass("correctRead");
                $(".btnCaseRead").addClass("incorrectRead");
            }
            else{
                let fr = new FileReader();
                fr.readAsText(file1, 'ISO-8859-1');
                fr.onloadend = caseReadEnd;
            }
        }
        else{
            alert("Introduzca un archivo");
            $(".btnCaseRead").removeClass("correctRead");
            $(".btnCaseRead").addClass("incorrectRead");
        }
    }

    function caseReadEnd(): void{
        let file = this.result;
        let muestra = [file.split(",")];
        $(".btnCaseRead").removeClass("incorrectRead");
        $(".btnCaseRead").addClass("correctRead");
        switch(view){
            case "kMedias": $("#lblKMedias").text("¿Pertenece a la clase " + muestra[0][muestra[0].length - 1] + "? "); break;
            case "Bayes": $("#lblBayes").text("¿Pertenece a la clase " + muestra[0][muestra[0].length - 1] + "? "); break;
        }
        setTimeout(function(){
            let res:boolean = context.checkCase(muestra);
            let strRes: string;
            res? strRes="Sí":strRes="No";
            switch(view){
                case "kMedias": $("#lblKMedias").text($("#lblKMedias").text() + strRes); break;
                case "Bayes": $("#lblBayes").text($("#lblBayes").text()); break;
            } 
        }, 1000);
    }

    function readEnd(): void {
        let file = this.result.split("\n");
        for(let i = 0; i < file.length; i++){
            data[i] = file[i].split(",");
        }
        $(".btnRead").removeClass("incorrectRead");
        $(".btnRead").addClass("correctRead");
        switch(view){
            case "kMedias": context = new Algorithms.KMedias(data); break;
            case "Bayes": context = new Algorithms.Bayes(data); break;
            case "Lloyd": context = new Algorithms.Lloyd(data); break;
        }
        context.start();
    }

    function initKMediasView(): void{
        //Ocultar Menu principal
        view = "kMedias";
        showKMedias();
    }

    function initBayesView(): void{
        view = "Bayes";
        showBayes();
    }

    function initLloydView(): void{
        view = "Lloyd";
        showLLoyd();
    }
    
    function hideMainMenu():void{
        $("#menuDiv").hide();
        $("#reload").show();
    }

    function showMainMenu(): void{
        data = [];
        hideKMedias();
        hideBayes();
        hideLloyd();
        $("#reload").hide();
        $("#menuDiv").show();
    }

    function showKMedias(): void{
        hideMainMenu();
        $("#lecturaKMedias").show();
        $("#KMediasDiv").show();
        $("#casoKMedias").hide();
    }

    function hideKMedias(): void{
        $("#KMediasDiv").hide();
    }

    function showBayes(): void{
        hideMainMenu();
        $("#lecturaKBayes").show();
        $("#BayesDiv").show();
        $("#casoBayes").hide();

    }

    function hideBayes(): void{
        $("#BayesDiv").hide();
    }

    function showLLoyd(): void{
        hideMainMenu();
        $("#lecturaLloyd").show();
        $("#LloydDiv").show();
        $("#casoLloyd").hide();
    }

    function hideLloyd(){
        $("#LloydDiv").hide();
    }

    function reloadPage(): void{
        location.reload();
    }

    function restoreReadButton(){

    }
}