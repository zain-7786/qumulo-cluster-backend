const Lucid = use('Lucid');

class Cluster extends Lucid {
  static schema() {
    return {
      id: Lucid.schema.uuid('id', { primary: true }),
      name: Lucid.schema.string('name', { notNull: true }),
    };
  }

  static boot() {
    super.boot();

    this.addHook('beforeSave', async (clusterInstance) => {
    });
  }
}

module.exports = Cluster;
