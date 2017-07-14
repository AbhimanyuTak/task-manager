function UserTaskCardDirective() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/project-card.html',
    scope: {
      title: '@',
      description: '@description',
      members: '@members',
      pid: '@pid'
    },
    link: (scope, element) => {
      element.on('click', () => {
        // window.alert('Element clicked: ' + scope.message);
      });
    }
  };
}

export default {
  name: 'projectCardDirective',
  fn: ProjectCardDirective
};
