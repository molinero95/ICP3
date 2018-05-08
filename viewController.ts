
module App.Controllers {
    let kMedias = Algorithms.KMedias;
    $(() => {
        $("#btnRead").on("click", readFile);
        $("#kMediasBtn").on("click", initKMediasView);
    })

    let data: Array<Array<string>> = [];
    function readFile(event: Event): void {
        let file1 = $("#datatxt").prop("files")[0];
        if (file1) {
            let ext1 = file1.name.split(".")[file1.name.split(".").length - 1];
            if (String(ext1).toLowerCase() !== "txt")
                alert("Solo archivos .txt por favor");
            let fr = new FileReader();
            fr.readAsText(file1, 'ISO-8859-1');
            fr.onloadend = readEnd;
        }
        else
            alert("Introduzca un archivo");
    }

    function readEnd(): void {
        let file = this.result.split("\n");
        for(let i = 0; i < file.length; i++){
            data[i] = file[i].split(",");
        }
        console.log(data);
    }

    function initKMediasView(): void{
        //Ocultar Menu principal
        hideMainMenu();
        let kmed = new kMedias(data).start();

    }
    function hideMainMenu():void{
        $("#menuDiv").hide();
    }

    function showMainMenu(): void{
        $("#menuDiv").show();
    }

}