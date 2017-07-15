let ProjectCtrl = ['$scope', '$rootScope', 'DataService', '$stateParams', '$timeout', function($scope, $rootScope, DataService, $stateParams, $timeout) {

  // ViewModel
  let data = DataService.getData();
  let projectId = $stateParams.id;
  $scope.users = data['users'];
  $scope.pid = projectId;
  $rootScope.globalHeading = "";

  $scope.taskStatus = {
  	'1': {status: 'Done', color: '#06cca1'},
  	'2': {status: 'On Hold', color: '#D3D63E'},
  	'3': {status: 'In Process', color: 'blue'},
  	'4': {status: 'Sent', color: 'orange'},
  	'5': {status: 'Schedule', color: '#D36F3D'},
  }

  // Wrapping all init logic for re-rendering
  let initTaskPage = function() {
  	$scope.projectDetails = DataService.getProjectDetails(projectId)
    $rootScope.globalHeading = $scope.projectDetails.title
  	$scope.allTasks = DataService.getProjectTasks(projectId)



  	$scope.userTasksObj = DataService.getData().users.filter(function(user) {
  		return $scope.projectDetails.members.indexOf(user.id) >= 0;
  	})

  	for(let i in $scope.userTasksObj) {
  		$scope.userTasksObj[i]['tasks'] = $scope.allTasks.filter(function(task) {
  			return $scope.userTasksObj[i].id == task.assignedTo;
  		})
  	}
  }

  initTaskPage()

  // Drag n Drop Utils
  $scope.allowDrop = function(event) {
    event.preventDefault();
  }

  $scope.dragTask = function(event, fromUser, taskID) {
  	let data = {
  		'fromUser' : fromUser,
  		'taskID' : taskID
  	}
  	event.dataTransfer.setData("text", JSON.stringify(data));
  }

  $scope.dropTask = function(event, toUser) {
  	event.preventDefault();
  	let data = JSON.parse(event.dataTransfer.getData("text"));
  	switchTask(data.fromUser, toUser, data.taskID)
    initPopupsDropdowns()
  }

  // Wrapper for drag and drop task switcher calling service function
  function switchTask(fromUser, toUser, taskID) {
    DataService.switchTasks(fromUser, toUser, taskID)
    initTaskPage()
    $scope.$digest()
  }

  // Functions calling addTask helper from DataService and re rendering the updated data
  $scope.createNewTask = function(pid, uid, title, description, selectedStatus) {
    DataService.addTask(pid, uid, title, description, selectedStatus)
    initTaskPage()
    // Re-init dropdown for new element
    initPopupsDropdowns()
  }

  $scope.updateTaskStatus = function(taskID, status) {
  	DataService.updateTaskStatus(taskID, status)
  	initTaskPage()
    // Delayed digest cycle manual trigger: facing re rendering issues otherwise
    $timeout(function() {
  		$scope.$digest()
  	})
  }

  $scope.newProjectUser = function(name) {
    DataService.addNewUserToProject(projectId, name)
    initTaskPage()
    initPopupsDropdowns()
    $('.popup').popup('hide all');
  }

  $scope.addProjectUser = function(uid) {
    DataService.addCurrentUserToProject(projectId, uid);
    initTaskPage()
    initPopupsDropdowns()
    $('.popup').popup('hide all');
  }

  // Putting init calls in event queue
  let initPopupsDropdowns = function() {
      $timeout(function() {
        $('.ui.dropdown').dropdown();

        $('.new-task-form-button, .add-new-user')
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

  initPopupsDropdowns()

}]

export default {
	name: 'ProjectCtrl',
	fn: ProjectCtrl
};
