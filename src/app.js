import dotenv from 'dotenv';
import express from 'express';
import { resolve } from 'path';
import home from './routes/home';
import user from './routes/user';
import token from './routes/token';
import salgado from './routes/salgado';
import pedido from './routes/pedido';
import cliente from './routes/cliente';
import foto from './routes/foto';

import './database';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', home);
    this.app.use('/users/', user);
    this.app.use('/tokens/', token);
    this.app.use('/salgados/', salgado);
    this.app.use('/pedidos/', pedido);
    this.app.use('/clientes/', cliente);
    this.app.use('/fotos/', foto);
  }
}

export default new App().app;
