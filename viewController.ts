
module App.Controllers {
    $(() => {
        showMainMenu();
        $(".btnRead").on("click", readDataFile);
        $(".btnCaseRead").on("click", readCaseFile);
        $("#kMediasBtn").on("click", initKMediasView);
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
            if (String(ext1).toLowerCase() !== "txt")
                alert("Solo archivos .txt por favor");
            else{
                let fr = new FileReader();
                fr.readAsText(file1, 'ISO-8859-1');
                fr.onloadend = readEnd;
            }
        }
        else
            alert("Introduzca un archivo");
    }

    function readCaseFile(event: Event): void {
        let file1 = $(".caseDatatxt").prop("files")[0];
        $(".caseDatatxt").each((index, item) => {
            if(!$(item).is(":hidden"))
                file1 = $(item).prop("files")[0];
        })
        if (file1) {
            let ext1 = file1.name.split(".")[file1.name.split(".").length - 1];
            if (String(ext1).toLowerCase() !== "txt")
                alert("Solo archivos .txt por favor");
            else{
                let fr = new FileReader();
                fr.readAsText(file1, 'ISO-8859-1');
                fr.onloadend = caseReadEnd;
            }
        }
        else
            alert("Introduzca un archivo");
    }

    function caseReadEnd(): void{
        let file = this.result;
        let muestra = [file.split(",")];
        $(".btnCaseRead").addClass("correctRead");
        switch(view){
            case "kMedias": $("#lblKMedias").text("¿" + muestra[0][muestra[0].length - 1] + "?"); break;
            case "Bayes": $("#lblBayes").text("¿" + muestra[0][muestra[0].length - 1] + "?"); break;
        }
        setTimeout(function(){
            context.checkCase(muestra); 
        }, 1000);
    }

    function readEnd(): void {
        let file = this.result.split("\n");
        for(let i = 0; i < file.length; i++){
            data[i] = file[i].split(",");
        }
        $(".btnRead").addClass("correctRead");
        switch(view){
            case "kMedias": context = new Algorithms.KMedias(data); break;
            case "Bayes": context = new Algorithms.Bayes(data); break;
        }
        context.start();
    }

    function initKMediasView(): void{
        //Ocultar Menu principal
        view = "kMedias";
        showKMedias();
    }
    
    function hideMainMenu():void{
        $("#menuDiv").hide();
    }

    function showMainMenu(): void{
        data = [];
        hideKMedias();
        $("#menuDiv").show();
    }

    function showKMedias(): void{
        hideMainMenu();
        $("#lecturaKMedias").show();
        $("#kMediasDiv").show();
        $("#casoKMedias").hide();
    }

    function hideKMedias(): void{
        $("#kMediasDiv").hide();
    }


    function restoreReadButton(){

    }
}