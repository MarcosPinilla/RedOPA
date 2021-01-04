import login from './usuario/login.mutation';
import deleteUsuario from './usuario/delete.mutation';
import createAmigo from './amigo/create.mutation';
import deleteAmigo from './amigo/delete.mutation';
import createContacto from './contacto/create.mutation';
import deleteContacto from './contacto/delete.mutation';
import createContactoExterno from './contactoexterno/create.mutation';
import deleteContactoExterno from './contactoexterno/delete.mutation';
import createInteresAlumno from './interesalumno/create.mutation';
import createInteresAlumnoLista from './interesalumno/createlist.mutation';
import deleteInteresAlumno from './interesalumno/delete.mutation';
import updateConfiguracionPerfil from './alumno/updateconfiguracionperfil.mutation';
import updateAliasFoto from './alumno/updatealiasfoto.mutation';
import updatePassword from './usuario/updatepassword.mutation';
import recoverPassword from './usuario/recoverpassword.mutation';
import updatePasswordLibre from './usuario/updatepasswordlibre.mutation';
import updateMinoriaAlumno from './alumno/updateminoriaalumno.mutation';
import deleteMinoriaAlumno from './alumno/deleteminoriaalumno.mutation';
import updateEmail from './usuario/updateemail.mutation';
import createEvaluacion from './evaluacion/create.mutation';
import subirAlumnos from './usuario/subiralumnos.mutation';
import subirFuncionarios from './usuario/subirfuncionarios.mutation';
import createPublicacion from './publicacion/create.mutation';
import updatePublicacion from './publicacion/update.mutation';
import deletePublicacion from './publicacion/delete.mutation';
import updateFoto from './usuario/updatefoto.mutation';
import loginAdmin from './admin/loginadmin.mutation';
import createFuncionario from './funcionario/create.mutation';
import updateFuncionario from './funcionario/update.mutation';
import deleteFuncionario from './funcionario/delete.mutation';
import createApoderado from './apoderado/create.mutation';
import updateApoderado from './apoderado/update.mutation';
import deleteApoderado from './apoderado/delete.mutation';
import createAlumno from './alumno/create.mutation';
import updateAlumno from './alumno/update.mutation';
import deleteAlumno from './alumno/delete.mutation';
import updatePuebloIndigenaAlumno from './alumno/updatepuebloalumno.mutation';
import updateOrientacionSexualAlumno from './alumno/updateorientacionalumno.mutation';
import updateIdentidadGeneroAlumno from './alumno/updategeneroalumno.mutation';
import deletePuebloIndigenaAlumno from './alumno/deletepuebloalumno.mutation';
import deleteOrientacionSexualAlumno from './alumno/deleteorientacionalumno.mutation';
import deleteIdentidadGeneroAlumno from './alumno/deletegeneroalumno.mutation';
import updateAlertas from './institucion/updatealertas.mutation';
import updateConsentimiento from './usuario/updateconsentimiento.mutation';
import cambiarVisibilidadPublicacion from './publicacion/cambiarvisibilidadpublicacion.mutation';
import agregarAdmin from './admin/agregaradmin.mutation';
import quitarAdmin from './admin/quitaradmin.mutation';
import updateUmbralRiesgo from './institucion/updateumbralriesgo.mutation';
import leerAlerta from './admin/leeralerta.mutation';
import restaurarAlumno from './alumno/restore.mutation';
import restaurarApoderado from './apoderado/restore.mutation';
import restaurarFuncionario from './funcionario/restore.mutation';
import restaurarPublicacion from './publicacion/restore.mutation';

export default {
  login,
  deleteUsuario,
  createAmigo,
  deleteAmigo,
  createContacto,
  deleteContacto,
  createContactoExterno,
  deleteContactoExterno,
  createInteresAlumno,
  createInteresAlumnoLista,
  deleteInteresAlumno,
  updateConfiguracionPerfil,
  updateAliasFoto,
  updatePassword,
  updatePasswordLibre,
  recoverPassword,
  updateMinoriaAlumno,
  deleteMinoriaAlumno,
  updateEmail,
  createEvaluacion,
  subirAlumnos,
  subirFuncionarios,
  createPublicacion,
  updatePublicacion,
  deletePublicacion,
  updateFoto,
  loginAdmin,
  createFuncionario,
  updateFuncionario,
  deleteFuncionario,
  createApoderado,
  updateApoderado,
  deleteApoderado,
  createAlumno,
  updateAlumno,
  deleteAlumno,
  updatePuebloIndigenaAlumno,
  updateOrientacionSexualAlumno,
  updateIdentidadGeneroAlumno,
  deletePuebloIndigenaAlumno,
  deleteOrientacionSexualAlumno,
  deleteIdentidadGeneroAlumno,
  updateAlertas,
  updateConsentimiento,
  cambiarVisibilidadPublicacion,
  agregarAdmin,
  updateUmbralRiesgo,
  leerAlerta,
  restaurarAlumno,
  restaurarApoderado,
  restaurarFuncionario,
  restaurarPublicacion,
};