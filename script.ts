 function LimpiarNeumaticos(){

    (<HTMLInputElement>document.getElementById("marca")).value = "";
    (<HTMLInputElement>document.getElementById("medidas")).value = "";
    (<HTMLInputElement>document.getElementById("precio")).value = "";
}


 function LimpiarFoto(){
    
    (<HTMLInputElement> document.getElementById("foto")).value = "";
    (<HTMLInputElement> document.getElementById("imgFoto")).src = "./neumatico.jpg";
    
}

 function LimpiarNeumaticosBdHTML()
{
    (<HTMLInputElement>document.getElementById("id")).value = "";
    LimpiarNeumaticos();
    LimpiarFoto();

}