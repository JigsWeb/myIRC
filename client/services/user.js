myIRC.service('User',function($http,$rootScope){
  var url = "http://localhost:3000/!/user";

  return {
    create: function(user){
      return $http.post(url+"/create",user);
    },
    update: function(user){
      return $http.put(url+"/update",user);
    },
    all: function(){
      return $http.get(url);
    },
    destroy: function(id){
      return $http.delete(url+"/"+id+"/destroy");
    },
    updateAdmin: function(id,user){
      return $http.put(url+"/"+id+"/update",user);
    }
  };
})
