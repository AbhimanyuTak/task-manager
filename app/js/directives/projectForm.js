function ProjectFormDirective() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/project-form.html',
    scope: {
      allmembers: '=',
      createNewProject: '&'
    },
    controller: ['$scope', function ($scope) {
      $scope.title_error = false
      $scope.desc_error = false
      $scope.mem_error = false
      $scope.newProject = function() {
        console.log($scope.title)
        $scope.title_error = false
        $scope.desc_error = false
        $scope.mem_error = false
        if($scope.title == undefined || $scope.title == '' || $scope.title == null) {
          $scope.title_error = true;
          return;
        }
        if($scope.description == undefined || $scope.description == '' || $scope.description == null) {
          $scope.desc_error = true;
          return;
        }
        if($scope.selectedMembers == undefined || $scope.selectedMembers.length == 0 || $scope.selectedMembers == null) {
          $scope.mem_error = true;
          return;
        }
        $scope.createNewProject({title: $scope.title, description: $scope.description, selectedMembers: $scope.selectedMembers})
        delete $scope.title;
        delete $scope.description;
        $scope.hidePopup();
      }

      $scope.hidePopup = function() {
        $('.popup').popup('hide all');
      }

    }],
    link: (scope, element) => {
      element.on('click', () => {
        // window.alert('Element clicked: ' + scope.message);
      });
    }
  };
}

export default {
  name: 'projectFormDirective',
  fn: ProjectFormDirective
};
