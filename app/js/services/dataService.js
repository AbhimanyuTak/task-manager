function DataService($http) {
  'ngInject';

  let data = {}
  data['projects'] = []
  data['tasks'] = []

  data['users'] = [
    {
      name: "Abhimanyu",
      id: 1
    },
    {
      name: "Shivani",
      id: 2
    },
    {
      name: "Ram",
      id: 3
    },
    {
      name: "Gaurav",
      id: 4
    },
    {
      name: "Rishabh",
      id: 5
    },
    {
      name: "Pallavi",
      id: 6
    },
    {
      name: "Shyam",
      id: 7
    },
    {
      name: "Manish",
      id: 8
    },
    {
      name: "Sandeep",
      id: 9
    },
    {
      name: "Deepak",
      id: 10
    }
  ]

  function localStorageUpsert() {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("app-data", JSON.stringify(data));
    } else {
        console.log("Local Storage not functional, website will not persist data");
    }

  }

  function localStorageFetch() {
    if (typeof(Storage) !== "undefined") {
        let lsData = localStorage.getItem("app-data");
        if(lsData != undefined && lsData != null && lsData != "") {
          data = JSON.parse(lsData)
        }
    } else {
        console.log("Local Storage not functional");
    }
  }

  localStorageFetch()

  this.getData = function (){
    return data;
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

  this.addUser = function(name) {
    let uid = getRndInteger()
    data['users'].push({
      name: name,
      id: uid
    })
    localStorageUpsert()
    return uid;
  }

  this.addNewUserToProject = function(pid, name) {
    let uid = this.addUser(name)

    for(let i in data['projects']) {
      if(data['projects'][i].id == pid) {
        data['projects'][i].members.push(uid);
        break;
      }
    }
    localStorageUpsert()
  };

  this.addCurrentUserToProject = function(pid, uid) {
    uid = parseInt(uid)

    for(let i in data['projects']) {
      if(data['projects'][i].id == pid && data['projects'][i].members.indexOf(uid) < 0) {
        data['projects'][i].members.push(uid);
        break;
      }
    }
    localStorageUpsert()
  };

  this.addNewProject = function(title, description, members) {
    members = members.map(function(mem) {
      return parseInt(mem)
    })
    data['projects'].push({
        title: title,
        description: description,
        members: members,
        id:getRndInteger()
    })
    localStorageUpsert()
  };

  this.switchTasks = function (from, to, id){
    for(let t in data.tasks) {
      if(data['tasks'][t].id == id) {
        data['tasks'][t].assignedTo = to;
        break;
      }
    }
    localStorageUpsert()
  }

  this.addTask = function(pid, uid, title, description, status) {
    let tid = getRndInteger();
    data['tasks'].push({
      title: title,
      description: description,
      status: status,
      id:tid,
      assignedTo: uid
    })

    // Update project object
    for(let i in data['projects']) {
      if(data['projects'][i].id == pid) {
        if(!data['projects'][i].hasOwnProperty('tasks')) {
          data['projects'][i]['tasks'] = []
        }
        data['projects'][i]['tasks'].push(tid);
        break;
      }
    }
    localStorageUpsert()
  }

  this.updateTaskStatus = function (id, status){
    for(let t in data.tasks) {
      if(data['tasks'][t].id == id) {
        data['tasks'][t].status = status;
        break;
      }
    }
    localStorageUpsert()
  }

  // Utils
  // Generating random number between 100000 & 10000000
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (9900000 + 1) ) + 100000;
  }
}

export default {
  name: 'DataService',
  fn: DataService
};
