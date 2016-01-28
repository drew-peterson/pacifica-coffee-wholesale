angular.module('MainCtrl', [])

.controller('MainCtrl',function(
  $scope,
  scrollEvent,
  $window
  ){


// direction images
  $scope.directionImages = [
    {img: '/../img/sign1.jpeg',
    desc: 'Find the Sign'},
    {img: '/../img/sign2.jpeg',
    desc: 'Welcome'},
   {img:'/../img/parking1.jpeg',
    desc: 'Great Parking!'},
   {img:'/../img/parking2.jpeg',
    desc: 'Plently of open space'}
  ]

  // Scroll Event =============================

   $scope.sEvent = {
    home: {},
    about: {},
    consignment: {
      col2: scrollEvent.getEl('#consignment .col-2'),
      col4: scrollEvent.getEl('#consignment .col-4')
    },
    directions: {
      imgs: scrollEvent.getEl('#directions .cardContainer')
    }

  } //sEvent

  console.log($scope.sEvent.directions.imgs)

  // console.log('col-2: ' + $scope.sEvent.consignment.col2);

  $scope.curPos = 0;

  $window.onscroll = function(){
    $scope.curPos = document.body.scrollTop
                    || document.documentElement.scrollTop
                    || 0;
    console.log("pos: " + $scope.curPos);
    $scope.$digest();

  };
  // =============================================


// if statements can also work with $scope.watch() and the varible has to be changed in html
//$scope.watch('varName',function(newVal, OldVal){if(x){$scope.varName = 'test'}})

});
'use strict';

angular.module('NavCtrl', [])

.controller('NavCtrl', function(
  $scope,
  scrollService,
  $location
  ){

  $scope.navC = '';

  $scope.navLinks = [
    {
      state:'about',
      navC: '#E91E63'
    },
      {
      state: 'items',
      navC: '#727272'
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

  // get all pins only once
  pinterestService.getBoard(function(pins){
    $scope.pins = pins;
  })

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
  'Pinterest', // pinerest ctrl, inject module not ctrl,

  ])


// Capitialize =========================
.filter('capitalize', function() {
    return function(input, all) {
      var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
      return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    }
  });

// ========================================

'use strict';

angular.module('fasionistaApp')

  // card
  .directive('cardInner',function(){
    return{
      controllerAs: 'cardCtrl',
      templateUrl: '/views/partials/_card.html',

      controller: function(){
        this.fullName = "Drew Peterson";



        this.test = [1,2,3]

    } // end of controller
  } // end of return
}) // end of directive

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
    .state('test', {
      url: '/test',
      controller: 'MainCtrl',
      templateUrl: '../views/test/index.html'
    })

  })

'use strict';

angular.module('Pinterest')

.factory('pinterestService', function($http){

  var boardUrl = 'https://api.pinterest.com/v1/boards/543176473746760468/pins/?access_token=ATqC1gzDTvxL0zf-1wfyp-SdFCe3FCx7yHOmO5hC0EfPzMArmQAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cimage';

  var pins = [];

return {
    getBoard: function(callback){
      // callback is the anonymouse function from ctrl
      var cb = callback || angular.noop;

      if(pins.length !== 0){
        cb(pins); // service does not reset so pins contain api data
      }else{
        $http.get(boardUrl)
        .success(function(response){
           pins = pins.concat(response.data);
          cb(pins); // calling the cb function and passing in data
        })
        .error(function(){
          cb();
        })
      }
    }
  }
}) // end of factory =========================


// how to return promise from promise;
// http://stackoverflow.com/questions/12505760/processing-http-response-in-service

// updated verion... prevent multiple api calls
// http://stackoverflow.com/questions/31556184/calling-http-only-once-in-a-controller

'use strict';

angular.module('fasionistaApp')

.factory('scrollEvent', function(){

  return {
    getEl: function(className){
      var el = $(className);

      if (el.length >= 1) {
        return el.offset().top -= 300;
      }
    }

  } // end of return
})
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
