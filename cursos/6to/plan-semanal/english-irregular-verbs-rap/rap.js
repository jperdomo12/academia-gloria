import { FRAGMENTOS_RAP } from "./rap-data.js";
import { mostrarFragmentos } from "../fragmentos.js?v=2";

mostrarFragmentos(document.querySelector("#fragmentosRap"), FRAGMENTOS_RAP);

import { iniciarRapTeam } from "./rap-team.js?v=6";

const team = iniciarRapTeam(document.querySelector("#rap-team"), FRAGMENTOS_RAP);

import { iniciarRapStudio } from "./rap-studio.js?v=3";
iniciarRapStudio(document.querySelector("#rapStudio"), FRAGMENTOS_RAP, team);
