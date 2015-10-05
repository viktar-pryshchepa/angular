var app = angular.module("myApp", []);

app.controller("myMainController", ['$scope', function($scope) {
  $scope.message = "AAAA";
}]);

app.controller('pictureController', ['$scope', function ($scope) {
  var imageSource;
  $scope.counter = [];
  $scope.mediaList = [
    {
      click: 0,
      imagePath: "../../img/400_400.jpg",
      name: 'First'
    },
    {
      click: 0,
      imagePath: "../../img/400_400_1.jpg",
      name: 'Second'
    },
    {
      click: 0,
      imagePath: "../../img/400_400_2.jpg",
      name: 'Third'
    },
    {
      click: 0,
      imagePath: "../../img/400_400_3.jpg",
      name: 'Fourth'
    },
    {
      click: 0,
      imagePath: "../../img/400_400_4.jpg",
      name: 'Fifth'
    },
  ];
  $scope.select = function(ind){
    $scope.selected = $scope.mediaList[ind];
  }

  $scope.inc = function (selected) {
    selected.click++;
    $scope.selected = selected;
  }

}]);