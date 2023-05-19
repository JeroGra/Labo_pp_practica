namespace Jeronimo_Granadillo
{
    export class Neumatico
    {
        marca : string;
        medidas : string;
        precio : Number;

        constructor(marca:string,medidas:string,precio:Number)
        {
            this.marca = marca;
            this.medidas = medidas;
            this.precio = precio;
        }

        toString():string
        {
            let str = "marca:"+this.marca+",medidas:"+this.medidas+",precio:"+this.precio;
            return str;
        }

    }

    export class NeumaticoBd extends Neumatico
    {
        id : Number;
        pathFoto : string;

        constructor(marca:string,medidas:string,precio:Number,id:Number,pathFoto:string)
        {
            super(marca,medidas,precio);
            this.id = id;
            this.pathFoto = pathFoto;
        }

    }
}