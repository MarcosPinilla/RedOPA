'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Sugerencias', [
      {
        titulo: 'Estrategias para mejorar tu ánimo:',
        contenido: '• Sonríe, aunque no tengas ganas de hacerlo.\n'
          + '• Cambia la postura, siéntate derecho y adopta una posición de poder.\n'
          + '• Pon una mano en tu corazón y siente sus latidos.\n'
          + '• Escucha música que te haga feliz.\n'
          + '• Toma una hoja en blanco y escribe 10 cosas que te han dado felicidad.\n'
          + '• Mira las fotografías o recuerdos de momentos felices.\n'
          + '• Arréglate, busca tu ropa favorita.\n'
          + '• Sal a caminar o a hacer algún ejercicio que te guste.\n'
          + '• Comunícate con es@ amig@ que te hace reír.\n'
          + '• Abraza por 1 minuto a alguien de tu confianza.\n'
          + '• Deja que el sol o una luz intensa iluminen tu rostro.\n'
          + '• Siente algún aroma agradable.\n'
          + '• Cómete un caramelo o un trocito de chocolate.',
        fuente: 'Centro OPA',
        tipo: 'alumno',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: 'Estrategias para mejorar el ánimo de tu pupilo:',
        contenido: '• Nunca cuestiones su pena, a todos nos afectan las cosas de forma distinta.\n'
          + '• No transformes el momento de confianza en un interrogatorio, ESCÚCHAL@.\n'
          + '• Dile 5 cosas por las que estás orgullos@ de el(la).\n'
          + '• ABRÁZALO, como mínimo por un minuto.\n'
          + '• Incentíval@ a que sonría, aunque no tenga ganas de hacerlo.\n'
          + '• Motíval@ a que cambie su postura, se siente derech@ y adopte una posición de poder.\n'
          + '• Invítal@ a que ponga una mano en su corazón y sienta sus latidos.\n'
          + '• Intenta que escuche música que l@ haga feliz, o tú pon música de momentos felices.\n'
          + '• Incentíval@ a que tome una hoja en blanco y escriba 10 cosas que le han dado felicidad.\n'
          + '• Muéstrale o invital@ a mirar fotografías o recuerdos de momentos felices.\n'
          + '• Ayúdalo o incítal@ a arreglarse, a buscar su ropa favorita, e invítal@ a salir.\n'
          + '• Anímal@ a hacer algún ejercicio que le guste.\n'
          + '• Invítalo a comunicarse con un amig@ que lo haga reír.\n'
          + '• Convídale un caramelo o un trocito de chocolate.',
        fuente: 'Centro OPA',
        tipo: 'apoderado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: 'Estrategias para mejorar el ánimo de tu estudiante:',
        contenido: '• Dile 3 cosas positivas o logros sobre su persona.\n'
          + '• Incentíval@ a que sonría, aunque no tenga ganas de hacerlo (ej. cuéntale un chiste).\n'
          + '• Motíval@ a que cambie su postura, se siente derech@ y adopte una posición de poder.\n'
          + '• Invítal@ a que ponga una mano en su corazón y sienta sus latidos.\n'
          + '• Intenta que escuche música que l@ haga feliz.\n'
          + '• Incentíval@ a que tome una hoja en blanco y escriba 10 cosas que le han dado felicidad.\n'
          + '• Invítal@ a mirar fotografías o recuerdos de momentos felices.\n'
          + '• Incítal@ a arreglarse, a buscar su ropa favorita.\n'
          + '• Anímal@ a hacer algún ejercicio que le guste.\n'
          + '• Invítalo a comunicarse con un amig@ que lo haga reír.\n'
          + '• Convídale un caramelo o un trocito de chocolate.',
        fuente: 'Centro OPA',
        tipo: 'funcionario',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: 'Mitos y realidades del suicidio:',
        contenido: 'Mitos del suicidio:\n'
          + '1. El que se quiere morir no lo dice.\n'
          + '2. No hay que hablar sobre suicidio con alguien que quiere suicidarse.\n'
          + '3. Hay que incentivar a alguien con ideas suicidas para evitar que se mate.\n'
          + '4. Sólo los profesionales de salud expertos pueden evitar que alguien se mate.\n'
          + '5. El que intenta morir es un cobarde.\n'
          + '6. Si se mejoró de una crisis suicida nunca más lo intentará.\n'
          + '7. Todos los suicidas están deprimidos.\n'
          + '8. Si intenta una vez suicidarse, lo intentará siempre.\n'
          + '9. Cuando alguien decide terminar con su vida no hay nada que se pueda hacer para evitarlo.\n'
          + '1. La mayoría de las personas que se terminan con su vida, dan señales previas.\n'
          + '2. Es positivo escuchar y acompañar a alguien que tiene deseos de morir.\n'
          + '3. Desafiar a un suicida es un acto irresponsable, pues es una persona que está sufriendo, desafiarlo no evitará que se suicide.\n'
          + '4. Personas no especialistas también pueden ayudar a prevenir el suicidio.\n'
          + '5. El que intenta suicidarse no es valiente ni cobarde es una persona que está sufriendo y siente que no hay otra opción.\n'
          + '6. Muchos suicidios ocurren cuando hay un periodo de mejoría.\n'
          + '7. Existe más posibilidad de que alguien deprimido intente quitarse la vida, pero no solamente los deprimidos lo intentan.\n'
          + '8. Cuando se recibe ayuda a tiempo, con un tratamiento adecuado, la persona podría no intentar nunca más quitarse la vida.\n'
          + '9. Cuando alguien decide terminar con su vida existe posibilidad de cambiar su decisión con acompañamiento contante y ayuda profesional.',
        fuente: 'SEREMI Salud Región de La Araucanía',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: 'Señales de alerta de suicidio:',
        contenido: 'Si un estudiante está pensando en terminar con su vida podría presentar algunas de las siguientes señales:\n'
          + '• Buscar armas de fuego, pastillas u otro medio letal.\n'
          + '• Planificar su muerte (lugar, medio, etc).\n'
          + '• Enviar cartas o mensajes por redes sociales despidiéndose.\n'
          + '• Hablar asumiendo que no estará presente en el futuro.\n'
          + '• Presentar cortes en muñecas, muslos, etc.\n'
          + '• Amenazar con herirse o matarse.\n'
          + '• Decir que no tiene razones para vivir.\n'
          + '• Sentirse atrapado, bloqueado o sufrir un dolor que no puede soportar.\n'
          + '• Sentirse una carga para otros (amigo, familia, etc.) o el responsable de todo lo malo que sucede.\n'
          + '• Alejarse de su familia, amigos y redes sociales.\n'
          + '• Bajar su rendimiento académico.\n'
          + '• Aumentar su consumo de alcohol y/o drogas.\n'
          + '• Presentar cambios abruptos de ánimo.\n'
          + '• Dejar de lado su imagen personal y/o presentar abandono/descuido de sí mismo.\n'
          + '• Haber sufrido uno o varios eventos traumáticos en los últimos tres meses.',
        fuente: 'SEREMI Salud Región de La Araucanía',
        tipo: 'alumno',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: 'Señales de alerta de suicidio:',
        contenido: 'Si su pupilo está pensando en terminar con su vida podría presentar algunas de las siguientes señales:\n'
          + '• Intentar conseguir armas de fuego, pastillas u otro medio letal.\n'
          + '• Planificar su suicidio (lugar, medio, etc).\n'
          + '• Enviar cartas o mensajes por redes sociales despidiéndose.\n'
          + '• Hablar asumiendo que no estará presente en el futuro.\n'
          + '• Presentar cortes en muñecas, muslos, etc.\n'
          + '• Amenazar con matarse.\n'
          + '• Decir que no quiere seguir viviendo o que no tiene razones para vivir.\n'
          + '• Sentir un dolor que dice que no puede soportar.\n'
          + '• Sentirse una carga para otros (amigo, familia, etc.) o el responsable de todo lo malo que sucede.\n'
          + '• Aislarse de su familia, amigos y redes sociales.\n'
          + '• Bajar su rendimiento académico.\n'
          + '• Aumentar su consumo de alcohol y/o drogas.\n'
          + '• Presentar cambios abruptos de ánimo.\n'
          + '• Dejar de lado su imagen personal y/o presentar abandono/descuido de sí mismo.\n'
          + '• Haber sufrido uno o varios eventos traumáticos en los últimos tres meses.',
        fuente: 'SEREMI Salud Región de La Araucanía',
        tipo: 'apoderado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: 'Señales de alerta de suicidio:',
        contenido: 'Si un estudiante está pensando en terminar con su vida podría presentar algunas de las siguientes señales:\n'
          + '• Intentar conseguir armas de fuego, pastillas u otro medio letal.\n'
          + '• Planificar su suicidio (lugar, medio, etc).\n'
          + '• Enviar cartas o mensajes por redes sociales despidiéndose.\n'
          + '• Hablar asumiendo que no estará presente en el futuro.\n'
          + '• Presentar cortes en muñecas, muslos, etc.\n'
          + '• Amenazar con matarse.\n'
          + '• Decir que no quiere seguir viviendo o que no tiene razones para vivir.\n'
          + '• Sentir un dolor que dice que no puede soportar.\n'
          + '• Sentirse una carga para otros (amigo, familia, etc.) o el responsable de todo lo malo que sucede.\n'
          + '• Aislarse de su familia, amigos y redes sociales.\n'
          + '• Bajar su rendimiento académico.\n'
          + '• Aumentar su consumo de alcohol y/o drogas.\n'
          + '• Presentar cambios abruptos de ánimo.\n'
          + '• Dejar de lado su imagen personal y/o presentar abandono/descuido de sí mismo.\n'
          + '• Haber sufrido uno o varios eventos traumáticos en los últimos tres meses.\n',
        fuente: 'SEREMI Salud Región de La Araucanía',
        tipo: 'funcionario',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: '¿Cómo ayudar a un amigo que quiere terminar con su vida?',
        contenido: '• Nunca cuestiones su pena, a todos nos afectan las cosas de forma distinta.\n'
          + '• No transformes el momento de confianza en un interrogatorio, ESCÚCHAL@.\n'
          + '• Muéstrate preocupado por lo que le sucede, mirándolo a los ojos y dejando de hacer lo que te mantenía ocupado.'
          + '• No te centres en las cosas malas que le han pasado.\n'
          + '• Muéstrale tu preocupación constante, no dejes que se sienta solo.',
        fuente: 'Centro OPA',
        tipo: 'alumno',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: '¿Cómo ayudar a mi pupilo si quiere terminar con su vida?',
        contenido: '• Nunca cuestiones su pena, a todos nos afectan las cosas de forma distinta.\n'
          + '• No transformes el momento de confianza en un interrogatorio, ESCÚCHAL@.\n'
          + '• Muéstrate preocupado por lo que le sucede, mirándolo a los ojos y dejando de hacer lo que te mantenía ocupado.'
          + '• No te centres en las cosas malas que le han pasado.\n'
          + '• Muéstrale tu preocupación constante, no dejes que se sienta solo.'
          + '• Ayúdalo a buscar ayuda, respetando sus tiempos.\n'
          + '• No lo dejes solo, ni con acceso a medios letales (armas, cuerdas, medicamentos, etc.)',
        fuente: 'Centro OPA',
        tipo: 'apoderado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: '¿Cómo ayudar a un estudiante que quiere terminar con su vida?',
        contenido: '• Nunca cuestiones su pena, a todos nos afectan las cosas de forma distinta.\n'
          + '• No transformes el momento de confianza en un interrogatorio, ESCÚCHAL@.\n'
          + '• Muéstrate preocupado por lo que le sucede, mirándolo a los ojos y dejando de hacer lo que te mantenía ocupado.'
          + '• No te centres en las cosas malas que le han pasado.\n'
          + '• Muéstrale tu preocupación constante, no dejes que se sienta solo.'
          + '• Incentívalo a que le cuente a un adulto de su confianza.\n'
          + '• Invítalo a buscar ayuda.\n'
          + '• Informa de esta situación a los encargados de convivencia escolar de tu establecimiento.',
        fuente: 'Centro OPA',
        tipo: 'funcionario',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: '¿Quién puede ayudar a un@ amig@ que quiere terminar con su vida?',
        contenido: '• Las personas encargadas de Convivencia Escolar o Psicólog@s de tu establecimiento educativo, solicitando una hora para explicar la situación (de lunes a viernes de 8:00 a 17:00).\n'
          + '• Profesionales del centro de salud más cercano, solicitando una hora con un profesional en compañía de un adulto.\n'
          + '• Salud Responde del Ministerio de Salud, llamando al 600 360 7777.\n'
          + '• Línea Libre de Fundación para la Confianza, llamando al 1515 (de lunes a sábado de 16:00 a 22:00).\n'
          + '• Si hay maltrato, puedes llamar al Servicio Nacional de Menores al 800 730 800.\n'
          + '• Si hay Bullying o Acoso Escolar, puedes consultar o denunciar a la Superintendencia de Educación llamando al 600 600 26 26.\n'
          + '• Ante denuncias o urgencias llama al Fono Niñ@s de Carabineros 147 o al Fono Familia de Carabineros 149.',
        fuente: 'Centro OPA',
        tipo: 'alumno',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: '¿Quién puede ayudar a mi pupilo si quiere terminar con su vida?',
        contenido: '• Las personas encargadas de Convivencia Escolar o Psicólog@s de tu establecimiento educativo, solicitando una hora para explicar la situación (de lunes a viernes de 8:00 a 17:00).\n'
          + '• Profesionales del centro de salud más cercano, solicitando una hora con un profesional de salud, explicando el motivo de consulta.\n'
          + '• Salud Responde del Ministerio de Salud, llamando al 600 360 7777.\n'
          + '• Línea Libre de Fundación para la Confianza, llamando al 1515 (de lunes a sábado de 16:00 a 22:00).\n'
          + '• Si hay maltrato, puede llamar al Servicio Nacional de Menores al 800 730 800.\n'
          + '• Si hay Bullying o Acoso Escolar, puede consultar o denunciar a la Superintendencia de Educación llamando al 600 600 26 26.\n'
          + '• Ante denuncias o urgencias llama al Fono Niñ@s de Carabineros 147 o al Fono Familia de Carabineros 149.',
        fuente: 'Centro OPA',
        tipo: 'apoderado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: '¿Quién puede ayudar a un estudiante si quiere terminar con su vida?',
        contenido: '• Las personas encargadas de Convivencia Escolar o Psicólog@s de tu establecimiento educativo, solicitando una hora para explicar la situación (de lunes a viernes de 8:00 a 17:00).\n'
          + '• Profesionales del centro de salud más cercano, debe solicitar una hora con un profesional de salud, acompañado de un adulto, explicando el motivo de consulta.\n'
          + '• Salud Responde del Ministerio de Salud, llamando al 600 360 7777.\n'
          + '• Línea Libre de Fundación para la Confianza, llamando al 1515 (de lunes a sábado de 16:00 a 22:00).\n'
          + '• Si hay maltrato, puede llamar al Servicio Nacional de Menores al 800 730 800.\n'
          + '• Si hay Bullying o Acoso Escolar, puede consultar o denunciar a la Superintendencia de Educación llamando al 600 600 26 26.\n'
          + '• Ante denuncias o urgencias llama al Fono Niñ@s de Carabineros 147 o al Fono Familia de Carabineros 149.',
        fuente: 'Centro OPA',
        tipo: 'funcionario',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        titulo: 'Enlaces de ayuda:',
        contenido: 'https://www.paho.org/chi/\n'
        + 'http://www.opa.cl\n'
        + 'https://www.junaeb.cl/habilidades-para-la-vida\n'
        + 'http://www.cuidatuanimo.org\n'
        + 'http://www.achid.cl\n'
        + 'https://todomejora.org\n'
        + 'https://www.fundacionsummer.com/noticia/\n'
        + 'https://fundacionbelen.org\n'
        + 'https://www.tdesperanza.cl/\n'
        + 'https://www.fundacionjoseignacio.org',
        fuente: 'Centro OPA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Sugerencias', null, {});
  }
};
