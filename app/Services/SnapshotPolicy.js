const SnapshotPolicy = use('App/Models/SnapshotPolicy');

class SnapshotPolicyService {
  async getAllSnapshotPolicies() {
    return SnapshotPolicy.all();
  }

  async getSnapshotPolicyById(id) {
    return SnapshotPolicy.findOrFail(id);
  }

  async createSnapshotPolicy(data) {
    return SnapshotPolicy.create(data);
  }

  async updateSnapshotPolicy(id, data) {
    const snapshotPolicy = await SnapshotPolicy.findOrFail(id);
    snapshotPolicy.merge(data);
    await snapshotPolicy.save();
    return snapshotPolicy;
  }

  async deleteSnapshotPolicy(id) {
    const snapshotPolicy = await SnapshotPolicy.findOrFail(id);
    await snapshotPolicy.delete();
  }
}

module.exports = SnapshotPolicyService;
