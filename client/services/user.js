myIRC.service('User',function($http,$rootScope){
  var url = "http://localhost:3000/!/";

  return {
    create: function(user){
      return $http.post(url+"user/create",user);
    },
    update: function(user){
      return $http.put(url+"user/update",user);
    },
    read: function(user){
      return $http.get(url+"user/read",user);
    },
    destroy: function(user){
      return $http.post(url+"user/update",user);
    }
  };
})
