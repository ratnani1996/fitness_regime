app.factory("JSONFactory",($http,$q)=>{
  
    var obj = {
        getJSON(JSONurl){
        /*    var URL = "https://raw.githubusercontent.com/karan-khanna/MeanPractice/master/nestedMenuList-better";*/
            
            var defferedObj = $q.defer();
            $http.get(JSONurl).then((data)=>{
                defferedObj.resolve(data);
            },(err)=>{
                defferedObj.reject(err);
            });
            return defferedObj.promise;
        }
    };
    return obj;
});