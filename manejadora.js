"use strict";
var Jeronimo_Granadillo;
(function (Jeronimo_Granadillo) {
    /// <reference path="./script.ts" />
    /// <reference path="./clases.ts" />
    const xhttp = new XMLHttpRequest();
    const formData = new FormData();
    function BorrarCampos() {
        LimpiarNeumaticosBdHTML();
    }
    Jeronimo_Granadillo.BorrarCampos = BorrarCampos;
    function RespuestaJSON() {
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let jsonMsj = JSON.parse(xhttp.responseText);
                console.log(xhttp.responseText);
                alert(jsonMsj.mensaje);
                if (jsonMsj.exito) {
                    MostrarNeumaticosJSON();
                }
            }
        };
    }
    function RespuestaNeumaticosBDJSON() {
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let jsonMsj = JSON.parse(xhttp.responseText);
                console.log(xhttp.responseText);
                alert(jsonMsj.mensaje);
                if (jsonMsj.exito) {
                    MostrarNeumaticos();
                }
            }
        };
    }
    function AgregarNeumaticoJSON() {
        let marca = document.getElementById("marca").value;
        let medidas = document.getElementById("medidas").value;
        let precio = document.getElementById("precio").value;
        xhttp.open('POST', './backend/altaNeumaticoJSON.php', true);
        formData.append('marca', marca);
        formData.append('medidas', medidas);
        formData.append('precio', precio);
        xhttp.send(formData);
        RespuestaJSON();
        LimpiarNeumaticos();
    }
    Jeronimo_Granadillo.AgregarNeumaticoJSON = AgregarNeumaticoJSON;
    function MostrarNeumaticosJSON() {
        xhttp.open('GET', './backend/listadoNeumaticosJSON.php', true);
        xhttp.send();
        xhttp.onreadystatechange = () => {
            let div = document.getElementById("divTabla");
            let tabla = `<table>
           <tr>
                 <th>MARCA</th><th>MEDIDAS</th><th>PRECIO</th>
           </tr>`;
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let jsonMsj = JSON.parse(xhttp.responseText);
                for (let i = 0; i < jsonMsj.length; i++) {
                    let dato = jsonMsj[i];
                    tabla += `<tr>
                                  <th>${dato.marca}</th><th>${dato.medidas}</th><th>${dato.precio}</th>
                           </tr>
                 `;
                }
            }
            tabla += `</table>`;
            div.innerHTML = tabla;
        };
    }
    Jeronimo_Granadillo.MostrarNeumaticosJSON = MostrarNeumaticosJSON;
    function VerificarNeumaticoJSON() {
        let marca = document.getElementById("marca").value;
        let medidas = document.getElementById("medidas").value;
        formData.append('marca', marca);
        formData.append('medidas', medidas);
        xhttp.open('POST', './backend/VerificarNeumaticoJSON.php', true);
        xhttp.send(formData);
        RespuestaJSON();
        LimpiarNeumaticos();
    }
    Jeronimo_Granadillo.VerificarNeumaticoJSON = VerificarNeumaticoJSON;
    ///Neumaticos con Base de datos
    //Neumaticos sin Fotos
    function AgregarNeumaticoSinFoto() {
        let marca = document.getElementById("marca").value;
        let medidas = document.getElementById("medidas").value;
        let precio = parseInt(document.getElementById("precio").value);
        let neumatico = new Jeronimo_Granadillo.Neumatico(marca, medidas, precio);
        xhttp.open('POST', './backend/agregarNeumaticoSinFoto.php', true);
        formData.append('neumatico_json', JSON.stringify(neumatico));
        xhttp.send(formData);
        RespuestaNeumaticosBDJSON();
        LimpiarNeumaticosBdHTML();
    }
    Jeronimo_Granadillo.AgregarNeumaticoSinFoto = AgregarNeumaticoSinFoto;
    function ModificarNeumatico() {
        let id = parseInt(document.getElementById("id").value);
        let marca = document.getElementById("marca").value;
        let medidas = document.getElementById("medidas").value;
        let precio = parseInt(document.getElementById("precio").value);
        let neumatico = new Jeronimo_Granadillo.NeumaticoBd(marca, medidas, precio, id, "");
        xhttp.open('POST', './backend/modificarNeumaticoBD.php', true);
        formData.append('neumatico_json', JSON.stringify(neumatico));
        xhttp.send(formData);
        RespuestaNeumaticosBDJSON();
        LimpiarNeumaticosBdHTML();
    }
    Jeronimo_Granadillo.ModificarNeumatico = ModificarNeumatico;
    function EliminarNeumatico() {
        let id = parseInt(document.getElementById("id").value);
        let marca = document.getElementById("marca").value;
        let medidas = document.getElementById("medidas").value;
        let precio = parseInt(document.getElementById("precio").value);
        let neumatico = new Jeronimo_Granadillo.NeumaticoBd(marca, medidas, precio, id, "");
        xhttp.open('POST', './backend/eliminarNeumaticoBD.php', true);
        formData.append('neumatico_json', JSON.stringify(neumatico));
        xhttp.send(formData);
        RespuestaNeumaticosBDJSON();
        LimpiarNeumaticosBdHTML();
    }
    Jeronimo_Granadillo.EliminarNeumatico = EliminarNeumatico;
    ///Neumaticos con Fotos
    function MostrarNeumaticos() {
        xhttp.open('GET', './backend/listadoNeumaticosBD.php', true);
        xhttp.send();
        xhttp.onreadystatechange = () => {
            let div = document.getElementById("divTablaNeumaticos");
            let tabla = `<table>
               <tr>
                      <th>ID</th><th>MARCA</th><th>MEDIDAS</th><th>PRECIO</th><th>FOTO</th><th>ACCION</th>
               </tr>`;
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let jsonMsj = JSON.parse(xhttp.responseText);
                for (let i = 0; i < jsonMsj.length; i++) {
                    let dato = jsonMsj[i];
                    tabla += `<tr>
                                        <th>${dato.id}</th><th>${dato.marca}</th><th>${dato.medidas}</th><th>${dato.precio}</th><th> <img src=${dato.pathFoto} width=50 height=50 /></th><th><input type="button" id="" data-obj='${JSON.stringify(dato)}'value="Seleccionar" name="btnSeleccionar"></th>
                                </tr>
                        `;
                }
            }
            tabla += `</table>`;
            div.innerHTML = tabla;
            AsignarManejadoresSeleccion();
        };
    }
    Jeronimo_Granadillo.MostrarNeumaticos = MostrarNeumaticos;
    function ObtenerModificar(dato) {
        let obj = dato.getAttribute("data-obj");
        let obj_dato = JSON.parse(obj);
        document.getElementById("id").value = obj_dato.id;
        document.getElementById("marca").value = obj_dato.marca;
        document.getElementById("medidas").value = obj_dato.medidas;
        document.getElementById("precio").value = obj_dato.precio;
        document.getElementById("imgFoto").src = obj_dato.pathFoto;
        document.getElementById("foto").src = document.getElementById("imgFoto").src;
    }
    function AsignarManejadoresSeleccion() {
        document.getElementsByName("btnSeleccionar").forEach((elemento) => {
            elemento.addEventListener("click", () => { ObtenerModificar(elemento); });
        });
    }
    function VerificarNeumaticoBD() {
        let marca = document.getElementById("marca").value;
        let medidas = document.getElementById("medidas").value;
        let precio = parseInt(document.getElementById("precio").value);
        let neumatico = new Jeronimo_Granadillo.Neumatico(marca, medidas, precio);
        xhttp.open('POST', './backend/verificarNeumaticoBD.php', true);
        formData.append('obj_neumatico', JSON.stringify(neumatico));
        xhttp.send(formData);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let jsrt = JSON.parse(xhttp.responseText);
                if (jsrt !== "") {
                    alert(jsrt.marca + "," + jsrt.medidas);
                }
                else {
                    console.log(xhttp.responseText);
                    alert("No se encuentra en base de datos");
                }
            }
        };
        LimpiarNeumaticosBdHTML();
    }
    Jeronimo_Granadillo.VerificarNeumaticoBD = VerificarNeumaticoBD;
    function AgregarNeumaticoFoto() {
        let marca = document.getElementById("marca").value;
        let medidas = document.getElementById("medidas").value;
        let precio = document.getElementById("precio").value;
        let foto = document.getElementById("foto");
        formData.append('marca', marca);
        formData.append('medidas', medidas);
        formData.append('precio', precio);
        formData.append('foto', foto.files[0]);
        xhttp.open("POST", "./backend/agregarNeumaticoBD.php", true);
        xhttp.setRequestHeader("enctype", "multipart/form-data");
        xhttp.send(formData);
        RespuestaNeumaticosBDJSON();
        LimpiarNeumaticosBdHTML();
    }
    Jeronimo_Granadillo.AgregarNeumaticoFoto = AgregarNeumaticoFoto;
    function ModificarNeumaticoFoto() {
        let marca = document.getElementById("marca").value;
        let medidas = document.getElementById("medidas").value;
        let id = parseInt(document.getElementById("id").value);
        let precio = parseInt(document.getElementById("precio").value);
        let nuevaFoto = document.getElementById("foto");
        let neumatico = new Jeronimo_Granadillo.NeumaticoBd(marca, medidas, precio, id, "");
        if (nuevaFoto.files[0] == null) {
            alert("Seleccione una foto para poder modificar");
        }
        else {
            xhttp.open('POST', './backend/modificarNeumaticoBDFoto.php', true);
            formData.append('foto', nuevaFoto.files[0]);
            formData.append("neumatico_json", JSON.stringify(neumatico));
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(formData);
            RespuestaNeumaticosBDJSON();
            LimpiarNeumaticosBdHTML();
        }
    }
    Jeronimo_Granadillo.ModificarNeumaticoFoto = ModificarNeumaticoFoto;
    function EliminarNeumaticoFoto() {
        let marca = document.getElementById("marca").value;
        let medidas = document.getElementById("medidas").value;
        let id = parseInt(document.getElementById("id").value);
        let precio = parseInt(document.getElementById("precio").value);
        let nuevaFoto = document.getElementById("foto");
        let neumatico = new Jeronimo_Granadillo.NeumaticoBd(marca, medidas, precio, id, "");
        xhttp.open('POST', './backend/eliminarNeumaticoBDFoto.php', true);
        formData.append('foto', nuevaFoto.files[0]);
        formData.append("neumatico_json", JSON.stringify(neumatico));
        xhttp.setRequestHeader("enctype", "multipart/form-data");
        xhttp.send(formData);
        RespuestaNeumaticosBDJSON();
        LimpiarNeumaticosBdHTML();
    }
    Jeronimo_Granadillo.EliminarNeumaticoFoto = EliminarNeumaticoFoto;
    function MostrarFotosModificados() {
        xhttp.open('GET', "./backend/mostrarFotosDeModificados.php");
        xhttp.send();
        let div = document.getElementById("divTablaNeumaticos");
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log(xhttp.responseText);
                div.innerHTML = xhttp.responseText;
            }
        };
    }
    Jeronimo_Granadillo.MostrarFotosModificados = MostrarFotosModificados;
    function MostrarBorrados() {
        xhttp.open('GET', "./backend/mostrarBorradosJSON.php");
        xhttp.send();
        xhttp.onreadystatechange = () => {
            let div = document.getElementById("divTablaNeumaticos");
            let tabla = `<table>
           <tr>
                 <th>MARCA</th><th>MEDIDAS</th><th>PRECIO</th><th>FOTO</th>
           </tr>`;
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                let jsonMsj = JSON.parse(xhttp.responseText);
                for (let i = 0; i < jsonMsj.length; i++) {
                    let dato = jsonMsj[i];
                    tabla += `<tr>
                                  <th>${dato.marca}</th><th>${dato.medidas}</th><th>${dato.precio}</th><th><img src=${dato.pathFoto} width=50 height=50 /></th>
                           </tr>
                 `;
                }
            }
            tabla += `</table>`;
            div.innerHTML = tabla;
        };
    }
    Jeronimo_Granadillo.MostrarBorrados = MostrarBorrados;
})(Jeronimo_Granadillo || (Jeronimo_Granadillo = {}));
