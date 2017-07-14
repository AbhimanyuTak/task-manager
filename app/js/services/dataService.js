function DataService($http) {
  'ngInject';

  let data = {}
  data['projects'] = [
    {
      id: 1,
      title: "Some project title",
      description: "Some project description that can be very long and it may tend to break the UI. Make sure to restrict the text. jdsnjk sdj j jsd j sdjsdknkdfnkdsfkklm dsn",
      members: [1, 2, 3, 4, 5, 6, 7, 8],
      tasks: [1, 3, 5]   
    },
    {
      id: 2,
      title: "Some project title",
      description: "Some project description that can be very long and it may tend to break the UI. Make sure to restrict the text.",
      members: [2, 3, 4, 5],
      tasks: [4, 5]   
    },
    {
      id: 3,
      title: "Some project title",
      description: "Some project description that can be very long and it may tend to break the UI. Make sure to restrict the text.",
      members: [1, 2, 3, 4, 5],
      tasks: [6]     
    },
    {
      id: 4,
      title: "Some project title",
      description: "Some project description that can be very long and it may tend to break the UI. Make sure to restrict the text.",
      members: [3, 4, 6, 7],
      tasks: [7]   
    },
    {
      id: 5,
      title: "Some project title",
      description: "Some project descriptiake sure to restrict the text.",
      members: [1, 2, 3, 4],
      tasks: [8, 9, 10]   
    },
    {
      id: 6,
      title: "Some project title",
      description: "Some project description that can be very long and it may tend to break the UI. Make sure to restrict the text.",
      members: [1, 2, 3, 4],
      tasks: [11]    
    },
    {
      id: 7,
      title: "Some project title",
      description: "Some project description that can be very long and it may tend to break the UI. Make sure to restrict the text.",
      members: [1, 2, 3, 4] 
    },
    {
      id: 8,
      title: "Some project title",
      description: "Some project description that can be very long and it may tend to break the UI. Make sure to restrict the text.",
      members: [1, 2, 3, 4] 
    },
    {
      id: 9,
      title: "Some project title",
      description: "Some project description  to restrict the text.",
      members: [1, 2, 3, 4] 
    }
  ]

  data['tasks'] = [
    {
      title: "Some Random task",
      id: 1,
      assignedTo: 1,
      description: "Here is the desc",
      status: "3"
    },
    {
      title: "Some Random task",
      id: 2,
      assignedTo: 1,
      description: "Here is the desc",
      status: "3"
    },
    {
      title: "Some Random task",
      id: 3,
      assignedTo: 2,
      description: "Here is the desc",
      status: "3"
    },
    {
      title: "Some Random task",
      id: 4,
      assignedTo: 2,
      description: "Here is the desc",
      status: "3"
    },
    {
      title: "Some Random task",
      id: 5,
      assignedTo: 2,
      description: "Here is the desc",
      status: "3"
    },
    {
      title: "Some Random task",
      id: 6,
      assignedTo: 3,
      description: "Here is the desc",
      status: "3"
    },
    {
      title: "Some Random task",
      id: 7,
      assignedTo: 4,
      description: "Here is the desc",
      status: "3"
    },
    {
      title: "Some Random task",
      id: 8,
      assignedTo: 4,
      description: "Here is the desc",
      status: "3"
    },
    {
      title: "Some Random task",
      id: 9,
      assignedTo: 5,
      description: "Here is the desc",
      status: "3"
    },
    {
      title: "Some Random task",
      id: 10,
      assignedTo: 6,
      description: "Here is the desc",
      status: "3"
    },
    {
      title: "Some Random task",
      id: 11,
      assignedTo: 7,
      description: "Here ``is`` the desc",
      status: "3"
    }
  ]

  data['users'] = [
    {
      name: "Abhimanyu",
      id: 1
    },
    {
      name: "Ram",
      id: 2
    },
    {
      name: "Shyam",
      id: 3
    },
    {
      name: "Suresh",
      id: 4
    },
    {
      name: "Dimesh",
      id: 5
    },
    {
      name: "Mukesh",
      id: 6
    },
    {
      name: "Prabhu",
      id: 7
    },
    {
      name: "Rakesh",
      id: 8
    },
    {
      name: "Dino",
      id: 9
    },
    {
      name: "Mikeu",
      id: 10
    }
  ]

  function localStorageUpsert() {

  }

  function localStorageFetch() {

  }

  this.getData = function (){
    return data
  };

  this.getProjectDetails = function(pid) {
    return data.projects.filter(function(project) {
      return project.id == pid
    })[0]
  }

  this.getUserById = function(id) {

  }

  this.getProjectTasks = function(pid) {
    let projectTaskIdArray = this.getProjectDetails(pid).tasks || []
    return data.tasks.filter(function(task) {
      return projectTaskIdArray.indexOf(task.id) >= 0;
    })
  }

  this.addUserToProject = function(pid, uid) {

  };

  this.addNewProject = function(name, description) {

  };

  this.switchTasks = function (from, to, id){
    for(let t in data.tasks) {
      if(data['tasks'][t].id == id) {
        data['tasks'][t].assignedTo = to;
        console.log(data['tasks'][t])
        break;
      }
    }
  }

  this.updateTaskStatus = function (id, status){
    for(let t in data.tasks) {
      if(data['tasks'][t].id == id) {
        data['tasks'][t].status = status;
        console.log(data['tasks'][t])
        break;
      }
    }
  }
}

export default {
  name: 'DataService',
  fn: DataService
};
