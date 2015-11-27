var app=angular.module('mainapp',[]);
app.controller('mainCtrl',function($scope,$interval){
  $scope.breakLength=5;
  $scope.intervalLength=25;
  $scope.timeLeft=tohms($scope.intervalLength*60);
  var runTimer=false;
  var timeInSeconds=$scope.intervalLength*60;

  
  function tohms(seconds){
    if(seconds > 0){
        var hours= Math.floor(seconds/3600);
        var min  = Math.floor(seconds/60);
        var sec  = seconds%60;
        if(hours > 0){
          if(sec > 9 ){
              return hours+':'+min+':'+ sec;
          }
          else{
            return hours+':'+min+':0'+ sec;
          }
        }
        else if ( min > 0){
          if(sec > 9 ){
              return min+':'+ sec;
          }
          else{
            return min+':0'+ sec;
          }
        }
        else{
          if(sec > 9 ){
              return '00:'+sec;
          }
          else{
            return '00:0'+ sec;
          }
        }
    }
  }
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
            $scope.timeLeft=tohms($scope.intervalLength*60);
            timeInSeconds=$scope.intervalLength*60;
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
    }
  }

  function updateTimer(){
    timeInSeconds-=1;

    if(timeInSeconds < 0){
      $scope.timeLeft='funckit';
    }

    $scope.timeLeft=tohms(timeInSeconds);
  }


});
