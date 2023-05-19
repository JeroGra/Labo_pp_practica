<?php

require_once "./clases/neumaticoBD.php";

use Jeronimo_Granadillo\NeumaticoBd;

if(isset($_GET["tabla"]) == "mostrar")
{
    $tabla = "<table><tr><td>ID</td></tr><tr><td>MARCA</td></tr><tr><td>MEDIDAS</td></tr><tr><td>PRECIO</td></tr><tr><td>FOTO</td></tr>";
    $array = NeumaticoBd::traer();

    $neu = new stdClass;

    foreach($array as $e)
    {
        $neu = json_decode($e->toJSON());
        $tabla .= "<tr><td>{$neu->id}</td></tr><tr><td>{$neu->marca}</td></tr><tr><td>{$neu->medidas}</td></tr><tr><td>{$neu->precio}</td></tr><tr><td><img src={$neu->pathFoto}  ></td></tr></br>";
    }

    $tabla.="</table>";

    echo $tabla;

}
else
{
    $array = NeumaticoBd::traer();
    $arrRt = array();
        foreach($array as $obj)
        {
            $stdRt = new stdClass;
            $stdRt->id = $obj->GetID();
            $stdRt->marca = $obj->GetMarca();
            $stdRt->medidas = $obj->GetMedidas();
            $stdRt->precio = $obj->GetPrecio();
            $stdRt->pathFoto = $obj->GetFoto();
            array_push($arrRt,$stdRt);
        }

        echo json_encode($arrRt);
}

?>