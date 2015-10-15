var app = angular.module("myApp", []);

app.controller('pictureController', ['$scope', '$http', 'getMediaService', function ($scope, $http, getMediaService) {
  this._query = '';
  this.sortOrder = false;
this.frm = {};
  this.frm.name = '';
  this.frm.imagePath = '';
this.form = {};
  this.form.addForm = {};
  this.form.addForm.name ='';
  this.form.addForm.imagePath ='';
  this.selected = null;

  this.mediaList = [
    {
      click: 0,
      imagePath: "../../img/400_400.jpg",
      name: 'First',
      viewed: false,
      raiting: 0
    },
    {
      click: 0,
      imagePath: "../../img/400_400_1.jpg",
      name: 'Second',
      viewed: false,
      raiting: 0
    },
    {
      click: 0,
      imagePath: "../../img/400_400_2.jpg",
      name: 'Third',
      viewed: false,
      raiting: 0
    },
    {
      click: 0,
      imagePath: "../../img/400_400_3.jpg",
      name: 'Fourth',
      viewed: false,
      raiting: 0
    },
    {
      click: 0,
      imagePath: "../../img/400_400_4.jpg",
      name: 'Fifth',
      viewed: false,
      raiting: 0
    }
  ];

  getMediaService.getMedia().then(function(result) {
    this.mediaList = result.data;
  }.bind(this));

/*
  $http.get('list.json').success(function(response) {

    $scope.ctrl.mediaList = response.records;
  });
*/
  this.select = function (media) {
    var index = this.mediaList.indexOf(media);
    this.mediaList[index].viewed = '✓';
    this.selected = this.mediaList[index];
    this.frm.name = this.selected.name;
    this.frm.imagePath = this.selected.imagePath;
    this.frm.index = index;
  }

  this.inc = function (selected) {
    selected.click++;
    this.selected = selected;
  }

  this.plusRaiting = function (selected) {
    selected.raiting++;
    this.selected = selected;
  }
  this.minusRaiting = function (selected) {
    selected.raiting--;
    this.selected = selected;
  }
  this.applySearch = function () {
    this._query = this.query;
    console.log(this.sortOrder);
  }

  this.editItem = function (form) {
    if (!!this.mediaList[this.frm.index]) {
      this.mediaList[this.frm.index].name = this.frm.name;
      this.mediaList[this.frm.index].imagePath = this.frm.imagePath;
    }
  }

  this.addItem = function (form) {

    var obj =   {
        click: 0,
        imagePath: this.form.addForm.imagePath,
        name: this.form.addForm.name,
        viewed: false,
        raiting: 0
      };
    this.mediaList.push(obj);
    //list.json
    var json = angular.toJson( this.mediaList);
      $http.post('http://angular.local', json).then(function(qwe){
          console.log('success');
          console.log(qwe);
      }, function(qwe){
          console.log('fail');
          console.log(qwe);
      });
  }
  this.resetItem = function (form) {
    this.form.addForm.imagePath = '';
    this.form.addForm.name = ''
  }

}]);

app.controller('userController', ['$scope', function ($scope) {
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
      localStorage.setItem('user', JSON.stringify(user));
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

app.service('getMediaService', ['$http', function($http) {

var list = [];
  this.getMedia = function() {

    return  $http.get('http://angular.local/').success(function(response) {

      return response;
    });
  };
}]);