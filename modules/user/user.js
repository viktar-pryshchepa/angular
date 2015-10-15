app.controller('userController', ['$scope', 'UserService', function ($scope, UserService) {
  this.currentUser = {

  };

  this.registerUserForm = {};
  this.registerUserForm.name = '';
  this.registerUserForm.email = '';
  this.registerUserForm.password = '';
  this.registerUserForm.confirmPassword = '';


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
  this.loginForm.name = '';
  this.loginForm.password = '';

  this.loginUser = function(form) {
    /*
     var localUserJson = localStorage.getItem('user');
     if (!!localUserJson) {
     var localUser = JSON.parse(localUserJson);
     if (this.loginForm.name ==localUser.name && this.loginForm.password == localUser.password) {

     console.log('in');
     }
     else {
     console.log('not match');
     }
     }
     else {
     console.log('no user');
     }*/
  }

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