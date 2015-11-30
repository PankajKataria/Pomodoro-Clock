var app=angular.module('mainapp',[]);
app.controller('mainCtrl',function($scope,$interval){
  $scope.breakLength=5;
  $scope.intervalLength=1;
  $scope.timeLeft=tohms($scope.intervalLength*60);
  $scope.sessionName='interval';
  var runTimer=false;
  var timeInSeconds=$scope.intervalLength*60;
  var runMuzic=true;
  function paddedzero(num){
    if(num > 9 ){
      return num.toString();
    }
    else{
      return '0'+num.toString();
    }
  }
  function tohms(seconds){
      if(seconds >= 0){
        var result='';
        var hours = Math.floor(seconds/3600);
        var min   = Math.floor(seconds%3600/60);
        var sec   = seconds%60;
        if(hours > 0){
          return paddedzero(hours)+':'+paddedzero(min)+':'+paddedzero(sec);
        }
        else{
          return paddedzero(min)+':'+paddedzero(sec);
        }
      }
  }
  $scope.toggle=function(d,type){
    if(!isNaN(d)){
      if(d == 1 | d == -1 ){
        if( type === 'break'){
          if(($scope.breakLength > 0 | d == 1)){
            if(!runTimer){
              $scope.breakLength+=d;
              if($scope.sessionName === 'break'){
                $scope.timeLeft=tohms($scope.breakLength*60);
                timeInSeconds=$scope.breakLength*60;
              }
            }
            else if(runTimer && $scope.sessionName === 'interval'){
              $scope.breakLength+=d;
            }
          }
        }
        else if(type == 'interval'){
          if(($scope.intervalLength > 0 | d == 1)){
            if(!runTimer){
              $scope.intervalLength+=d;
              if($scope.sessionName == 'interval'){
                $scope.timeLeft=tohms($scope.intervalLength*60);
                timeInSeconds=$scope.intervalLength*60;
              }
            }
            else if(runTimer && $scope.sessionName === 'break'){
              $scope.intervalLength+=d;
            }
          }
        }
      }
    }
  }

  $scope.startTimer=function(){
    if(runTimer){
      return;
    }
    runTimer=$interval(updateTimer,1000);
  }
  function updateTimer(){
    timeInSeconds-=1;
    if(timeInSeconds < 0){
      if($scope.sessionName === 'interval'){
        $scope.sessionName='break';
        timeInSeconds=60*$scope.breakLength;
      }
      else if($scope.sessionName === 'break'){
        $scope.sessionName='interval';
        timeInSeconds=60*$scope.intervalLength;
      }
    }
    $scope.timeLeft=tohms(timeInSeconds);
  }
  $scope.stopTimer=function(){
    if(!runTimer){
      return;
    }
    $interval.cancel(runTimer);
    runTimer=false;
  }
});
