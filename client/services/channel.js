myIRC.service('Channel',function($http, $q){
  var url = "http://localhost:3000/!/channel";
  return {
    all: function(){
      return $http.get(url);
    },
    create: function(channel){
      return $http.post(url+'/create',channel);
    },
    update: function(id,channel){
      return $http.put(url+'/'+id+'/update',channel);
    },
    destroy: function(id){
      return $http.delete(url+'/'+id+'/delete')
    }
  }
});
