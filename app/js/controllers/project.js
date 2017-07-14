let ProjectCtrl = ['$scope', 'DataService', '$stateParams', '$timeout', function($scope, DataService, $stateParams, $timeout) {

  // ViewModel
  let data = DataService.getData();

  let projectId = $stateParams.id;

  $scope.taskStatus = {
  	'1': {status: 'Done', color: '#06cca1'},
  	'2': {status: 'On Hold', color: 'yellow'},
  	'3': {status: 'In Process', color: 'blue'},
  	'4': {status: 'Sent', color: 'orange'},
  	'5': {status: 'Schedule', color: 'lime'},
  }

  let initTaskPage = function() {
  	$scope.projectDetails = DataService.getProjectDetails(projectId)
	$scope.allTasks = DataService.getProjectTasks(projectId)

	$scope.userTasksObj = DataService.getData().users.filter(function(user) {
		return $scope.projectDetails.members.indexOf(user.id) >= 0;
	})

	for(let i in $scope.userTasksObj) {
		$scope.userTasksObj[i]['tasks'] = $scope.allTasks.filter(function(task) {
			return $scope.userTasksObj[i].id == task.assignedTo;
		})
	}
	console.log($scope.projectDetails)
	console.log($scope.allTasks)
	console.log($scope.userTasksObj)
  }

  initTaskPage()

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
  }

  // Wrapper for drag and drop task switcher calling service function
  function switchTask(fromUser, toUser, taskID) {
	console.log(fromUser, toUser, taskID)
	DataService.switchTasks(fromUser, toUser, taskID)
	initTaskPage()
	$scope.$digest()
  }

  $scope.updateTaskStatus = function(taskID, status) {
  	console.log(taskID, status)
  	DataService.updateTaskStatus(taskID, status)
  	initTaskPage()
	// $scope.$digest()
	$timeout(function() {
  		$scope.$digest()
  	})
  }

  // Putting init calls in event queue
  $timeout(function() {
  	$('.ui.dropdown').dropdown();
  })

}]

export default {
	name: 'ProjectCtrl',
	fn: ProjectCtrl
};
