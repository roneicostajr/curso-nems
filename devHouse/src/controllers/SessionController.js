import User from '../models/User';
import * as Yup from 'yup';

//metodos: index, show, update, store, destroy

/**
 * index: listagem de sessões
 * store: criar uma sessão
 * show: listar uma UNICA sessão
 * update: alterar alguma sessão
 * destroy: deletar uma sessão
 */

class SessionController {
  async store(req, res) {
    const { email } = req.body;

    const schema = Yup.object().shape({
      email: Yup.email().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Falha na validação' });

    //Verifica se o usuário existe
    let user = await User.findOne({ email });

    //Cria um usuário se ele não existe
    if (!user) {
      user = await User.create({ email });
    }

    res.json(user);
  }
}

export default new SessionController();
