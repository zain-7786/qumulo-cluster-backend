'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const ClusterController = use('App/Http/Controllers/ClusterController');
const TimeSeriesController = use('App/Http/Controllers/TimeSeriesController');
const SnapshotPolicyController = use('App/Http/Controllers/SnapshotPolicyController');

Route.group(() => {
  Route.resource('clusters', ClusterController);
  Route.get('time-series', 'TimeSeriesController.index');
  Route.resource('snapshot-policies', SnapshotPolicyController);
}).prefix('api');


Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
