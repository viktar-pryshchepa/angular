var app = angular.module("myApp", []);

app.controller("myMainController", ['$scope', function($scope) {
  $scope.message = "AAAA";
}]);

app.controller('pictureController', ['$scope', function ($scope) {
  var imageSource;
  $scope.counter = [];
  imageSource = "../../img/400_400.jpg";
  $scope.mediaList = [
    {
      imagePath: imageSource,
      name: 'First'
    },
    {
      imagePath: imageSource,
      name: 'Second'
    },
    {
      imagePath: imageSource,
      name: 'Third'
    },
    {
      imagePath: imageSource,
      name: 'Fourth'
    },
    {
      imagePath: imageSource,
      name: 'Fifth'
    },
  ];
  $scope.increment = function(ind){
    $scope.counter[ind]++;
  }

}]);