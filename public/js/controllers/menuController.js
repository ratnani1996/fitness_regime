app.controller("menuController",($scope,JSONFactory,menuURL)=>{
   var promise = JSONFactory.getJSON(menuURL); 
    promise.then((data)=>{
        var menuData = data;
        $scope.menu = menuData.data.subMenuList;
    },(err)=>{console.log("THERE IS SOME ERROR IN THE DATA RECEIVED!!")});
});
