angular.module('playlister')
  .controller('Account', ['$scope', function($scope) {
    window.onbeforeunload = function(){
      $scope.$apply(function(){
        $scope.signinerror = false
      })
      $scope.signout()
    }
    $scope.signinerror = false
    $scope.signedin = false
    $scope.printScope = () => {
      console.log($scope)
    }
    $scope.signup = () => {
      axios({method: 'POST', url: '/users',
        data: {'email': $scope.uemail, 'password': $scope.upassword}
      }).then(result=>{
        if (result.status === 200){
          $scope.$apply(function(){
            $scope.signedin = true
            $scope.signuperror = false
            $scope.signinerror = false
            $scope.$parent.$broadcast('signedin', {email: $scope.uemail, data: []})
          })
        } else {
          $scope.$apply(function(){
            $scope.signuperror = true
            $scope.signinerror = false
            $scope.signedin = false
          })
        }
      })
    }
    $scope.signin = () => {
      axios({method: 'POST', url: '/sessions',
        data: {'email': $scope.iemail, 'password': $scope.ipassword}
      }).then(result=>{
        if (result.status === 200){
          $scope.$apply(function(){
            $scope.$parent.$broadcast('signedin', {email: $scope.iemail, data: result.data})
            $scope.iemail = ""; $scope.ipassword = "", $scope.uemail = ""; $scope.upassword = "";
            $scope.signedin = true
            $scope.signinerror = false
            $scope.signuperror = false
          })
        } else {
          $scope.$apply(function(){
            $scope.signinerror = true
            $scope.signuperror = false
            $scope.signedin = false
          })
        }
      })
    }
    $scope.signout = () => {
      axios.post('/signout').then(result=>{
        $scope.$apply(function(){
          $scope.signedin = false
          $scope.signedinerror = false
          $scope.$parent.$broadcast('signedout')
        })
      })
    }
  }])