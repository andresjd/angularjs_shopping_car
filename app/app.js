(function (){
    'use strict'
    
    angular.module('app', ['ui.router'])
    
    angular.module('app').config(function($stateProvider, $urlRouterProvider) {
      //
      // For any unmatched url, redirect to /state1
      $urlRouterProvider.otherwise("/catalogo");
      //
      // Now set up the states
      $stateProvider
        .state('catalogo', {
          url: "/catalogo",
          templateUrl: "app/catalogo/view.catalogo.html",
          controller: 'CatalogoController',
          controllerAs: 'cat'
        })
        .state('finalizarCompra', {
          url: '/finalizarcompra',
          templateUrl: 'app/carrito/view.finalizarCompra.html',
          controller: 'FinalizarCompraController',
          controllerAs: 'finCompra'
        })
        .state('historial', {
          url: '/historial',
          templateUrl: 'app/historial/view.historial.html',
          
        })
        
    });
    
})()