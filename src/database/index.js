import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Salgado from '../models/Salgado';
import User from '../models/User';
import Cliente from '../models/Cliente';
import Pedido from '../models/Pedido';
import PedidoSalgado from '../models/PedidoSalgado';
import Foto from '../models/Foto';

const models = [Salgado, User, Cliente, Pedido, PedidoSalgado, Foto];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
