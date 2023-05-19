"use strict";
var Jeronimo_Granadillo;
(function (Jeronimo_Granadillo) {
    class Neumatico {
        constructor(marca, medidas, precio) {
            this.marca = marca;
            this.medidas = medidas;
            this.precio = precio;
        }
        toString() {
            let str = "marca:" + this.marca + ",medidas:" + this.medidas + ",precio:" + this.precio;
            return str;
        }
    }
    Jeronimo_Granadillo.Neumatico = Neumatico;
    class NeumaticoBd extends Neumatico {
        constructor(marca, medidas, precio, id, pathFoto) {
            super(marca, medidas, precio);
            this.id = id;
            this.pathFoto = pathFoto;
        }
    }
    Jeronimo_Granadillo.NeumaticoBd = NeumaticoBd;
})(Jeronimo_Granadillo || (Jeronimo_Granadillo = {}));
