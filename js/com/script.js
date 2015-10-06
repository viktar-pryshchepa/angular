var app = angular.module("myApp", []);

app.controller("myMainController", ['$scope', function($scope) {
  $scope.message = "AAAA";
}]);

app.controller('pictureController', ['$scope','$filter', function ($scope, $filter) {
  $scope.name_filter = '';
  $scope._query = '';
  $scope.sortOrder = false;
  $scope.mediaList = [
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
  $scope.select = function(media){
    var index =  $scope.mediaList.indexOf(media);
    console.log(index);
    $scope.mediaList[index].viewed = '✓';
    $scope.selected = $scope.mediaList[index];
  }

  $scope.inc = function (selected) {
    selected.click++;
    $scope.selected = selected;
  }

  $scope.plusRaiting = function (selected) {
    selected.raiting++;
    $scope.selected = selected;
  }
  $scope.minusRaiting = function (selected) {
    selected.raiting--;
    $scope.selected = selected;
  }
  $scope.applySearch = function () {
    $scope._query = $scope.query;
    console.log($scope.sortOrder);
  }
}]);
