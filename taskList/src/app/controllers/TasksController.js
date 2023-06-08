import Task from '../models/Task';
import * as Yup from 'yup';

class TasksController {
  async index(req, res) {
    const tasks = await Task.findAll({
      where: { user_id: req.userId, check: false },
    });

    return res.json(tasks);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      task: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({ error: 'Falha na validação' });

    const { task } = req.body;
    const tasks = await Task.create({
      user_id: req.userId,
      task,
    });

    res.json(tasks);
  }

  async update(req, res) {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) return res.status(400).json({ error: 'Tarefa não existe' });

    await task.update(req.body);

    return res.json(task);
  }

  async delete(req, res) {
    const { id } = req.params;
    const task = await Task.findByPk(id);

    if (!task) return res.status(400).json({ error: 'Tarefa não existe' });

    if (req.userId !== task.user_id)
      return res.status(401).json({ error: 'Não autorizado' });

    await task.destroy();

    return res.send();
  }
}

export default new TasksController();
