const test = use('Test/Suite')('ClusterService');
const ClusterService = use('App/Services/ClusterService');
const Env = use('Env');
const fs = require('fs').promises;
const sinon = require('sinon');
const uuid = require('uuid');

test('getAllClusters', async ({ assert }) => {
  // Mock the fs.readFile function
  const mockData = [{ id: 1, name: 'Cluster 1' }];
  const mockDataPath = Env.get('DATA_DIR') + '/clusters.json';
  sinon.stub(fs, 'readFile').resolves(JSON.stringify(mockData));

  const service = new ClusterService();
  const clusters = await service.getAllClusters();

  assert.deepEqual(clusters, mockData);
  sinon.restore();
});

test('getClusterById', async ({ assert }) => {
  // Mock the fs.readFile function
  const mockData = [{ id: 1, name: 'Cluster 1' }, { id: 2, name: 'Cluster 2' }];
  const mockDataPath = Env.get('DATA_DIR') + '/clusters.json';
  sinon.stub(fs, 'readFile').resolves(JSON.stringify(mockData));

  const service = new ClusterService();
  const cluster = await service.getClusterById(1);

  assert.deepEqual(cluster, mockData[0]);
  sinon.restore();
});

test('createCluster', async ({ assert }) => {
  // Mock the fs.readFile and fs.writeFile functions
  const mockData = [];
  const mockDataPath = Env.get('DATA_DIR') + '/clusters.json';
  sinon.stub(fs, 'readFile').resolves(JSON.stringify(mockData));
  sinon.stub(fs, 'writeFile');

  const service = new ClusterService();
  const clusterData = { name: 'New Cluster' };
  const createdCluster = await service.createCluster(clusterData);

  assert.property(createdCluster, 'id');
  assert.equal(createdCluster.name, clusterData.name);
  sinon.restore();
});

test('updateCluster', async ({ assert }) => {
  // Mock the fs.readFile and fs.writeFile functions
  const mockData = [{ id: 1, name: 'Old Name' }];
  const mockDataPath = Env.get('DATA_DIR') + '/clusters.json';
  sinon.stub(fs, 'readFile').resolves(JSON.stringify(mockData));
  sinon.stub(fs, 'writeFile');

  const service = new ClusterService();
  const updatedData = { name: 'New Name' };
  const updatedCluster = await service.updateCluster(1, updatedData);

  assert.equal(updatedCluster.id, 1);
  assert.equal(updatedCluster.name, updatedData.name);
  sinon.restore();
});

test('deleteCluster', async ({ assert }) => {
  // Mock the fs.readFile and fs.writeFile functions
  const mockData = [{ id: 1, name: 'Cluster 1' }, { id: 2, name: 'Cluster 2' }];
  const mockDataPath = Env.get('DATA_DIR') + '/clusters.json';
  sinon.stub(fs, 'readFile').resolves(JSON.stringify(mockData));
  sinon.stub(fs, 'writeFile');

  const service = new ClusterService();
  await service.deleteCluster(1);

  const remainingClusters = mockData.filter((cluster) => cluster.id !== 1);
  sinon.assert.calledWith(fs.writeFile, mockDataPath, JSON.stringify(remainingClusters, null, 2), 'utf-8');
  sinon.restore();
});
