angular.module('MainCtrl', [])

.controller('MainCtrl',function($scope, $location){



// if statements only work with $scope.watch() and the varible has to be changed in html
//$scope.watch('varName',function(newVal, OldVal){if(x){$scope.varName = 'test'}})

});
'use strict';

angular.module('NavCtrl', [])

.controller('NavCtrl', function($scope, scrollService, $location){

  $scope.navC = '';

  $scope.navLinks = [
    {
      state:'about',
      navC: '#E91E63'
    },
    {
      state: 'consignment',
      navC: '#4CAF50'
    },
    {
      state: 'directions',
      navC: '#F8BBD0'
    }
  ];

  // toggle class
  $scope.mobileNav = function(event){
    // master toggle...
    $scope.navActive = !$scope.navActive;
    // get btn class
    var btn = event.srcElement.parentElement.className

    // disable enable scrolling
    if(!$scope.navActive || btn === 'home'){
      // scrollService.enableScroll(); // need to get better
    }else{
      // scrollService.disableScroll(); // ned to get better
    }
    if(btn === 'home' && $scope.navActive){
      $scope.navActive = !$scope.navActive;
    }
  } // end of mobile nav


  $scope.changeBackground = function(color){

    if(!$scope.navC){
      $scope.navC = '#E91E63' // clicked from home page or any page
    }else{
      $scope.navC = color || $scope.navC
    }
  }


  // check background @url and set color

  var currentUrl = $location.$$path;

  if(currentUrl === '/about'){
    $scope.navC = '#E91E63';

  }else if(currentUrl === '/consignment'){
    $scope.navC = '#4CAF50';

  }else if(currentUrl === '/directions'){
    $scope.navC = '#F8BBD0'
  }
}) // end of ctrl ===================



// custom directive ======================

// directive is not really needed but i wanted practice
.directive('mainNav', function(scrollService){
  // this functions like jquery you do not call this it just runs
  var openNav = function(scope, element, attrs){
    // jquery only works inside
    var btn = $('.nav-open');
    var dh = $('.dNav');

    // you could do btn clicks and stuch here....

  }; // end of link

  return {
    restrict: 'E',
    templateUrl: 'views/navigation/index.html',
    link: openNav
  };
});
'use strict';

angular.module('Pinterest', [])

.controller('PinterestCtrl',function($http, $scope, pinterestService, $window){

  $scope.pins;

  var getPins = function(){
    pinterestService.getBoard()
    .then(function(data){
      $scope.pins = data;
      console.log(data)
    });
  };

  // call function when page loads, angular way...
  $scope.$on('$viewContentLoaded', function(){

    // only hit api once unless page refresh...
    if( !$scope.pins){
      getPins();
    }

  });

  // use pinterest url to redirect to pinterest page
  $scope.gotoPins = function(location){
    $window.open(location)
  }

})

'use strict';

angular.module('fasionistaApp',
  [
  'ngAnimate',
  'NavCtrl',
  'MainCtrl',
  'ui.router',
  'appRoutes',
  'Pinterest' // pinerest ctrl, inject module not ctrl
  ])


// Capitialize =========================
.filter('capitalize', function() {
    return function(input, all) {
      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
  });

// ========================================

angular.module('appRoutes', [])

.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/',
      controller: 'MainCtrl',
      templateUrl: '../views/home/index.html',

    })
    .state('about', {
      url: '/about',
      controller: 'MainCtrl',
      templateUrl: "../views/about/index.html",

    })
    .state('consignment', {
      url: '/consignment',
      controller: 'MainCtrl',
      templateUrl: "../views/consignment/index.html",
    })
    .state('directions', {
      url: '/directions',
      controller: 'MainCtrl',
      templateUrl: "../views/directions/index.html",
    })
    .state('items', {
      url: '/items',
      controller: 'PinterestCtrl',
      templateUrl: '../views/items/index.html'
    })

  })

'use strict';

angular.module('Pinterest')

.factory('pinterestService', function($http){

  var boardUrl = 'https://api.pinterest.com/v1/boards/543176473746760468/pins/?access_token=ATqC1gzDTvxL0zf-1wfyp-SdFCe3FCx7yHOmO5hC0EfPzMArmQAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cimage';

  var promise;
  var pins = [];

return {
      getBoard: function(){

        var promise = $http.get(boardUrl)
        .then(function(response){
           pins = pins.concat(response.data.data);

          return pins;
        }); // then
      return promise;
    }
  }
}) // end of factory =========================


// how to return promise from promise;
// http://stackoverflow.com/questions/12505760/processing-http-response-in-service

'use strict';

angular.module('fasionistaApp')

.factory('scrollService',function(){
  return {
     disableScroll: function(){
      $('html, body').css(
        {
        'overflow': 'hidden',
        'height': '100%'
      });
    },
    enableScroll: function(){
      $('html, body').css(
        {
       'overflow': 'auto',
       'height': 'auto'
       });
    }
  }
})
//# sourceMappingURL=application.js.map
