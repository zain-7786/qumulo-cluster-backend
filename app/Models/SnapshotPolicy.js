const fs = require('fs').promises;
const Env = use('Env');

class TimeSeriesService {
  async getTimeSeriesData() {
    const dataDir = Env.get('DATA_DIR');
    const dataPath = `${dataDir}/time_series.json`;
    try {
      const data = await fs.readFile(dataPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error reading time series data');
    }
  }
}

module.exports = TimeSeriesService;
