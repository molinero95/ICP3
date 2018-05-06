module App.Controllers {
    $(() => {
        $("#btnRead").on("click", readFile);
    })

    function readFile(event: Event): void {
        let file1 = $("#datatxt").prop("files")[0];
        console.log(file1);
        if (file1) {
            let ext1 = file1.name.split(",")[file1.name.split(".").length - 1];
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
        let fileContent = this.result;
    }
}