var app = angular.module("myApp", []);

app.controller('pictureController', ['$scope', function ($scope) {
  this.name_filter = '';
    this._query = '';
    this.sortOrder = false;
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
    },
  ];
  this.select = function(media){
    var index =  this.mediaList.indexOf(media);
    console.log(index);
    this.mediaList[index].viewed = '✓';
    this.selected = this.mediaList[index];
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
}]);
