
app.controller("featureController",($scope,JSONFactory,featuresURL)=>{
   var promise = JSONFactory.getJSON(featuresURL); 
    promise.then((data)=>{
        var feature = data; 
        $scope.featureData = feature.data.features;
    },(err)=>{console.log("THERE IS SOME ERROR IN THE DATA RECEIVED!!")});
});
