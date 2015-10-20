var app = angular.module("myApp", ['ngRoute', 'ui.router', 'ngCookies']);

app.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    console.log(document.location.hostname);
    $urlRouterProvider.otherwise("/user");
    $stateProvider
        .state('user', {
          url: '/user',
          templateUrl: 'modules/user/user.html',
          controller: 'userController'
        })
        .state('pictures', {
          url: '/pictures',
          templateUrl: 'modules/picture/picture.html',
          resolve: {
            checkPermission: ['UserService', function (UserService, $q) {
              if (!UserService.userIsLoggedIn()) {
                $state.go('user');
                return $q.reject('not logged in');
              }
            }],
            mediaAll: ['MediaService', function (MediaService) {
              return MediaService.getMedia();
            }]
          },
          controller: 'pictureController',
          controllerAs: 'ctrl'
        })
  }]);

app.directive('focus', function() {
  return {
    restrict: 'A',
    transclude: true,
    link: function(scope, element, attr) {
      element[0].focus();
    }
  };
});

/**
 * Vote Service.
 */
app.service('VoteService', ['$cookieStore', 'UserService', function ($cookieStore, UserService) {

  this.upVote = function (id) {

    var user = UserService.getCurrentUser();
    if (!$cookieStore.get(id)) {
      $cookieStore.put(id, angular.toJson({raiting: 1, users: [user.email]}));
    } else {
      var vote = this.getVote(id);
      vote.raiting++;
      if (this.checkVote(id)) {
        vote.users.push(user.email);
      }
      $cookieStore.put(id, angular.toJson(vote));
    }

  };

  this.downVote = function (id) {

    var user = UserService.getCurrentUser();
    if (!$cookieStore.get(id)) {
      $cookieStore.put(id, angular.toJson({raiting: -1, users: [user.email]}));
    }
    else {
      var vote = this.getVote(id);
      vote.raiting--;
      if (this.checkVote(id)) {
        vote.users.push(user.email);
      }
      $cookieStore.put(id, angular.toJson(vote));
    }

  };


  this.getVote = function (id) {
    var user = UserService.getCurrentUser();
    var cookie = $cookieStore.get(id);
    if (!!cookie) {
      return angular.fromJson(cookie);
    }
    return null;
  };

  this.getRaiting = function (id) {
    var raiting = this.getVote(id);
    if (raiting === null) {
      return 0;
    }
    return raiting.raiting;
  }

  this.checkVote = function (id) {
    var user = UserService.getCurrentUser();
    var vote = this.getVote(id);
    if (vote === null) {
      return true;
    }

    return (vote.users.indexOf(user.email) == -1);

  }


}]);


/**
 * Media Service.
 */
app.service('MediaService', ['$http', function ($http) {

  this.mediaList = [];
  this.selectedItem = {};

  this.getMedia = function () {
    return $http.get('http://slim.local/getmedia').success(function (response) {
      return response;
    });
  };
  this.postMedia = function (media) {
    var json = angular.toJson(media);
    return $http({
      url: "http://slim.local/postmedia",
      data: json,
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}

    }).success(
        function (response) {
          console.log(response);
          return response;
        }
    ).error(function (error) {
        });
  };

  this.receiveMedia = function () {
    this.getMedia().then(function (result) {
      this.mediaList = result.data;
    }.bind(this));
  };


  this.media = function () {
    return this.mediaList;
  };

  this.selected = function () {
    return this.selectedItem;
  };

  this.setMedia = function (mediaList) {
    this.mediaList = mediaList;
  };

  this.deleteMedia = function (id) {
    return $http.delete('http://slim.local/deletemedia/' + id).success(function (response) {
      return response;
    });
  };

}]);

/**
 * User Service.
 */
app.service('UserService', function () {
  this.getCurrentUser = function () {
    if (this.userIsLoggedIn()) {
      return angular.fromJson(localStorage.getItem('user'));
    }
    return false;
  };

  this.userIsLoggedIn = function () {
    var currentUser = angular.fromJson(localStorage.getItem('user'));
    if (!!currentUser) {
      var users = angular.fromJson(localStorage.getItem('users'));
      if (!!users) {
        for (var i = 0; i < users.length; i++) {
          if (users[i].email == currentUser.email) {
            return true;
          }
        }
      }
    }
    return false;
  };

  this.checkUser = function (candidate) {
    var users = localStorage.getItem('users');
    if (!!users) {
      users = angular.fromJson(users);
      for (var i = 0; i < users.length; i++) {
        if (candidate.email == users[i].email && candidate.password == users[i].password) {
          return users[i];
        }
      }
    }
    return false;
  };

  this.loginUser = function (user) {
    localStorage.setItem('user', angular.toJson(user));
  };
  this.logoutUser = function (user) {
    localStorage.setItem('user', '');
  };

  this.registerUser = function (user) {
    var users = localStorage.getItem('users');

    if (!!users) {
      users = angular.fromJson(users);
      var already = false;
      for (var i = 0; i < users.length; i++) {
        if (user.email == users[i].email) {
          already = true;
        }
      }
      if (!already) {
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