import usuario from './usuario/usuario.query';
import usuarios from './usuario/usuarios.query';
import institucion from './institucion/institucion.query';
import instituciones from './institucion/instituciones.query';
import alumno from './alumno/alumno.query';
import alumnos from './alumno/alumnos.query';
import searchAlumno from './alumno/searchalumno.query';
import amigos from './amigo/amigos.query';
import funcionarios from './funcionario/funcionarios.query';
import contactos from './contacto/contactos.query';
import contactosExternos from './contactoexterno/contactosexternos.query';
import intereses from './interes/intereses.query';
import publicaciones from './publicacion/publicaciones.query';
import publicacionesInteresQuery from './publicacion/publicaciones.query';
import configuracionPerfil from './alumno/configuracionperfil.query';
import logueado from './usuario/logueado.query';
import publicacionesAlumno from './publicacion/publicacionesalumno.query';
import noAmigos from './alumno/noamigos.query';
import searchNoAmigos from './alumno/searchnoamigos.query'
import noContactos from './contacto/nocontactos.query';
import searchNoContactos from './contacto/searchnocontactos.query';
import noIntereses from './interes/nointereses.query';
import interesesAlumno from './interes/interesesalumno.query';
import minoriasQuery from './minoria/minorias.query';
import pupilosQuery from './apoderado/pupilos.query';
import companerosQuery from './alumno/companeros.query';
import noAmigosCurso from './amigo/noamigoscurso.query';
import historialApoderado from './evaluacion/historialapoderado.query';
import comprobarEvaluacion from './evaluacion/comprobarevaluacion.query';
import sugerenciasQuery from './sugerencia/sugerencia.query';
import apoderadosPupiloQuery from './apoderado/apoderadospupilo.query';
import funcionariosAdminQuery from './funcionario/funcionariosadmin.query';
import alumnosAdminQuery from './alumno/alumnosadmin.query';
import apoderadosAdminQuery from './apoderado/apoderadosadmin.query';
import pueblosIndigenasQuery from './puebloindigena/pueblosindigenas.query';
import orientacionesSexualesQuery from './orientacionsexual/orientacionsexual.query';
import identidadesGeneroQuery from './identidadgenero/identidadgenero.query';
import evaluacionesMensualesQuery from './evaluacion/evaluacionesmensuales.query';
import autoevaluacionesDia from './evaluacion/autoevaluacionesdia.query';
import alertasInstitucion from './institucion/alertasinstitucion.query';
import consentimientoQuery from './usuario/consentimiento.query';
import estadisticasAutoevaluacionesAlumnos from './estadisticas/estadisticasautoevaluacionesalumnos.query';
import estadisticasCoevaluacionesAlumnos from './estadisticas/estadisticascoevaluacionesalumnos.query';
import estadisticasEvaluacionesApoderados from './estadisticas/estadisticasevaluacionesapoderados.query';
import promedioEvaluacionesFuncionarios from './estadisticas/promedioevaluacionesfuncionarios.query';
import apoderadosInstitucion from './apoderado/apoderadosinstitucion.query';
import searchApoderadosInstitucion from './apoderado/searchapoderadoinstitucion.query';
import apoderadoQuery from './apoderado/apoderado.query';
import cursosInstitucionQuery from './institucion/cursosinstitucion.query';
import funcionarioQuery from './funcionario/funcionario.query';
import publicacionesAdminQuery from './publicacion/publicacionesadmin.query';
import alumnosRiesgoQuery from './alumno/alumnosriesgo.query';
import umbralRiesgoQuery from './institucion/umbralriesgo.query';
import alertasQuery from './admin/alertas.query';
import usuariosActivosQuery from './estadisticas/usuariosactivos.query';
import cantidadCoevaluacionesAlumnos from './estadisticas/cantidadcoevaluacionesalumnos.query';
import cantidadAutoevaluacionesAlumnos from './estadisticas/cantidadautoevaluacionesalumnos.query';
import alumnosActivosQuery from './estadisticas/alumnosactivos.query';
import interesesCursoQuery from './interes/interesescurso.query';
import alumnosEliminadosQuery from './alumno/eliminados.query';
import apoderadosEliminadosQuery from './apoderado/eliminados.query';
import funcionariosEliminadosQuery from './funcionario/eliminados.query';
import searchFuncionario from './funcionario/searchfuncionario.query';
import publicacionesEliminadasQuery from './publicacion/eliminados.query';
import alumnosExcelQuery from './alumno/alumnosexcel.query';

export default {
  usuario,
  usuarios,
  institucion,
  instituciones,
  alumno,
  alumnos,
  searchAlumno,
  amigos,
  funcionarios,
  contactos,
  contactosExternos,
  intereses,
  publicaciones,
  configuracionPerfil,
  logueado,
  publicacionesAlumno,
  publicacionesInteresQuery,
  noAmigos,
  searchNoAmigos,
  noContactos,
  searchNoContactos,
  noIntereses,
  interesesAlumno,
  minoriasQuery,
  pupilosQuery,
  companerosQuery,
  noAmigosCurso,
  historialApoderado,
  comprobarEvaluacion,
  sugerenciasQuery,
  apoderadosPupiloQuery,
  funcionariosAdminQuery,
  alumnosAdminQuery,
  apoderadosAdminQuery,
  pueblosIndigenasQuery,
  orientacionesSexualesQuery,
  identidadesGeneroQuery,
  evaluacionesMensualesQuery,
  autoevaluacionesDia,
  alertasInstitucion,
  consentimientoQuery,
  estadisticasAutoevaluacionesAlumnos,
  estadisticasCoevaluacionesAlumnos,
  estadisticasEvaluacionesApoderados,
  promedioEvaluacionesFuncionarios,
  apoderadosInstitucion,
  searchApoderadosInstitucion,
  apoderadoQuery,
  cursosInstitucionQuery,
  funcionarioQuery,
  publicacionesAdminQuery,
  alumnosRiesgoQuery,
  umbralRiesgoQuery,
  alertasQuery,
  usuariosActivosQuery,
  cantidadCoevaluacionesAlumnos,
  cantidadAutoevaluacionesAlumnos,
  alumnosActivosQuery,
  interesesCursoQuery,
  alumnosEliminadosQuery,
  apoderadosEliminadosQuery,
  funcionariosEliminadosQuery,
  searchFuncionario,
  publicacionesEliminadasQuery,
  alumnosExcelQuery,
};