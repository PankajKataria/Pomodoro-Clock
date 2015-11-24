var app=angular.module('mainapp',[]);
app.controller('mainCtrl',function($scope,$interval){
  $scope.breakLength=5;
  $scope.intervalLength=25;
  $scope.timeLeft=$scope.intervalLength;
  var runTimer=false;

  $scope.toggle=function(d,type){
    if(!isNaN(d)){
      if(d == 1 | d == -1 ){
        if( type === 'break'){
            if($scope.breakLength > 0 | d == 1){
              $scope.breakLength+=d;
            }
        }
        else if(type == 'interval'){
          if(($scope.intervalLength > 0 | d == 1)&& !runTimer){
            $scope.intervalLength+=d;
            $scope.timeLeft=$scope.intervalLength;
          }
        }
      }
    }
  }

  $scope.toggleTimer=function(){
    if(runTimer){
      $interval.cancel(runTimer);
      runTimer=false;
    }
    else {
      runTimer=$interval(updateTimer,1000);
      alert(runTimer);
    }
  }

  function updateTimer(){
    $scope.timeLeft-=1;
  }


});
