const Cluster = use('App/Models/Cluster');
const fs = require('fs').promises; // For JSON file access
const { LogicalException } = use('@adonisjs/core/src/Exception');
const Env = use('Env');

class ClusterService {
  async getAllClusters() {
    const dataDir = Env.get('DATA_DIR');
    const dataPath = `${dataDir}/clusters.json`;
    try {
      const data = await fs.readFile(dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new LogicalException('Error reading cluster data', 500);
    }
  }

  async getClusterById(id) {
    const clusters = await this.getAllClusters();
    const cluster = clusters.find((cluster) => cluster.id === id);
    if (!cluster) {
      throw new LogicalException('Cluster not found', 404);
    }
    return cluster;
  }

  async createCluster(data) {
    const clusters = await this.getAllClusters();

    // Validation
    const validationErrors = [];
    if (!data.name) {
      validationErrors.push('Cluster name is required');
    } else if (data.name.length < 3) {
      validationErrors.push('Cluster name must be at least 3 characters');
    } else if (data.name.length > 255) {
      validationErrors.push('Cluster name cannot exceed 255 characters');
    }

    if (validationErrors.length > 0) {
      throw new LogicalException(validationErrors.join(', '), 422);
    }

    // Generate a unique ID (replace with a more robust approach if needed)
    data.id = uuid.v4();

    clusters.push(data);
    await this.saveClusters(clusters);
    return data;
  }

  async updateCluster(id, data) {
    const clusters = await this.getAllClusters();
    const clusterIndex = clusters.findIndex((cluster) => cluster.id === id);

    if (clusterIndex === -1) {
      throw new LogicalException('Cluster not found', 404);
    }

    // Validation
    const validationErrors = [];
    if (!data.name) {
      validationErrors.push('Cluster name is required');
    } else if (data.name.length < 3) {
      validationErrors.push('Cluster name must be at least 3 characters');
    } else if (data.name.length > 255) {
      validationErrors.push('Cluster name cannot exceed 255 characters');
    }

    if (validationErrors.length > 0) {
      throw new LogicalException(validationErrors.join(', '), 422);
    }

    clusters[clusterIndex] = { ...clusters[clusterIndex], ...data };
    await this.saveClusters(clusters);
    return clusters[clusterIndex];
  }

  async deleteCluster(id) {
    const clusters = await this.getAllClusters();
    const clusterIndex = clusters.findIndex((cluster) => cluster.id === id);

    if (clusterIndex === -1) {
      throw new LogicalException('Cluster not found', 404);
    }

    clusters.splice(clusterIndex, 1);
    await this.saveClusters(clusters);
    return true;
  }

  async saveClusters(clusters) {
    const dataDir = Env.get('DATA_DIR');
    const dataPath = `${dataDir}/clusters.json`;
    try {
      await fs.writeFile(dataPath, JSON.stringify(clusters, null, 2), 'utf-8');
    } catch (error) {
      throw new LogicalException('Error saving cluster data', 500);
    }
  }
}

module.exports = ClusterService;