myIRC.factory('Security',function($rootScope){
  return {
    setUser: function(data){
      $rootScope.token = data.token;
      $rootScope.admin = data.admin;
      $rootScope.username = data.username;
      $rootScope._id = data._id;
    },
    setUsername: function(username){
      $rootScope.username = username;
    },
    removeSession: function(){
      delete $rootScope.token;
      delete $rootScope.admin;
    },
    getToken: function(){
      return $rootScope.token;
    },
    isAdmin: function(){
      return $rootScope.admin;
    },
    getUsername: function(){
      return $rootScope.username;
    },
    getId: function(){
      return $rootScope._id;
    },
    getUser: function(){
      return {
        token: $rootScope.token,
        admin: $rootScope.admin,
        username: $rootScope.username,
        _id: $rootScope._id
      }
    },
    isOnline: function(){
      if($rootScope.token) return true;
      return false;
    }
  }
})
