function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
  'ngInject';

  if (process.env.NODE_ENV === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider
  .state('Home', {
    url: '/',
    controller: 'HomeCtrl as home',
    templateUrl: 'home.html',
    title: 'Home'
  })
  .state('Project', {
    url: '/project/:id',
    controller: 'ProjectCtrl as home',
    templateUrl: 'project.html',
    title: 'Project'
  })

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
