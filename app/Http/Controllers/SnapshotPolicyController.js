const SnapshotPolicyService = use('App/Services/SnapshotPolicyService');

class SnapshotPolicyController {
  async index({ response }) {
    try {
      const snapshotPolicies = await SnapshotPolicyService.getAllSnapshotPolicies();
      return response.json(snapshotPolicies);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Error fetching snapshot policies' });
    }
  }

  async show({ response, params }) {
    try {
      const { id } = params;
      const snapshotPolicy = await SnapshotPolicyService.getSnapshotPolicyById(id);
      return response.json(snapshotPolicy);
    } catch (error) {
      console.error(error);
      if (error.name === 'NotFoundError') {
        return response.status(404).json({ message: 'Snapshot policy not found' });
      }
      return response.status(500).json({ message: 'Error fetching snapshot policy' });
    }
  }

  async create({ request, response }) {
    try {
      const data = request.only(['/* snapshot policy fields */']);
      const snapshotPolicy = await SnapshotPolicyService.createSnapshotPolicy(data);
      return response.status(201).json(snapshotPolicy);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Error creating snapshot policy' });
    }
  }

  async update({ params, request, response }) {
    try {
      const { id } = params;
      const data = request.only(['/* snapshot policy fields */']);
      const snapshotPolicy = await SnapshotPolicyService.updateSnapshotPolicy(id, data);
      return response.json(snapshotPolicy);
    } catch (error) {
      console.error(error);
      if (error.name === 'NotFoundError') {
        return response.status(404).json({ message: 'Snapshot policy not found' });
      }
      return response.status(500).json({ message: 'Error updating snapshot policy' });
    }
  }

  async delete({ params, response }) {
    try {
      const { id } = params;
      await SnapshotPolicyService.deleteSnapshotPolicy(id);
      return response.status(204).send();
    } catch (error) {
      console.error(error);
      if (error.name === 'NotFoundError') {
        return response.status(404).json({ message: 'Snapshot policy not found' });
      }
      return response.status(500).json({ message: 'Error deleting snapshot policy' });
    }
  }
}

module.exports = SnapshotPolicyController;
