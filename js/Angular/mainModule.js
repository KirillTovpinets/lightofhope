(function() {
  var app;

  app = angular.module('LightOfHope', [], function($httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = [
      function(data) {
        var param;
        param = function(obj) {
          var fullSubName, i, innerObj, j, k, l, len, name, query, ref, ref1, subName, subValue, value;
          query = '';
          innerObj = [];
          for (name in obj) {
            value = obj[name];
            if (value instanceof Array) {
              for (i = j = 0, ref = value.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
              }
            } else if (value instanceof Object) {
              for (k = 0, len = value.length; k < len; k++) {
                subName = value[k];
                for (i = l = 0, ref1 = value.length; 0 <= ref1 ? l <= ref1 : l >= ref1; i = 0 <= ref1 ? ++l : --l) {
                  subValue = value[subName];
                  fullSubName = name + '[' + subName + ']';
                  innerObj[fullSubName] = subValue;
                  query += param(innerObj) + '&';
                }
              }
            } else if (value !== void 0 && value !== null) {
              query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
          }
          if (query.length) {
            return query.substr(0, query.length - 1);
          } else {
            return query;
          }
        };
        if (angular.isObject(data) && String(data) !== '[object File]') {
          return param(data);
        } else {
          return data;
        }
      }
    ];
  });

  app.controller("PhotosCtrl", function(getPhotos, $scope) {
    $("#photos").preloader("start");
    $scope.photos = [];
    return getPhotos.get().then(function(data) {
      var photos, shuffle;
      shuffle = function(a, b) {
        return Math.random() - 0.5;
      };
      photos = data.data.response;
      photos.sort(shuffle);
      photos.splice(80, 1920);
      $scope.photos = photos;
      return $("#photos").preloader("stop");
    });
  });

  app.controller("VideosCtrl", function(getVimeo, $scope) {
    $scope.videos = [];
    $("#preaches").preloader("start");
    getVimeo.get("videos").then(function(data) {
      var j, len, ref, results, shuffle, str, video, videos;
      shuffle = function(a, b) {
        return Math.random() - 0.5;
      };
      $scope.allVideos = data.data.data;
      $scope.preaches = [];
      var videosToShow = [];
      for(var i = 0; i < $scope.allVideos.length; i++){
          if(($scope.allVideos[i].name.indexOf("Lingo") == -1) && 
            ($scope.allVideos[i].name.indexOf("LINGO") == -1) &&
            ($scope.allVideos[i].name.indexOf("Венчание") == -1)){
              videosToShow.push($scope.allVideos[i]);
          }
      }
      $scope.preaches = videosToShow;
      videosToShow.sort(shuffle);
      videosToShow.splice(80, 1920);
      $scope.videos = videosToShow;
      $("#preaches").preloader("stop");

      return;
    });

    getVimeo.get("channels").then(function(data){
      $scope.channels = data.data.data;
    })
    $scope.SearchByName = function($event) {
      var inputText, j, len, ref, results, thisInput, video, videoName;
      $scope.searchVideos = [];
      thisInput = $event.currentTarget;
      inputText = $(thisInput).val();
      if (inputText.length === 0) {
        $("#preaches #contain").css("display", "block");
        $("#preaches #search-video").css("display", "none");
        $("#preaches #channels").css("display", "none");
        return;
      }
      ref = $scope.preaches;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        video = ref[j];
        inputText = inputText.toLowerCase();
        videoName = video.name.toLowerCase();
        if (videoName.indexOf(inputText) !== -1) {
          $scope.searchVideos.push(video);
          $("#preaches #search-video").css("display", "block");
          $("#preaches #contain").css("display", "none");
          $("#preaches #channels").css("display", "none");
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    $scope.DateSort = function() {
      $("#channels").hide();
      $("#preaches").preloader("start");
      $("#preaches article").css("display", "none");
        $scope.preaches.sort(function(a, b) {
          var firstDate, firstDay, firstMonth, firstYear, secondDate, secondDay, secondMonth, secondYear;
          firstDate = new Date(a.created_time);
          secondDate = new Date(b.created_time);
          firstYear = firstDate.getFullYear();
          firstMonth = firstDate.getMonth();
          firstDay = firstDate.getDate();
          secondYear = secondDate.getFullYear();
          secondMonth = secondDate.getMonth();
          secondDay = secondDate.getDate();
          if (firstYear > secondYear) {
            return -1;
          } else if (firstYear < secondYear) {
            return 1;
          } else if (firstMonth > secondMonth) {
            return -1;
          } else if (firstMonth < secondMonth) {
            return 1;
          } else if (firstDay > secondDay) {
            return -1;
          } else if (firstDay < secondDay) {
            return 1;
          } else {
            return 0;
          }
        });
        $scope.videos = $scope.preaches;
        $scope.videos.splice(80,1920);
        $("#preaches").preloader("stop");
        $(".main").css("display", "block");
        return $("#preaches article").css("display", "block");
      return;
    };
    $scope.ShowSeries = function(){
      $(".main").hide();
      $("#channels").css("display", "block");
    }
    return;
  });

  app.factory("getPhotos", function($http) {
    return {
      get: function() {
        return $http.post("php/getPhotos.php");
      }
    };
  });

  app.factory("getVimeo", function($http) {
    return {
      get: function($source) {
        data = Object();
        data.catch = $source;
        return $http.post("php/getVideos.php/", data);
      }
    };
  });

}).call(this);
