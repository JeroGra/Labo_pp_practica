"use strict";
function LimpiarNeumaticos() {
    document.getElementById("marca").value = "";
    document.getElementById("medidas").value = "";
    document.getElementById("precio").value = "";
}
function LimpiarFoto() {
    document.getElementById("foto").value = "";
    document.getElementById("imgFoto").src = "./neumatico.jpg";
}
function LimpiarNeumaticosBdHTML() {
    document.getElementById("id").value = "";
    LimpiarNeumaticos();
    LimpiarFoto();
}
