app.controller('userController', ['$scope', 'UserService', '$location', '$state', function ($scope, UserService, $location, $state) {
  this.currentUser = {

  };

  this.registerUserForm = {};
  this.registerUserForm.name = '';
  this.registerUserForm.email = '';
  this.registerUserForm.password = '';
  this.registerUserForm.confirmPassword = '';

  if(UserService.userIsLoggedIn()) {
    $state.go('pictures');
  }

  this.registerUser = function (form) {
    if (form.$submitted && form.$valid) {
      // Compile user object.
      var user = {
        name: this.registerUserForm.name,
        email: this.registerUserForm.email,
        password: this.registerUserForm.password,
        isLoggedIn: false
      }
      // Save to local storage.
      UserService.registerUser(user);
      this.currentUser = user;
    }
  }

  this.loginForm = {};
  this.loginForm.email = '';
  this.loginForm.password = '';

  this.loginUser = function (form) {
    var candidate = {
      email: this.loginForm.email,
      password: this.loginForm.password
    };
    var user = UserService.checkUser(candidate);
    if (user) {
      UserService.loginUser(user);
      $state.go('pictures');
      $location.path('/pictures');
    }

  };

  this.checkUser = function() {
    var localUserJson = localStorage.getItem('user');
    if (!!localUserJson) {
      return true;
    }
    else {
      return false;
    }
  }
}]);