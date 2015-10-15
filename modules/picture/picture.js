app.controller('pictureController', ['$scope', '$http', '$location', 'MediaService', 'UserService', function ($scope, $http, $location, MediaService, UserService) {

  if(!UserService.userIsLoggedIn()) {
    $location.path('/user');
  }

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

  MediaService.getMedia().then(function(result) {
    this.mediaList = result.data;
  }.bind(this));

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
      MediaService.postMedia(this.mediaList);
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
    MediaService.postMedia(this.mediaList);
  }
  this.resetItem = function (form) {
    this.form.addForm.imagePath = '';
    this.form.addForm.name = ''
  }

}]);