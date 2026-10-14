export const VERBOS_META = Object.freeze({
  "actividadId": "6-lengua-verbos-modos",
  "tituloActividad": "Verbos · Indicativo, subjuntivo e imperativo",
  "version": "1.0",
  "cursoReferencia": "6.º de Primaria",
  "materia": "Lengua",
  "tema": "Verbos · Indicativo, subjuntivo e imperativo",
  "cierreFirmes": "hoy las ideas sobre formas, modos y tiempos se vieron firmes."
});

export const BLOQUES_RESULTADO = Object.freeze([
  {
    "id": "base",
    "icono": "🔗",
    "titulo": "Base de 5.º",
    "descripcion": "Conjugación, raíz, formas personales y no personales, simples y compuestas."
  },
  {
    "id": "indicativo",
    "icono": "📘",
    "titulo": "Indicativo y tiempos",
    "descripcion": "Identificar acciones presentadas como hechos y distinguir tiempos y aspecto."
  },
  {
    "id": "modos",
    "icono": "💬",
    "titulo": "Elegir el modo",
    "descripcion": "Diferenciar afirmación, deseo, duda y posibilidad dentro de una oración."
  },
  {
    "id": "subjuntivo",
    "icono": "🌱",
    "titulo": "Tiempos del subjuntivo",
    "descripcion": "Reconocer presente, imperfecto y formas compuestas; consultar futuros poco habituales."
  },
  {
    "id": "imperativo",
    "icono": "👉",
    "titulo": "Imperativo y órdenes negativas",
    "descripcion": "Usar órdenes, sugerencias y consejos, y distinguir formas afirmativas y negativas."
  }
]);

export const PRACTICA_VERBOS = Object.freeze([
  {
    "id": "practica-conjugacion",
    "bloqueId": "base",
    "conceptoId": "conjugacion",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Base de 5.º",
    "enunciado": "Temer",
    "pregunta": "¿A qué conjugación pertenece?",
    "opciones": [
      {
        "id": "0",
        "texto": "Primera: -ar"
      },
      {
        "id": "1",
        "texto": "Segunda: -er"
      },
      {
        "id": "2",
        "texto": "Tercera: -ir"
      }
    ],
    "respuestaCorrecta": "1",
    "explicacion": "«Temer» termina en -er: segunda conjugación.",
    "pista": "Busca el infinitivo, el auxiliar o la terminación de la forma."
  },
  {
    "id": "practica-formas",
    "bloqueId": "base",
    "conceptoId": "formas",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Base de 5.º",
    "enunciado": "Habíamos hablado",
    "pregunta": "¿Qué tipo de forma verbal es?",
    "opciones": [
      {
        "id": "0",
        "texto": "Simple"
      },
      {
        "id": "1",
        "texto": "Compuesta"
      },
      {
        "id": "2",
        "texto": "Infinitivo"
      }
    ],
    "respuestaCorrecta": "1",
    "explicacion": "«Habíamos» es el auxiliar haber y «hablado» el participio.",
    "pista": "Busca el infinitivo, el auxiliar o la terminación de la forma."
  },
  {
    "id": "practica-tiempo",
    "bloqueId": "indicativo",
    "conceptoId": "tiempo",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Indicativo y tiempos",
    "enunciado": "Marina viajó a África.",
    "pregunta": "¿En qué modo está «viajó»?",
    "opciones": [
      {
        "id": "0",
        "texto": "Indicativo"
      },
      {
        "id": "1",
        "texto": "Subjuntivo"
      },
      {
        "id": "2",
        "texto": "Imperativo"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "La oración narra un hecho pasado: indicativo.",
    "pista": "Mira si se afirma un hecho, cuándo ocurre y si se presenta terminado."
  },
  {
    "id": "practica-aspecto",
    "bloqueId": "indicativo",
    "conceptoId": "aspecto",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Indicativo y tiempos",
    "enunciado": "Yo canté en el concierto.",
    "pregunta": "¿Qué tiempo tiene «canté»?",
    "opciones": [
      {
        "id": "0",
        "texto": "Pretérito perfecto simple"
      },
      {
        "id": "1",
        "texto": "Pretérito imperfecto"
      },
      {
        "id": "2",
        "texto": "Presente"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "«Canté» presenta una acción pasada como terminada.",
    "pista": "Mira si se afirma un hecho, cuándo ocurre y si se presenta terminado."
  },
  {
    "id": "practica-afirmacion",
    "bloqueId": "modos",
    "conceptoId": "afirmacion",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Elegir el modo",
    "enunciado": "Yo sé que ella es una oveja.",
    "pregunta": "¿Qué forma está en indicativo?",
    "opciones": [
      {
        "id": "0",
        "texto": "sé"
      },
      {
        "id": "1",
        "texto": "sea"
      },
      {
        "id": "2",
        "texto": "cante"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "«Sé» presenta el conocimiento como una afirmación.",
    "pista": "¿La persona afirma algo o expresa una duda o posibilidad?"
  },
  {
    "id": "practica-duda",
    "bloqueId": "modos",
    "conceptoId": "duda",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Elegir el modo",
    "enunciado": "Dudo que sea una oveja.",
    "pregunta": "¿Qué modo tiene «sea»?",
    "opciones": [
      {
        "id": "0",
        "texto": "Indicativo"
      },
      {
        "id": "1",
        "texto": "Subjuntivo"
      },
      {
        "id": "2",
        "texto": "Imperativo"
      }
    ],
    "respuestaCorrecta": "1",
    "explicacion": "La duda se expresa con «sea», presente de subjuntivo.",
    "pista": "¿La persona afirma algo o expresa una duda o posibilidad?"
  },
  {
    "id": "practica-presente",
    "bloqueId": "subjuntivo",
    "conceptoId": "presente",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Tiempos del subjuntivo",
    "enunciado": "Te ruego que estudies este año.",
    "pregunta": "¿Qué tiempo tiene «estudies»?",
    "opciones": [
      {
        "id": "0",
        "texto": "Presente de subjuntivo"
      },
      {
        "id": "1",
        "texto": "Imperfecto de subjuntivo"
      },
      {
        "id": "2",
        "texto": "Presente de indicativo"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "La petición se expresa con «estudies», presente de subjuntivo.",
    "pista": "Busca la forma de haber o la terminación del verbo."
  },
  {
    "id": "practica-imperfecto",
    "bloqueId": "subjuntivo",
    "conceptoId": "imperfecto",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Tiempos del subjuntivo",
    "enunciado": "Si estudiaras un poco más…",
    "pregunta": "¿Qué forma tiene el mismo valor en este ejemplo?",
    "opciones": [
      {
        "id": "0",
        "texto": "estudiases"
      },
      {
        "id": "1",
        "texto": "estudias"
      },
      {
        "id": "2",
        "texto": "estudiarás"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "«Estudiaras» y «estudiases» son las dos variantes del imperfecto de subjuntivo.",
    "pista": "Busca la forma de haber o la terminación del verbo."
  },
  {
    "id": "practica-compuesto",
    "bloqueId": "subjuntivo",
    "conceptoId": "compuesto",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Tiempos del subjuntivo",
    "enunciado": "Me alegra que el artista haya cantado esa canción.",
    "pregunta": "¿Qué tiempo tiene «haya cantado»?",
    "opciones": [
      {
        "id": "0",
        "texto": "Pretérito perfecto compuesto de subjuntivo"
      },
      {
        "id": "1",
        "texto": "Presente de indicativo"
      },
      {
        "id": "2",
        "texto": "Pluscuamperfecto de indicativo"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "«Haya» + «cantado» forma el perfecto compuesto de subjuntivo. La alegría puede referirse a un hecho real.",
    "pista": "Busca la forma de haber o la terminación del verbo."
  },
  {
    "id": "practica-futuro",
    "bloqueId": "subjuntivo",
    "conceptoId": "futuro",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Tiempos del subjuntivo",
    "enunciado": "Sea lo que fuere.",
    "pregunta": "¿Cómo se clasifica «fuere»?",
    "opciones": [
      {
        "id": "0",
        "texto": "Futuro de subjuntivo, poco usado hoy"
      },
      {
        "id": "1",
        "texto": "Presente de indicativo"
      },
      {
        "id": "2",
        "texto": "Imperativo"
      }
    ],
    "respuestaCorrecta": "0",
    "explicacion": "«Fuere» es futuro de subjuntivo. Hoy suele decirse «sea lo que sea».",
    "pista": "Busca la forma de haber o la terminación del verbo."
  },
  {
    "id": "practica-afirmativo",
    "bloqueId": "imperativo",
    "conceptoId": "afirmativo",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Imperativo y órdenes negativas",
    "enunciado": "Salid de ahí ahora mismo.",
    "pregunta": "¿Qué modo tiene «salid»?",
    "opciones": [
      {
        "id": "0",
        "texto": "Indicativo"
      },
      {
        "id": "1",
        "texto": "Subjuntivo"
      },
      {
        "id": "2",
        "texto": "Imperativo"
      }
    ],
    "respuestaCorrecta": "2",
    "explicacion": "Es una orden afirmativa dirigida a vosotros o vosotras.",
    "pista": "Mira a quién se dirige la indicación y si lleva «no»."
  },
  {
    "id": "practica-negativo",
    "bloqueId": "imperativo",
    "conceptoId": "negativo",
    "tipoEvidencia": "seleccion_simple",
    "titulo": "Imperativo y órdenes negativas",
    "enunciado": "No vayas tan rápido.",
    "pregunta": "Según la clasificación del material, ¿qué forma verbal expresa la orden negativa?",
    "opciones": [
      {
        "id": "0",
        "texto": "Presente de indicativo"
      },
      {
        "id": "1",
        "texto": "Presente de subjuntivo"
      },
      {
        "id": "2",
        "texto": "Infinitivo"
      }
    ],
    "respuestaCorrecta": "1",
    "explicacion": "La orden negativa usa «no» + presente de subjuntivo: «no vayas».",
    "pista": "Mira a quién se dirige la indicación y si lleva «no»."
  }
]);

export const FAMILIAS_PRUEBA_VERBOS = Object.freeze([
  {
    "id": "familia-conjugacion",
    "variantes": [
      {
        "id": "verbos-conjugacion-1",
        "bloqueId": "base",
        "conceptoId": "conjugacion",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Base de 5.º",
        "enunciado": "Temer",
        "pregunta": "¿A qué conjugación pertenece?",
        "opciones": [
          {
            "id": "0",
            "texto": "Primera: -ar"
          },
          {
            "id": "1",
            "texto": "Segunda: -er"
          },
          {
            "id": "2",
            "texto": "Tercera: -ir"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "«Temer» termina en -er: segunda conjugación."
      },
      {
        "id": "verbos-conjugacion-2",
        "bloqueId": "base",
        "conceptoId": "conjugacion",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Base de 5.º",
        "enunciado": "Partir",
        "pregunta": "¿A qué conjugación pertenece?",
        "opciones": [
          {
            "id": "0",
            "texto": "Primera: -ar"
          },
          {
            "id": "1",
            "texto": "Segunda: -er"
          },
          {
            "id": "2",
            "texto": "Tercera: -ir"
          }
        ],
        "respuestaCorrecta": "2",
        "explicacion": "«Partir» termina en -ir: tercera conjugación."
      }
    ]
  },
  {
    "id": "familia-formas",
    "variantes": [
      {
        "id": "verbos-formas-1",
        "bloqueId": "base",
        "conceptoId": "formas",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Base de 5.º",
        "enunciado": "Habíamos hablado",
        "pregunta": "¿Qué tipo de forma verbal es?",
        "opciones": [
          {
            "id": "0",
            "texto": "Simple"
          },
          {
            "id": "1",
            "texto": "Compuesta"
          },
          {
            "id": "2",
            "texto": "Infinitivo"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "«Habíamos» es el auxiliar haber y «hablado» el participio."
      },
      {
        "id": "verbos-formas-2",
        "bloqueId": "base",
        "conceptoId": "formas",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Base de 5.º",
        "enunciado": "Bailando",
        "pregunta": "¿Qué forma no personal aparece?",
        "opciones": [
          {
            "id": "0",
            "texto": "Infinitivo"
          },
          {
            "id": "1",
            "texto": "Gerundio"
          },
          {
            "id": "2",
            "texto": "Participio"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "La terminación -ando corresponde al gerundio."
      }
    ]
  },
  {
    "id": "familia-tiempo",
    "variantes": [
      {
        "id": "verbos-tiempo-1",
        "bloqueId": "indicativo",
        "conceptoId": "tiempo",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Indicativo y tiempos",
        "enunciado": "Marina viajó a África.",
        "pregunta": "¿En qué modo está «viajó»?",
        "opciones": [
          {
            "id": "0",
            "texto": "Indicativo"
          },
          {
            "id": "1",
            "texto": "Subjuntivo"
          },
          {
            "id": "2",
            "texto": "Imperativo"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "La oración narra un hecho pasado: indicativo."
      },
      {
        "id": "verbos-tiempo-2",
        "bloqueId": "indicativo",
        "conceptoId": "tiempo",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Indicativo y tiempos",
        "enunciado": "Nosotras cantaremos mañana.",
        "pregunta": "¿Qué tiempo tiene «cantaremos»?",
        "opciones": [
          {
            "id": "0",
            "texto": "Presente"
          },
          {
            "id": "1",
            "texto": "Pretérito imperfecto"
          },
          {
            "id": "2",
            "texto": "Futuro imperfecto"
          }
        ],
        "respuestaCorrecta": "2",
        "explicacion": "La forma simple «cantaremos» sitúa la acción en el futuro."
      }
    ]
  },
  {
    "id": "familia-aspecto",
    "variantes": [
      {
        "id": "verbos-aspecto-1",
        "bloqueId": "indicativo",
        "conceptoId": "aspecto",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Indicativo y tiempos",
        "enunciado": "Yo canté en el concierto.",
        "pregunta": "¿Qué tiempo tiene «canté»?",
        "opciones": [
          {
            "id": "0",
            "texto": "Pretérito perfecto simple"
          },
          {
            "id": "1",
            "texto": "Pretérito imperfecto"
          },
          {
            "id": "2",
            "texto": "Presente"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "«Canté» presenta una acción pasada como terminada."
      },
      {
        "id": "verbos-aspecto-2",
        "bloqueId": "indicativo",
        "conceptoId": "aspecto",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Indicativo y tiempos",
        "enunciado": "Yo cantaba mientras ella leía.",
        "pregunta": "¿Qué tiempo tiene «cantaba»?",
        "opciones": [
          {
            "id": "0",
            "texto": "Pretérito perfecto simple"
          },
          {
            "id": "1",
            "texto": "Pretérito imperfecto"
          },
          {
            "id": "2",
            "texto": "Futuro"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "«Cantaba» presenta la acción pasada en desarrollo."
      }
    ]
  },
  {
    "id": "familia-afirmacion",
    "variantes": [
      {
        "id": "verbos-afirmacion-1",
        "bloqueId": "modos",
        "conceptoId": "afirmacion",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Elegir el modo",
        "enunciado": "Yo sé que ella es una oveja.",
        "pregunta": "¿Qué forma está en indicativo?",
        "opciones": [
          {
            "id": "0",
            "texto": "sé"
          },
          {
            "id": "1",
            "texto": "sea"
          },
          {
            "id": "2",
            "texto": "cante"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "«Sé» presenta el conocimiento como una afirmación."
      },
      {
        "id": "verbos-afirmacion-2",
        "bloqueId": "modos",
        "conceptoId": "afirmacion",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Elegir el modo",
        "enunciado": "Está claro que la oveja come hierba.",
        "pregunta": "¿Qué modo tiene «come» aquí?",
        "opciones": [
          {
            "id": "0",
            "texto": "Indicativo"
          },
          {
            "id": "1",
            "texto": "Subjuntivo"
          },
          {
            "id": "2",
            "texto": "Imperativo"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "«Está claro que» introduce aquí un hecho afirmado."
      }
    ]
  },
  {
    "id": "familia-duda",
    "variantes": [
      {
        "id": "verbos-duda-1",
        "bloqueId": "modos",
        "conceptoId": "duda",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Elegir el modo",
        "enunciado": "Dudo que sea una oveja.",
        "pregunta": "¿Qué modo tiene «sea»?",
        "opciones": [
          {
            "id": "0",
            "texto": "Indicativo"
          },
          {
            "id": "1",
            "texto": "Subjuntivo"
          },
          {
            "id": "2",
            "texto": "Imperativo"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "La duda se expresa con «sea», presente de subjuntivo."
      },
      {
        "id": "verbos-duda-2",
        "bloqueId": "modos",
        "conceptoId": "duda",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Elegir el modo",
        "enunciado": "Puede ser que coma mucha hierba.",
        "pregunta": "¿Qué modo tiene «coma»?",
        "opciones": [
          {
            "id": "0",
            "texto": "Indicativo"
          },
          {
            "id": "1",
            "texto": "Subjuntivo"
          },
          {
            "id": "2",
            "texto": "Imperativo"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "Se presenta una posibilidad: «coma» está en subjuntivo."
      }
    ]
  },
  {
    "id": "familia-presente",
    "variantes": [
      {
        "id": "verbos-presente-1",
        "bloqueId": "subjuntivo",
        "conceptoId": "presente",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Tiempos del subjuntivo",
        "enunciado": "Te ruego que estudies este año.",
        "pregunta": "¿Qué tiempo tiene «estudies»?",
        "opciones": [
          {
            "id": "0",
            "texto": "Presente de subjuntivo"
          },
          {
            "id": "1",
            "texto": "Imperfecto de subjuntivo"
          },
          {
            "id": "2",
            "texto": "Presente de indicativo"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "La petición se expresa con «estudies», presente de subjuntivo."
      },
      {
        "id": "verbos-presente-2",
        "bloqueId": "subjuntivo",
        "conceptoId": "presente",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Tiempos del subjuntivo",
        "enunciado": "Puede que corramos en la maratón.",
        "pregunta": "¿Qué tiempo tiene «corramos»?",
        "opciones": [
          {
            "id": "0",
            "texto": "Presente de indicativo"
          },
          {
            "id": "1",
            "texto": "Presente de subjuntivo"
          },
          {
            "id": "2",
            "texto": "Futuro de subjuntivo"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "«Puede que» presenta una posibilidad con presente de subjuntivo."
      }
    ]
  },
  {
    "id": "familia-imperfecto",
    "variantes": [
      {
        "id": "verbos-imperfecto-1",
        "bloqueId": "subjuntivo",
        "conceptoId": "imperfecto",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Tiempos del subjuntivo",
        "enunciado": "Si estudiaras un poco más…",
        "pregunta": "¿Qué forma tiene el mismo valor en este ejemplo?",
        "opciones": [
          {
            "id": "0",
            "texto": "estudiases"
          },
          {
            "id": "1",
            "texto": "estudias"
          },
          {
            "id": "2",
            "texto": "estudiarás"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "«Estudiaras» y «estudiases» son las dos variantes del imperfecto de subjuntivo."
      },
      {
        "id": "verbos-imperfecto-2",
        "bloqueId": "subjuntivo",
        "conceptoId": "imperfecto",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Tiempos del subjuntivo",
        "enunciado": "Si saliesen, se mojarían.",
        "pregunta": "¿Qué forma puede sustituir a «saliesen» sin cambiar el sentido?",
        "opciones": [
          {
            "id": "0",
            "texto": "salgan"
          },
          {
            "id": "1",
            "texto": "salían"
          },
          {
            "id": "2",
            "texto": "salieran"
          }
        ],
        "respuestaCorrecta": "2",
        "explicacion": "«Saliesen» y «salieran» son variantes del mismo tiempo."
      }
    ]
  },
  {
    "id": "familia-compuesto",
    "variantes": [
      {
        "id": "verbos-compuesto-1",
        "bloqueId": "subjuntivo",
        "conceptoId": "compuesto",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Tiempos del subjuntivo",
        "enunciado": "Me alegra que el artista haya cantado esa canción.",
        "pregunta": "¿Qué tiempo tiene «haya cantado»?",
        "opciones": [
          {
            "id": "0",
            "texto": "Pretérito perfecto compuesto de subjuntivo"
          },
          {
            "id": "1",
            "texto": "Presente de indicativo"
          },
          {
            "id": "2",
            "texto": "Pluscuamperfecto de indicativo"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "«Haya» + «cantado» forma el perfecto compuesto de subjuntivo. La alegría puede referirse a un hecho real."
      },
      {
        "id": "verbos-compuesto-2",
        "bloqueId": "subjuntivo",
        "conceptoId": "compuesto",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Tiempos del subjuntivo",
        "enunciado": "Si hubiera estudiado más, habría aprobado.",
        "pregunta": "¿Qué tiempo tiene «hubiera estudiado»?",
        "opciones": [
          {
            "id": "0",
            "texto": "Pretérito perfecto simple"
          },
          {
            "id": "1",
            "texto": "Pluscuamperfecto de subjuntivo"
          },
          {
            "id": "2",
            "texto": "Futuro perfecto"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "«Hubiera» + participio forma el pluscuamperfecto de subjuntivo."
      }
    ]
  },
  {
    "id": "familia-futuro",
    "variantes": [
      {
        "id": "verbos-futuro-1",
        "bloqueId": "subjuntivo",
        "conceptoId": "futuro",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Tiempos del subjuntivo",
        "enunciado": "Sea lo que fuere.",
        "pregunta": "¿Cómo se clasifica «fuere»?",
        "opciones": [
          {
            "id": "0",
            "texto": "Futuro de subjuntivo, poco usado hoy"
          },
          {
            "id": "1",
            "texto": "Presente de indicativo"
          },
          {
            "id": "2",
            "texto": "Imperativo"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "«Fuere» es futuro de subjuntivo. Hoy suele decirse «sea lo que sea»."
      },
      {
        "id": "verbos-futuro-2",
        "bloqueId": "subjuntivo",
        "conceptoId": "futuro",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Tiempos del subjuntivo",
        "enunciado": "Todo aquel que hubiere violado las normas…",
        "pregunta": "¿Cómo se clasifica «hubiere violado»?",
        "opciones": [
          {
            "id": "0",
            "texto": "Presente de subjuntivo"
          },
          {
            "id": "1",
            "texto": "Futuro perfecto de subjuntivo, poco usado hoy"
          },
          {
            "id": "2",
            "texto": "Pretérito imperfecto"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "«Hubiere» + participio forma el futuro perfecto de subjuntivo; aparece sobre todo en textos formales."
      }
    ]
  },
  {
    "id": "familia-afirmativo",
    "variantes": [
      {
        "id": "verbos-afirmativo-1",
        "bloqueId": "imperativo",
        "conceptoId": "afirmativo",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Imperativo y órdenes negativas",
        "enunciado": "Salid de ahí ahora mismo.",
        "pregunta": "¿Qué modo tiene «salid»?",
        "opciones": [
          {
            "id": "0",
            "texto": "Indicativo"
          },
          {
            "id": "1",
            "texto": "Subjuntivo"
          },
          {
            "id": "2",
            "texto": "Imperativo"
          }
        ],
        "respuestaCorrecta": "2",
        "explicacion": "Es una orden afirmativa dirigida a vosotros o vosotras."
      },
      {
        "id": "verbos-afirmativo-2",
        "bloqueId": "imperativo",
        "conceptoId": "afirmativo",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Imperativo y órdenes negativas",
        "enunciado": "Estudia hasta las cuatro.",
        "pregunta": "¿Qué modo tiene «estudia» en esta oración?",
        "opciones": [
          {
            "id": "0",
            "texto": "Imperativo"
          },
          {
            "id": "1",
            "texto": "Indicativo"
          },
          {
            "id": "2",
            "texto": "Infinitivo"
          }
        ],
        "respuestaCorrecta": "0",
        "explicacion": "Aquí «estudia» se dirige a tú como una orden o indicación; el contexto determina el uso."
      }
    ]
  },
  {
    "id": "familia-negativo",
    "variantes": [
      {
        "id": "verbos-negativo-1",
        "bloqueId": "imperativo",
        "conceptoId": "negativo",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Imperativo y órdenes negativas",
        "enunciado": "No vayas tan rápido.",
        "pregunta": "Según la clasificación del material, ¿qué forma verbal expresa la orden negativa?",
        "opciones": [
          {
            "id": "0",
            "texto": "Presente de indicativo"
          },
          {
            "id": "1",
            "texto": "Presente de subjuntivo"
          },
          {
            "id": "2",
            "texto": "Infinitivo"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "La orden negativa usa «no» + presente de subjuntivo: «no vayas»."
      },
      {
        "id": "verbos-negativo-2",
        "bloqueId": "imperativo",
        "conceptoId": "negativo",
        "tipoEvidencia": "seleccion_simple",
        "titulo": "Imperativo y órdenes negativas",
        "enunciado": "¡Callad, por favor!",
        "pregunta": "¿Cuál es la forma negativa correspondiente?",
        "opciones": [
          {
            "id": "0",
            "texto": "No callad"
          },
          {
            "id": "1",
            "texto": "No calléis"
          },
          {
            "id": "2",
            "texto": "No callaréis"
          }
        ],
        "respuestaCorrecta": "1",
        "explicacion": "Para la orden negativa a vosotros/vosotras se utiliza «no calléis», presente de subjuntivo."
      }
    ]
  }
]);
