<?php

require_once "./clases/neumaticoBD.php";

use Jeronimo_Granadillo\NeumaticoBd;

$nJSON = $_POST["neumatico_json"];
$nStd = new stdClass;
$nStd = json_decode($nJSON);
$objRt = new stdClass;
$objRt->exito = false;
$objRt->mensaje = "No se pudo eliminar el neumatico";

if(NeumaticoBD::eliminar($nStd->id))
{
    $objRt->exito = true;
    $objRt->mensaje = "Neumatico eliminado!";
}

echo json_encode($objRt);

?>