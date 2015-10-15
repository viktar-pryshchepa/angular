var app = angular.module("myApp", ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
    console.log(document.location.hostname);
    $routeProvider.
      when('/user', {
        templateUrl: 'modules/user/user.html',
        controller: 'userController'
      }).
      when('/pictures', {
        templateUrl: 'modules/picture/picture.html',
        controller: 'pictureController'
      }).
      otherwise({
        redirectTo: '/user'
      });
  }]);

app.service('MediaService', ['$http', function ($http) {
  this.getMedia = function () {
    return $http.get('http://angular.local/').success(function (response) {
      return response;
    });
  };
  this.postMedia = function (media) {
    var json = angular.toJson(media);
    $http.post('http://angular.local', json).then(
      function (qwe) {
      },
      function (qwe) {
      }
    );
  };
}]);

app.service('UserService', function () {
  this.getCurrentUser = function () {

  };
  this.registerUser = function (user) {
    var users = localStorage.getItem('users');

    if (!!users) {
      users = angular.fromJson(users);
      var already = false;
      for (var i=0; i<users.length; i++) {
        if (user.email == users[i].email) {
         already = true;
        }
      }
      if(!already) {
        users.push(user);
      }
    }
    else {
      users = new Array();
      users.push(user);
    }
    localStorage.setItem('users', angular.toJson(users));
  };
});