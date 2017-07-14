let HomeCtrl = ['$scope', 'DataService', function($scope, DataService) {

  // ViewModel
  let data = DataService.getData();

  $scope.users = data.users
  $scope.tasks = data.tasks
  $scope.projects = data.projects

}
]

export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};
