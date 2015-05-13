angular.module('interim.yourCommunityList', ["firebase"])

.controller('YourCommunityListController', function ($scope, $firebaseObject, $rootScope, $state) {
  // Initially identifying user and displaying their current groups & communities

  var ref = new Firebase("https://interim.firebaseio.com/CommunityDB/");
  var commObj = $firebaseObject(ref);
  $scope.userInfo = $rootScope.userInfo;

  // For each of these calls, userId needs to be in the form
  // userName-authSource   // Yoda-github
  $scope.usersCommunities = function(){

    var userId = '' + $scope.userInfo.name + "-" + $scope.userInfo.auth.provider;

    $scope.communities = $firebaseArray(ref.child('UsersDB').child(userId).child('usersCommunities'));
    console.log("Retrieved ", $scope.userInfo.name, "'s communities: ", communities);

  };

  $scope.usersGroups = function(){
    //Check all Group children for all communities
    $scope.groups = $firebaseArray(ref.child('UsersDB').child(userId).child('usersGroups'));

  };

  $scope.sendSearch = function(community) {
    searchName = community.toLowerCase();

    commObj.$loaded().then(function() {
      var keepGoing = true;
      $scope.communitiesObj = commObj;
      angular.forEach($scope.communitiesObj, function(value, key) {
        if(keepGoing) {
          if(value.name === searchName) {
            //TODO - APPEND THE REQUESTED COMMUNITY TO THE PAGE
            //THIS IS THE OBJECT OF THE REQUESTED COMMUNITY
            $scope.requestedCommunity = value;
            // $rootScope.communityInfo = value;
            $state.go("community-profile", {communityName: value.name});
            keepGoing = false;
          }
        }
      });
    });
  };
});
