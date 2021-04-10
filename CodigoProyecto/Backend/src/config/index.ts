import { Sequelize } from 'sequelize-typescript'
import { Usuario } from '../models/usuarios.model';
import { Departamento } from '../models/departamentos.models';
import { Ciudades } from '../models/cuidades.model';
import { Tipo_roles } from '../models/tipo_roles.models';

const path = require('path')
// console.log(path.resolve(__dirname, '../models'))
const sequelize: Sequelize = new Sequelize({
  database: 'qrlean',
  dialect: 'mysql',
  username: 'root',
  password: '',
  storage: ':memory:',
  models: [Usuario,Departamento,Ciudades,Tipo_roles],
})
// try {
//   sequelize 
// } catch (e) {
//   throw new Error('Error sequelize')
// }
module.exports = {sequelize}
