
module App.Controllers {
    let kMedias = Algorithms.KMedias;
    $(() => {
        showMainMenu();
        $(".btnRead").on("click", readFile);
        $("#kMediasBtn").on("click", initKMediasView);
    })

    let data: Array<Array<string>> = [];
    let context = null;
    let view: string = null;
    function readFile(event: Event): void {
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

    function readEnd(): void {
        let file = this.result.split("\n");
        for(let i = 0; i < file.length; i++){
            data[i] = file[i].split(",");
        }
        $(".btnRead").addClass("correctRead");
        switch(view){
            case "kMedias": context = new kMedias(data).start();

        }
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
    }

    function hideKMedias(): void{
        $("#kMediasDiv").hide();
    }


    function restoreReadButton(){

    }
}