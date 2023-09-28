import Salgado from '../models/Salgado';
import Foto from '../models/Foto';

class SalgadoController {
  async store(req, res) {
    try {
      const novoSalgado = await Salgado.create(req.body);
      const { nome, descricao } = novoSalgado;
      return res.json({ nome, descricao });
    } catch (e) {
      return res.status(400).json({
        error: 'Não foi possível criar salgado.',
      });
    }
  }

  async index(req, res) {
    const salgados = await Salgado.findAll({
      attributes: ['id', 'nome', 'descricao'],
      order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
      include: {
        model: Foto,
        attributes: ['url', 'filename'],
      },
    });
    res.json(salgados);
  }
}

export default new SalgadoController();
