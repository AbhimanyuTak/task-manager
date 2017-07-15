function TaskFormDirective() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/task-form.html',
    scope: {
      pid: '=',
      uid: '=',
      allstatus: '=',
      createNewTask: '&'
    },
    controller: ['$scope', function ($scope) {
      $scope.title_error = false
      $scope.desc_error = false
      $scope.mem_error = false
      $scope.newTask = function() {
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
        if($scope.selectedStatus == undefined || $scope.selectedStatus == '' || $scope.selectedStatus == null) {
          $scope.mem_error = true;
          return;
        }
        $scope.createNewTask({pid: $scope.pid, uid: $scope.uid, title: $scope.title, description: $scope.description, selectedStatus: $scope.selectedStatus})
        $scope.hidePopup()
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
  name: 'taskFormDirective',
  fn: TaskFormDirective
};
