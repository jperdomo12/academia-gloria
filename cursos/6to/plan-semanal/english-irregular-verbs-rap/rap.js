import { FRAGMENTOS_RAP } from "./rap-data.js";
import { mostrarFragmentos } from "../fragmentos.js?v=2";

mostrarFragmentos(document.querySelector("#fragmentosRap"), FRAGMENTOS_RAP);

import { iniciarRapTeam } from "./rap-team.js";

iniciarRapTeam(document.querySelector("#rap-team"), FRAGMENTOS_RAP);
