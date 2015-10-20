app.controller('pictureController', ['$scope', '$http', '$location', 'MediaService', 'UserService', 'VoteService', '$state', 'mediaAll',
  function ($scope, $http, $location, MediaService, UserService, VoteService, $state, mediaAll) {
    /*
     if(!UserService.userIsLoggedIn()) {
     $location.path('/user');
     }*/

    this.mediaList = mediaAll.data;

    this._query = '';
    this.sortOrder = false;
    this.form = {};
    this.form.addForm = {};
    this.form.addForm.name = '';
    this.form.addForm.imagePath = '';
    this.selected = null;

    this.user = UserService.getCurrentUser();
    this.select = function (media) {
      var index = this.mediaList.indexOf(media);
      this.mediaList[index].viewed = '✓';
      this.selected = this.mediaList[index];
      this.selected.raiting = VoteService.getRaiting(this.selected.id);
      this.selected.allowed = VoteService.checkVote(this.selected.id);
    };

    this.inc = function (selected) {
      selected.click++;
      this.selected = selected;
    };

    this.plusRaiting = function (selected) {
      VoteService.upVote(selected.id);
      selected.raiting++;
      this.selected = selected;
      this.selected.allowed = VoteService.checkVote(this.selected.id);
      console.log(this.selected);
    };
    this.minusRaiting = function (selected) {
      VoteService.downVote(selected.id);
      selected.raiting--;
      this.selected = selected;
      this.selected.allowed = VoteService.checkVote(this.selected.id);
    };
    this.applySearch = function () {
      this._query = this.query;
      console.log(this.sortOrder);
    };


    this.addItem = function (form) {

      var obj = {
        click: 0,
        imagePath: this.form.addForm.imagePath,
        name: this.form.addForm.name,
        viewed: false,
        raiting: 0
      };

      var user = UserService.getCurrentUser();
      obj.owner = user.email;

      if (this.mediaList == '') {
        this.mediaList = new Array();
      }
      this.mediaList.push(obj);
      MediaService.postMedia(this.mediaList).then(function (result) {
        this.mediaList = result.data;
      }.bind(this));
      ;


    };
    this.resetItem = function (form) {
      this.form.addForm.imagePath = '';
      this.form.addForm.name = ''
    };


    this.delete = function (id) {
      MediaService.deleteMedia(id).then(function () {
        MediaService.getMedia().then(function (response) {
          this.mediaList = response.data;
        }.bind(this))
      }.bind(this));
    }
  }]);