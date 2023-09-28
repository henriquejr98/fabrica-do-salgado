import Cliente from '../models/Cliente';

class ClienteController {
  async store(req, res) {
    try {
      const novoCliente = await Cliente.create(req.body);
      const { nome, telefone, endereco } = novoCliente;
      return res.json({ nome, telefone, endereco });
    } catch (e) {
      return res.status(400).json({
        errors: 'Não foi possível criar cliente.',
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const clientes = await Cliente.findAll({ attributes: ['nome', 'telefone', 'endereco'] });
      return res.json(clientes);
    } catch (e) {
      return res.json(null);
    }
  }

  // Update
  async update(req, res) {
    try {
      const cliente = await Cliente.findByPk(req.clienteId);
      if (!cliente) {
        return res.status(400).json({
          errors: ['Cliente não existe.'],
        });
      }
      const clienteAtualizado = await cliente.update(req.body);
      const { nome, telefone, endereco } = clienteAtualizado;
      return res.json({ nome, telefone, endereco });
    } catch (e) {
      return res.status(400).json({
        errors: 'Não foi possível atualizar cliente.',
      });
    }
  }
}

export default new ClienteController();
