let HomeCtrl = ['$scope', '$rootScope', 'DataService', '$timeout', function($scope, $rootScope, DataService, $timeout) {

  // ViewModel
  $rootScope.globalHeading = "Task Management"
  let data = DataService.getData();
  $scope.projects = data.projects
  $scope.users = data.users

  $scope.createNewProject = function(title, description, members) {
  	console.log("Adding new project, calling back from directive:::");
  	DataService.addNewProject(title, description, members)
  }

  $timeout(function(){
  	$('.ui.dropdown').dropdown();

  	$('.new-product-form-button')
    .popup({
      inline     : true,
      hoverable  : true,
      on         : 'click',
      position   : 'bottom left',
      delay: {
        show: 300,
        hide: 800
      }
    });
  })

}
]

export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};
