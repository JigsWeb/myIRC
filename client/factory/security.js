myIRC.factory('Security',function($rootScope){
  return {
    setUser: function(data){
      console.log(data);
      $rootScope.token = data.token;
      $rootScope.admin = data.admin;
      $rootScope.username = data.username;
      $rootScope._id = data._id;
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
    getUser: function(){
      return {
        token: $rootScope.token,
        admin: $rootScope.admin,
        username: $rootScope.username,
        _id: $rootScope._id
      }
    }
  }
})
