import { iniciarTemaVerbal } from "../../../../compartido/js/motor-practica-verbal.js";
import { NUTRICION_META, BLOQUES_RESULTADO, PRACTICA_NUTRICION, FAMILIAS_PRUEBA_NUTRICION } from "./nutricion-data.js";

await iniciarTemaVerbal({meta:NUTRICION_META, bloques:BLOQUES_RESULTADO, practica:PRACTICA_NUTRICION, familias:FAMILIAS_PRUEBA_NUTRICION, campoSemantico:"la nutrición y los sistemas del cuerpo"});
