(function(){
    // creo el factory llamado FCatalogo
    angular.module('app').factory('FCatalogo', FCatalogo)
    
    FCatalogo.$inject = ['$http']
    function FCatalogo($http){
        // este objeto que se devuelve contiene las funciones públicas que pueden ser llamados desde los controllers
        return {
            obtenerProductos: obtenerProductos
        }
        
        // función que retorna los productos
        // dejo comentado la manera que se deberia de obtener los productos desde una url
        function obtenerProductos(){
            
            /*
            $http.({
                url: 'https://url que retorna los productos en un array json' 
                method: 'get',
                type: 'json'
            })
            .then(respuesta, err)
            
            // función que se ejecuta si el servidor respondio un http status entre 200 y 299
            function respuesta(res){
                return res.productos
            }
            
            // función que se ejecuta si ocurrio un error en la respuesta del servidor 
            function err(error){
                
            }
            */
            
            return [
                {idproducto: 1, nombre: '1.030 AERIA POINTS', precio: 40000, logo:'https://s3.amazonaws.com/validdaweb/brands/ag_brand.png', idcategoria: 11},
                {idproducto: 2, nombre: '1.500 AXESOCASH', precio: 45000, logo:'https://s3.amazonaws.com/validdaweb/brands/axeso5_brand.png', idcategoria: 13},
                {idproducto: 3, nombre: '5.000 AXESOCASH', precio: 20000, logo:'https://s3.amazonaws.com/validdaweb/brands/axeso5_brand.png', idcategoria: 13},
                {idproducto: 4, nombre: '1 MES CLUB PENGUIN', precio: 50000, logo:'https://s3.amazonaws.com/validdaweb/brands/cp_brand.png', idcategoria: 15},
                {idproducto: 5, nombre: '2.030 AERIA POINTS', precio: 80000, logo:'https://s3.amazonaws.com/validdaweb/brands/ag_brand.png', idcategoria: 11}
            ]
        }
    }
    
})()