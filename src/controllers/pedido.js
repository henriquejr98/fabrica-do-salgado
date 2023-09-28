/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import moment from 'moment-timezone';
import Cliente from '../models/Cliente';
import Pedido from '../models/Pedido';
import PedidoSalgado from '../models/PedidoSalgado';

class PedidoController {
  async store(req, res) {
    try {
      const {
        clienteId,
        salgados,
        dataEntrega,
      } = req.body;

      const cliente = await Cliente.findByPk(clienteId);
      if (!cliente) {
        return res.status(400).json({
          error: 'Cliente não encontrado',
        });
      }

      // Define o valor padrão do salgado.
      const valorPedido = salgados.map(({ quantidade }) => quantidade * 4.25)
        .reduce((total, subtotal) => total + subtotal, 0);

      const dataSaoPaulo = moment.tz('America/Sao_Paulo');
      if (dataEntrega < dataSaoPaulo.format()) {
        return res.status(400).json({
          error: 'A data não pode ser menor que o dia atual.',
        });
      }

      const novoPedido = await Pedido.create({
        valorPedido,
        clienteId,
        dataEntrega,
      });

      const salgadosId = [];
      if (salgados && salgados.length > 0) {
        for (const { salgadoId, quantidade } of salgados) {
          if (salgadosId.includes(salgadoId)) {
            return res.status(400).json({
              error: 'Salgado repetido!',
            });
          }
          salgadosId.push(salgadoId);

          await PedidoSalgado.create({
            quantidade,
            pedido_id: novoPedido.id,
            salgado_id: salgadoId,
          });
          // const salgado = Salgado.findByPk(salgadoId);
          // await novoPedido.addSalgado(salgado, { through: { quantidade } });
        }
      }
      return res.status(201).json(novoPedido);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: 'Não foi possível fazer pedido.',
      });
    }
  }

  async index(req, res) {
    const { clienteId } = req.body;
    const pedidos = await Pedido.findAll({ where: { clienteId } });
    res.json(pedidos);
  }

  async update(req, res) {
    const {
      pedidoId,
      dataEntrega,
      salgados,
    } = req.body;
    try {
      if (dataEntrega) {
        await Pedido.update({ dataEntrega });
      }
      if (salgados) {
        const pedidosSalgados = await PedidoSalgado.findAll({
          where: {
            pedidoId,
          },
        });
        console.log(pedidosSalgados);
        // for (const { salgadoId, quantidade } of salgados){
        //   if
        // }
      }

      return res.status(200).json({
        mensagem: 'Pedido atualizado com sucesso',
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: 'Não foi possível atualizar pedido.',
      });
    }
  }

  async fecharPedidos(req, res) {
    try {
      const { idPedidos, valorSalgado } = req.body;
      let somaFechamento = 0;

      for (const idPedido of idPedidos) {
        const pedido = await Pedido.findByPk(idPedido);

        if (!pedido) {
          return res.status(404).json({
            error: 'Pedido não encontrado!',
          });
        }

        if (pedido.statusPagamento === 'Pago') {
          return res.status(400).json({
            error: 'Pedido já foi fechado!',
          });
        }

        pedido.statusPagamento = 'Pago';

        if (valorSalgado) {
          pedido.valorPedido = (pedido.valorPedido / 4.25) * valorSalgado;
        }

        somaFechamento += pedido.valorPedido;
        await pedido.save();
      }

      return res.status(200).json({
        mensagem: 'Pedido(s) fechado(s) com sucesso',
        somaFechamento,
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        error: 'Não foi possível fechar o(s) pedido(s).',
      });
    }
  }
}

export default new PedidoController();
