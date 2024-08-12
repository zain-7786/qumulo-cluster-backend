const Cluster = use('App/Models/Cluster');
const ClusterService = use('App/Services/ClusterService');
const ClusterValidator = use('App/Http/Validators/ClusterValidator');
const { LogicalException } = use('@adonisjs/core/src/Exception');

class ClusterController {
  async index({ response }) {
    const clusters = await ClusterService.getAllClusters();
    return response.json(clusters);
  }

  async show({ response, params }) {
    const { id } = params;
    const cluster = await ClusterService.getClusterById(id);
    if (!cluster) {
      throw new LogicalException('Cluster not found', 404);
    }
    return response.json(cluster);
  }

  async create({ request, response }) {
    const { errors, validatedData } = await request.validate(ClusterValidator);

    if (errors.size()) {
      return response.status(422).json({ errors: errors.messages() });
    }

    try {
      const cluster = await ClusterService.createCluster(validatedData);
      return response.status(201).json(cluster);
    } catch (error) {
      if (error instanceof LogicalException) {
        return response.status(error.status).json({ message: error.message });
      } else {
        console.error(error);
        return response.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  async update({ params, request, response }) {
    const { id } = params;
    const { errors, validatedData } = await request.validate(ClusterValidator);

    if (errors.size()) {
      return response.status(422).json({ errors: errors.messages() });
    }

    try {
      const cluster = await ClusterService.updateCluster(id, validatedData);
      if (!cluster) {
        throw new LogicalException('Cluster not found', 404);
      }
      return response.json(cluster);
    } catch (error) {
      if (error instanceof LogicalException) {
        return response.status(error.status).json({ message: error.message });
      } else {
        console.error(error);
        return response.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }

  async destroy({ params, response }) {
    const { id } = params;
    try {
      const cluster = await ClusterService.deleteCluster(id);
      if (!cluster) {
        throw new LogicalException('Cluster not found', 404);
      }
      return response.status(204).send();
    } catch (error) {
      if (error instanceof LogicalException) {
        return response.status(error.status).json({ message: error.message });
      } else {
        console.error(error);
        return response.status(500).json({ message: 'Internal Server Error' });
      }
    }
  }
}

module.exports = ClusterController;
