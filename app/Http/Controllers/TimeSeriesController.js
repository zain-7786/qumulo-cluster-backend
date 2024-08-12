const TimeSeriesService = use('App/Services/TimeSeriesService');

class TimeSeriesController {
  async index({ response }) {
    try {
      const timeSeriesData = await TimeSeriesService.getTimeSeriesData();
      return response.json(timeSeriesData);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Error fetching time series data' });
    }
  }
}

module.exports = TimeSeriesController;
