import App from './class/App';
// import { Usuario } from './models/usuarios.model';
// import { Administrador } from './models/administrador.model';
// import { AdministradorService } from './services/AdministradorService';

const app = new App();
app.listen();
// app.sequelize();
// (async () => {
//     let usuarioNuevo = new Administrador({
//         nombres_usuario: 'Camilo',
//         apellidos_usuario: 'asdfasd',
//         numero_documento: 151321,
//         password: 'sdfsdf',
//         emailInstitucional: 'cgarcia369@misena.edu.co',
//         direccion_recidencial: 'asdasd',
//         telefono_movil: 123123123,
//         id_ciudad: 1,
//         id_tipo_rol: 1,
//         id_tipo_documento: 1,
//     });
//     console.log(usuarioNuevo);
//     await usuarioNuevo.save();
//     // let res = await Usuario.login({
//     //     numero_documento: 151321,
//     //     id_tipo_documento: 1,
//     //     password: 'db9c7040-bc82-4a31-b6ca-ecf95cb0a7b2',
//     // });
//     // console.log(res);
//     // await usuarioNuevo.registrarUsuario();
// })();
